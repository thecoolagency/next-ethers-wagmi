import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { ethers, utils } from 'ethers'
import { useContractWrite, useWaitForTransaction, useSigner, useAccount, useNetwork } from 'wagmi';
import TokenFactory from "../../contracts/SkidCoin.json";
import Loader from '../../public/vectors/loader.svg';
import Etherscan from '../../public/vectors/etherscan.svg';
// import ethereum_address from 'ethereum-address';
var ethereum_address = require('ethereum-address');

export default function TokenTransfer(): JSX.Element {

    const { address: accountAddress, isConnected, isDisconnected, status: userStatus } = useAccount();
    const { chain } = useNetwork();

    let currentNetwork:string = chain?.name!;
    let tokAddress:string;
    let etherscanURL:string;
    let blockExplorer:string;
    let RPCProvider:string;

    const getNetworkConf = (currentNetwork: string) => {
        switch (chain?.name) {
            case "Arbitrum Rinkeby":
                tokAddress = "0x853d95e5261bedc228a07207f1a5ad455f649094";
                etherscanURL = "https://testnet.arbiscan.io/token/" + tokAddress;
                blockExplorer = "https://testnet.arbiscan.io/";
                RPCProvider = "https://arbitrum-rinkeby.infura.io/v3/e3105f2100bd48708f77e21b1886477e";
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Optimism Kovan":
                tokAddress = "0x853d95e5261bedc228a07207f1a5ad455f649094";
                etherscanURL = "https://kovan-optimistic.etherscan.io/token/" + tokAddress;
                blockExplorer = "https://kovan-optimistic.etherscan.io/";
                RPCProvider = "https://optimism-goerli.infura.io/v3/e3105f2100bd48708f77e21b1886477e";
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Polygon Mumbai":
                tokAddress = "0x853d95e5261bedc228a07207f1a5ad455f649094";
                etherscanURL = "https://mumbai.polygonscan.com/token/" + tokAddress;
                blockExplorer = "https://mumbai.polygonscan.com/";
                RPCProvider = "https://polygon-mumbai.infura.io/v3/e3105f2100bd48708f77e21b1886477e";
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Rinkeby":
                tokAddress = "0x2244132b7af02525b8d7dcef48a51bac23f44cd7";
                etherscanURL = "https://rinkeby.etherscan.io/token/" + tokAddress;
                blockExplorer = "https://rinkeby.etherscan.io/";
                RPCProvider = "https://rinkeby.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee";
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Goerli":
                tokAddress = "0x2d9e51eee9a83c45c251a768bab3ec62bbd20c4a";
                etherscanURL = "https://goerli.etherscan.io/token/" + tokAddress;
                blockExplorer = "https://goerli.etherscan.io/";
                RPCProvider = "https://goerli.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee";
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
        }
    }

    let conf = getNetworkConf(currentNetwork)!

    console.log("conf: \n" + conf.tokAddress!)

    const cbLink = "cbwallet://dapp?url=" + window.location.href;
    const mmLink = "https://metamask.app.link/dapp/" + window.location.href;

    const [amount, setAmount] = useState('');
    const [finalAmount, setFinalAmount] = useState('0');
    const [address, setAddress] = useState('');
    const [disabled, setDisabled] = useState(false);

    const [button, setButton] = useState("send skidcoin");
    const [txError, setTxError] = useState(null)
    const [etherscan, setEtherscan] = useState('')
    const [loadingState, setLoadingState] = useState(0)
    const [transferStatus, setTransferStatus] = useState(1)

    function writeUserData() {
        if (ethereum_address.isAddress(address)) {
            setButton("continue in wallet...");
            setTransferStatus(0)
            setDisabled(true)
        }
        else {
          alert('Invalid Ethereum address.');
        }
    }

    const { data: signer } = useSigner()
    const { data, isError, isLoading , write } = useContractWrite({
        addressOrName: conf.tokAddress,
        contractInterface: TokenFactory.abi,
        signerOrProvider: signer,
        functionName: 'transfer',
        args: [address, utils.parseEther(finalAmount)],
        onMutate({ args, overrides }) {
          console.log('Mutate', { args, overrides })
        },
        onSuccess(data) {
          console.log('Success', data)
          setButton("send tokens");
          setTransferStatus(1)
          setDisabled(false)
        },
        onError(error) {
          console.log('Error', error)
          setButton("try again?");
          setTransferStatus(1)
          setDisabled(false)

        }
    });
    const {data: waitData, isError: waitError, isLoading: waitLoading } = useWaitForTransaction({
        enabled: false,
    });

    async function proTransfer() {
        setDisabled(true)
        try {
            write();
            await setDisabled(false)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                alert("Error: " + error)
            } else {
                console.log("error")
            }
            // await console.log("Error: " + error.message);
            // if (error.code === '4001') {
            //     setDisabled(false)
            //     setLoadingState(1)
            // } else {
            //     setDisabled(false)
            //     setLoadingState(1)
            // }
            // console.log(error.message + error.code)
        }
    }

    useEffect(() => {
        setDisabled(false);
        setAmount(' ');
        setAddress(' ');
    }, []);

    return (

        <div className="grid">

            <form
                className="transfer"
                onSubmit={(e) => {
                    e.preventDefault();
                    writeUserData();
                }}
            >

                <br />

                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '10rem' }}>
                        <p style={{ paddingBottom: '0', fontSize: '0.85rem' }}>send</p>
                        <input
                            className="input"
                            type="number"
                            required={true}
                            step="100"
                            placeholder="Amount.."
                            value={amount}
                            pattern=".*\S+.*" 
                            onChange={(e) => {
                                if (parseInt(amount) >= 100) {
                                    setFinalAmount(amount)
                                }; setAmount(e.currentTarget.value)}}
                            min="100"
                            disabled={disabled} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p style={{ paddingBottom: '0', fontSize: '0.85rem' }}>to</p>
                        <input
                            className="input"
                            placeholder="0x01....."
                            required={true}
                            type="text"
                            onChange={(e) => setAddress(e.currentTarget.value)}
                            disabled={disabled} />
                    </div>
                </div>

                {loadingState === 0 ? (
                    transferStatus === 0 ? (
                        txError === null ? (
                            <div className="empty"></div>
                        ) : (
                            <div className="animated fadeIn">{txError}</div>
                        )
                    ) : (
                        <div className="empty"></div>
                    )
                ) : (
                    <div className="results animated fadeIn">
                        <div className="details animated fadeInUp">
                            <h2>Transaction:</h2>
                            <a href={conf.etherscanURL} target="_blank" rel="noreferrer noopener"><Image src="/vectors/etherscan.svg" height={30} width={30} alt="etherscan" /></a>
                        </div>
                    </div>
                )}
            
                {isConnected ? (

                    <>
                        <button 
                            className="button--primary"
                            onClick={() => {proTransfer()}}
                            disabled={disabled}
                        >
                            {button}
                        </button>
                        <div className="transferStatus">{transferStatus === 0 ? (<Image src="/vectors/loader.svg" height={30} width={45} alt="loader" />) : (<></>)}</div>
                    </>

                ) : (

                    <></>

                )}

            </form>

        </div>

    )

};

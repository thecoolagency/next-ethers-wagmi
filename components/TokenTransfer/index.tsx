import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { ethers, utils } from 'ethers'
import { useContractWrite, useWaitForTransaction, useSigner, useAccount, useNetwork } from 'wagmi';
import TokenFactory from "../../contracts/SkidCoin.json";
import ethereum_address from 'ethereum-address';
import Loader from '../../public/vectors/loader.svg';
import Etherscan from '../../public/vectors/etherscan.svg';

export default function TokenTransfer(): JSX.Element {

    const { address: accountAddress, isConnected, isDisconnected, status: userStatus } = useAccount();
    const { chain } = useNetwork();

    let currentNetwork=chain?.name;
    let tokAddress;
    let etherscanURL;
    let blockExplorer;
    let RPCProvider;

    const getNetworkConf = (currentNetwork) => {
        switch (chain?.name) {
            case "Arbitrum Rinkeby":
                tokAddress = process.env.REACT_APP_ARBI_RINKEBY_TOKEN_ADDRESS;
                etherscanURL = process.env.REACT_APP_ARBI_RINKEBY_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_ARBI_RINKEBY_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_ARBI_RINKEBY_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Optimism Kovan":
                tokAddress = process.env.REACT_APP_OPTI_KOVAN_TOKEN_ADDRESS;
                etherscanURL = process.env.REACT_APP_OPTI_KOVAN_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_OPTI_KOVAN_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_OPTI_KOVAN_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Polygon Mumbai":
                tokAddress = process.env.REACT_APP_MUMBAI_TOKEN_ADDRESS;
                etherscanURL = process.env.REACT_APP_MUMBAI_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_MUMBAI_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_MUMBAI_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Rinkeby":
                tokAddress = process.env.REACT_APP_RINKEBY_TOKEN_ADDRESS;
                etherscanURL = process.env.REACT_APP_RINKEBY_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_RINKEBY_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_RINKEBY_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Goerli":
                tokAddress = process.env.REACT_APP_GOERLI_TOKEN_ADDRESS;
                etherscanURL = process.env.REACT_APP_GOERLI_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_GOERLI_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_GOERLI_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
        }
    }

    let conf = getNetworkConf(currentNetwork)

    // deeplinks to add on mobile UI as Rainbow's Metamask link does not work on beta.
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
    const [transferStatus, setTransferStatus] = useState(null)

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
        addressOrName: tokAddress,
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
          setButton("try again?.");
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
            await console.log("Error: " + error.message);
            if (error.code === '4001') {
                setDisabled(false)
                setLoadingState(1)
            } else {
                setDisabled(false)
                setLoadingState(1)
            }
            console.log(error.message + error.code)
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
                    onSubmit={(e) => {
                        e.preventDefault();
                        writeUserData();
                    }}
                >
                <br />
                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '10rem' }}>
                    <p style={{ paddingBottom: '0', fontSize: '0.85rem' }}>Send</p>
                    <input
                        className="input"
                        type="number"
                        required="required"
                        step="100"
                        placeholder="Amount.."
                        value={amount}
                        pattern=".*\S+.*" 
                        onChange={(e) => {
                            if (amount >= 100) {
                                setFinalAmount(amount)
                            }; setAmount(e.currentTarget.value)}}
                        min="100"
                        disabled={disabled} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ paddingBottom: '0', fontSize: '0.85rem' }}>to:</p>
                    <input
                        className="input"
                        placeholder="0x01....."
                        required="required"
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
                            <a href={etherscan} target="_blank" rel="noreferrer noopener" alt="etherscan link"><Image src="/vectors/etherscan.svg" height={30} width={30} /></a>
                        </div>
                    </div>
                )}
                
                {!isConnected === 0 ? (
                    <>
                        <button 
                            className="button--primary"
                            onClick={() => {proTransfer()}}
                        >
                            {button}
                        </button>
                        <div className="transferStatus">{transferStatus === 0 ? (<Image src="/vectors/loader.svg" height={30} width={45} />) : (<></>)}</div>
                    </>
                ) : (
                <></>
                )}


            </form>
            </div>

    )

};

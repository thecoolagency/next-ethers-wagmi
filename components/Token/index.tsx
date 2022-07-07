import {useState, useEffect, startTransition, useTransition} from 'react';a
import { useToken, useNetwork } from 'wagmi'
import Image from 'next/image';
import Etherscan from '../../public/vectors/metamask.svg';

const SToken = () => {

    const { chain, isConnected } = useNetwork();
    const [isPending, startTransition] = useTransition();

    let currentNetwork:string = chain?.name!;
    let tokAddress:string = "0x853d95e5261bedc228a07207f1a5ad455f649094";
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
            default:
                tokAddress = "e3105f2100bd48708f77e21b1886477e";
                etherscanURL = "https://etherscan.io/token/" + tokAddress;
                blockExplorer = "https://etherscan.io/";
                RPCProvider = "https://mainnet.infura.io/v3/59b59e23bb7c44d799b5db4a1b83e4ee";
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
        }
    }

    let conf = getNetworkConf(currentNetwork)!

    console.log("conf: \n" + conf.tokAddress!)
    // console.log("Bandz: \n" + tokAddress)

    // metamask only (desktop and mobile)
    async function addToken(): Promise<void> {
        const tokenAddress = conf.tokAddress;
        const tokenSymbol = 'SKD';
        const tokenDecimals = 18;
        const tokenImage = 'https://etherscan.io/images/svg/brands/ethereum-1.svg';
        try {
            const wasAdded = await window?.ethereum?.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: tokenImage,
                    },
                },
            });
            if (wasAdded) {
                // noice    
            } else {
                alert("what?")
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
                alert("Error: " + error)
            } else {
                console.log("error")
            }
        }
    }

    // token
    const { data, isError, isLoading } = useToken({
        address: conf.tokAddress,
        suspense: true
    })

    return (
<>
        {isPending && <div className="details"><p>Fetching token…</p></div>}
        {isError && <div className="details"><p>Error fetching token</p></div>}

        {!isPending && 

        <div className="details">

        <p>
            Chain ID: {chain?.id || "error"}<br /> 
            Name: {chain?.name || "error"}<br /> 
            Network: {chain?.network || "error"}<br /> 
            Symbol: {data?.symbol || "error"}<br /> 
            Supply: {data?.totalSupply.formatted || "error"}<br />
            Address: <a href={conf.etherscanURL} target="_blank" rel="noreferrer nooopener"> {String(conf.tokAddress).substring(0, 3) + "..." + String(conf.tokAddress).substring(38)}</a>
        </p>

        <button onClick={addToken} className="button--primary fox">
            ADD TO <Image src="/vectors/metamask.svg" height={20} width={20} alt="metamask" />
        </button>

        </div>
        }
</>
    )
};

export default SToken;



    

               
import { useToken, useNetwork } from 'wagmi'
import Image from 'next/image';
import Etherscan from '../../public/vectors/metamask.svg';

const SToken = () => {

    const { chain } = useNetwork();

    let currentNetwork:string = chain?.name;
    let tokAddress:string;
    let etherscanURL:string;
    let blockExplorer:string;
    let RPCProvider:string;

    const getNetworkConf = (currentNetwork) => {
        switch (chain?.name) {
            case "Arbitrum Rinkeby":
                tokAddress = "0x853d95e5261bedc228a07207f1a5ad455f649094";
                etherscanURL = process.env.REACT_APP_ARBI_RINKEBY_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_ARBI_RINKEBY_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_ARBI_RINKEBY_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Optimism Kovan":
                tokAddress = "0x853d95e5261bedc228a07207f1a5ad455f649094";
                etherscanURL = process.env.REACT_APP_OPTI_KOVAN_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_OPTI_KOVAN_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_OPTI_KOVAN_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Polygon Mumbai":
                tokAddress = "0x853d95e5261bedc228a07207f1a5ad455f649094";
                etherscanURL = process.env.REACT_APP_MUMBAI_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_MUMBAI_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_MUMBAI_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Rinkeby":
                tokAddress = "0x2244132b7af02525b8d7dcef48a51bac23f44cd7";
                etherscanURL = process.env.REACT_APP_RINKEBY_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_RINKEBY_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_RINKEBY_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
            case "Goerli":
                tokAddress = "0x2d9e51eee9a83c45c251a768bab3ec62bbd20c4a";
                etherscanURL = process.env.REACT_APP_GOERLI_ETHERSCAN_URL;
                blockExplorer = process.env.REACT_APP_GOERLI_BLOCK_EXPLORER_URL;
                RPCProvider = process.env.REACT_APP_GOERLI_RPC_PROVIDER_URL;
                return { tokAddress, etherscanURL, blockExplorer, RPCProvider };
        }
    }

    let conf = getNetworkConf(currentNetwork)

    // metamask only (desktop and mobile)
    async function addToken(): Promise<void> {
        const tokenAddress = tokAddress;
        const tokenSymbol = 'SKD';
        const tokenDecimals = 18;
        const tokenImage = 'https://etherscan.io/images/svg/brands/ethereum-1.svg';
        try {
            const wasAdded = await window.ethereum.request({
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
            console.log(error);
            alert("Error code: " + error.code + " \nMessage: " + error.message)
        }
    }

    // token
    const { data, isError, isLoading } = useToken({
        address: tokAddress,
        suspense: true
    })

    if (isLoading) return <div className="details"><p>Fetching token…</p></div>
    if (isError) return <div className="details"><p>Error fetching token</p></div>

    return (
        <div className="details">

        <p>
            Chain ID: {chain?.id || "error"}<br /> 
            Name: {chain?.name || "error"}<br /> 
            Network: {chain?.network || "error"}<br /> 
            Symbol: {data?.symbol || "error"}<br /> 
            Supply: {data?.totalSupply.formatted || "error"}<br />
            Address: <a href={etherscanURL} target="_blank" rel="noreferrer nooopener"> {String(data?.address).substring(0, 3) + "..." + String(data?.address).substring(38)}</a>
        </p>

        <button onClick={addToken} className="button--primary fox">
            ADD TO <Image src="/vectors/metamask.svg" height={20} width={20} alt="metamask" />
        </button>

        </div>
    )
};

export default SToken;



    

               
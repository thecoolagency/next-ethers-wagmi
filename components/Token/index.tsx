import { useToken, useNetwork } from 'wagmi'
import Image from 'next/image';
import Etherscan from '../../public/vectors/metamask.svg';

const SToken = () => {

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
                // not noice
            }
        } catch (error) {
            console.log(error);
        }
    }

    // token
    const { data, isError, isLoading } = useToken({
        address: tokAddress,
        suspense: true
    })

    if (isLoading) return <div>Fetching token…</div>
    if (isError) return <div>Error fetching token</div>

    return (
        <div className="details">

        <p>
            Chain ID: {chain?.id}<br /> 
            Name: {chain?.name}<br /> 
            Network: {chain?.network}<br /> 
            Symbol: {data?.symbol}<br /> 
            Supply: {data?.totalSupply.formatted}<br />
            Address: <a href={etherscanURL} target="_blank"> {String(data?.address).substring(0, 3) + "..." + String(data?.address).substring(38)}</a>
        </p>

        <button onClick={addToken} className="button--primary fox">
            ADD TO <Image src="/vectors/metamask.svg" height={20} width={20} />
        </button>

        </div>
    )
};

export default SToken;



    

               
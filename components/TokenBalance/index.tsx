import { useBalance, useAccount, useNetwork } from 'wagmi'

export default function TokenBalance() {

    const { address, isConnected, isDisconnected, status } = useAccount();
    const { chain } = useNetwork()

    let currentNetwork=chain?.name;

    const getEndpoint = (currentNetwork) => {
        switch (currentNetwork) {
            case "Arbitrum Rinkeby":
                return process.env.REACT_APP_ARBI_RINKEBY_TOKEN_ADDRESS
            case "Optimism Kovan":
                return process.env.REACT_APP_OPTI_KOVAN_TOKEN_ADDRESS
            case "Polygon Mumbai":
                return process.env.REACT_APP_MUMBAI_TOKEN_ADDRESS
            case "Goerli":
                return process.env.REACT_APP_GOERLI_TOKEN_ADDRESS
            case "Rinkeby":
                return process.env.REACT_APP_RINKEBY_TOKEN_ADDRESS
        }
    }

    let endpoint = getEndpoint(currentNetwork)

    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
        formatUnits: 18,
        token: endpoint
    })

    let toInt = parseInt(data?.formatted);

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>

    return (
        <>  
            <br />
            <div className="center">
                {Math.trunc()} {data?.symbol}
            </div>
        </>
    )
}


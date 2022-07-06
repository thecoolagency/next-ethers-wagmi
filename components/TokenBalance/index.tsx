import { useBalance, useAccount, useNetwork } from 'wagmi'

export default function TokenBalance() {

    const { address, isConnected, isDisconnected, status } = useAccount();

    const { chain } = useNetwork();

    let currentNetwork=chain?.name;
    
    const getEndpoint = (currentNetwork) => {
        switch (currentNetwork) {
            case "Arbitrum Rinkeby":
                // return process.env.REACT_APP_ARBI_RINKEBY_TOKEN_ADDRESS
                return "0x853d95e5261bedc228a07207f1a5ad455f649094"
            case "Optimism Kovan":
                // return process.env.REACT_APP_OPTI_KOVAN_TOKEN_ADDRESS
                return "0x853d95e5261bedc228a07207f1a5ad455f649094"
            case "Polygon Mumbai":
                // return process.env.REACT_APP_MUMBAI_TOKEN_ADDRESS
                return "0x853d95e5261bedc228a07207f1a5ad455f649094"
            case "Goerli":
                // return process.env.REACT_APP_GOERLI_TOKEN_ADDRESS
                return "0x2d9e51eee9a83c45c251a768bab3ec62bbd20c4a"
            case "Rinkeby":
                // return process.env.REACT_APP_RINKEBY_TOKEN_ADDRESS
                return "0x2244132b7af02525b8d7dcef48a51bac23f44cd7"
        }
    }

    let endpoint = getEndpoint(currentNetwork)
    console.log(endpoint)
    console.log(currentNetwork)
    console.log(address)

    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
        formatUnits: 18,
        token: endpoint
    })

    let toInt = parseInt(data?.formatted) || 0;

    if (isLoading) return <div>Fetching balance…</div>
    if (isError) return <div>Error fetching balance</div>

    return (
        <>  
            <br />
            <div className="center">
                balance: {Math.trunc(toInt)} {data?.symbol}
            </div>
        </>
    )
}


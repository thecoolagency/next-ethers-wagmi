import { useState, useEffect, startTransition, useTransition } from 'react';
import { useBalance, useAccount, useNetwork } from 'wagmi'

export default function TokenBalance() {

    const { address, isConnected, isDisconnected, status } = useAccount();
    const [ isPending, startTransition ] = useTransition();

    const { chain } = useNetwork();

    let currentNetwork:string = chain?.name!;
    
    const getNetworkConf = (currentNetwork: string) => {
        switch (chain?.name) {
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

    let conf = getNetworkConf(currentNetwork)

    const { data, isError, isLoading } = useBalance({
        addressOrName: address,
        formatUnits: 18,
        token: conf
    })

    let toInt = parseInt(data?.formatted!);

    return (
        <>
            {isPending && <div className="details"><p>Fetching token…</p></div>}

            {!isPending && 
                <>
                {isLoading && (
                    <div>Fetching balance…</div>)
                }

                {isError && (
                    <div>Error fetching balance</div>)
                }

                <div className="center">
                    <br />
                    balance: {Math.trunc(toInt)} {data?.symbol}
                </div>
                </>
            }
        </>
    )
}


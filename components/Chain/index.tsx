import { useNetwork, useAccount } from 'wagmi'

const Chain = () => {

    const { address: accountAddress, connector, isConnecting, isReconnecting, isConnected, isDisconnected, status: userStatus } = useAccount();
    const { chain, chains } = useNetwork();

    return (
        <div className="">

                {chain && 
                    <p>Connected to <u>{chain.name}</u></p>
                }

                <p>SkidCoin is available on the Ethereum L1 and L2<br /> testnets as well as Polygon Mumbai.</p>
                <p>At phase 2, SkidCoin will be deployed on<br /> Ethereum Mainnet and Polygon!</p>
                
                {/*{chains && (
                    <>Available chains: {chains.map((chain) => `${chain.name}, ${' '}`)}</>
                )}*/}

        </div>
        );
};

export default Chain;
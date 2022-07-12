import '../styles/globals.css';
import '../styles/theme.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { 
    RainbowKitProvider,
    getDefaultWallets,
    connectorsForWallets,
    wallet,
    Theme
} from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
    [
        chain.mainnet,
        chain.optimismKovan,
        chain.arbitrumRinkeby,
        chain.polygonMumbai,
        chain.goerli,
        chain.rinkeby,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
            ? []
            : []),
    ],
    [
        infuraProvider({ infuraId: process.env.NEXT_PUBLIC_INFURA_ID }),
        alchemyProvider({ alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
        jsonRpcProvider({
            rpc: (chain) => ({
                http: `https://${chain.network}.infura.io/v3/e3105f2100bd48708f77e21b1886477e`,
            }),
        }),
        publicProvider(),
    ]
);

const { wallets } = getDefaultWallets({
  appName: 'SkidCoin App',
  chains,
});

const skidAppInfo = {
  appName: 'SkidCoin App',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [wallet.argent({ chains }), wallet.trust({ chains })],
  },
]);

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

const customTheme: Theme = {
    colors: {
        accentColor: '#00fa00',
        accentColorForeground: '#000000',
        actionButtonBorder: 'none',
        actionButtonBorderMobile: 'none',
        actionButtonSecondaryBackground: 'none',
        closeButton: 'none',
        closeButtonBackground: 'none',
        connectButtonBackground: 'none',
        connectButtonBackgroundError: 'none',
        connectButtonInnerBackground: 'none',
        connectButtonText: 'none',
        connectButtonTextError: 'none',
        connectionIndicator: 'none',
        error: 'none',
        generalBorder: 'none',
        generalBorderDim: 'none',
        menuItemBackground: 'none',
        modalBackdrop: 'none',
        modalBackground: '#000000',
        modalBorder: 'none',
        modalText: '#00fa00',
        modalTextDim: 'none',
        modalTextSecondary: 'none',
        profileAction: 'none',
        profileActionHover: 'none',
        profileForeground: 'none',
        selectedOptionBorder: 'none',
        standby: 'none'
    },
    fonts: {
        body: ''
    },
    radii: {
        actionButton: 'none',
        connectButton: 'none',
        menuButton: 'none',
        modal: 'none',
        modalMobile: 'none'
    },
    shadows: {
        connectButton: 'none',
        dialog: 'none',
        profileDetailsAction: 'none',
        selectedOption: 'none',
        selectedWallet: 'none',
        walletLogo: 'none'
    },
    blurs: {
        modalOverlay: ''
    }
};

function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider appInfo={skidAppInfo} chains={chains} coolMode theme={customTheme}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default App;

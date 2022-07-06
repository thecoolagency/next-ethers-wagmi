import type { NextPage } from 'next';
import Link from 'next/link';
import Head from "../components/Head";
import Footer from "../components/Footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import dynamic from 'next/dynamic'

const Chain = dynamic(() => import("../components/Chain"), {
    ssr: false,
});
const SToken = dynamic(() => import("../components/Token"), {
    ssr: false,
});
const TokenBalance = dynamic(() => import("../components/TokenBalance"), {
    ssr: false,
});
const TokenTransfer = dynamic(() => import("../components/TokenTransfer"), {
    ssr: false,
});

const Token: NextPage = () => {

    return (

        <div className="container">

            <Head
              title="SKID TOKEN"
              description="Learn about our ERC20 Token and how it connects our community." image=""
            />

            <main className="main">

                <div className="coco">
                    <ConnectButton />
                </div>

                <h1 className="title">
                    <Link href="/">SkidCoin</Link>
                </h1>

                <hr />

                <Chain />
                <SToken />
                <TokenBalance />
                <TokenTransfer />

                <br />
                <hr />
                <br />

                <div className="navigation center">
                    <Link href="/">
                        <a className="button center">Home</a>
                    </Link>{'  '}
                    <Link href="/about">
                        <a className="button center">About</a>
                    </Link>{'  '}
                    <Link href="/swap">
                        <a className="button center">Swap/Buy</a>
                    </Link>
                </div>

            </main>

            <Footer />

        </div>

    );
};

export default Token;
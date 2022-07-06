import type { NextPage } from 'next';
import Link from 'next/link';
import Head from "../components/Head";cancelIdleCallback
import Footer from "../components/Footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Page: NextPage = () => {

    return (

        <div className="container">

            <Head
                title="Page"
                description="Template" image=""
            />

            <main className="main">

                <h1 className="title">Swap</h1>

                    <iframe style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '400px', width: '100%', minHeight: '70vh', height: '100%' }} src="https://flooz.trade/?refId=dxmRR7?backgroundColor=transparent"></iframe>

                <div className="coco">
                    <ConnectButton />
                </div>

                <div className="navigation center">
                    <Link href="/">
                        <a className="button center">Home</a>
                    </Link>{'  '}
                    <Link href="/about">
                        <a className="button center">About</a>
                    </Link>{'  '}
                    <Link href="/token">
                        <a className="button center">Skidcoin</a>
                    </Link>
                </div>

            </main>

            <Footer />

        </div>
    );
};

export default Page;
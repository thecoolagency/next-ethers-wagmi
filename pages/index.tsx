import type { NextPage } from 'next';
import Link from 'next/link';
import Head from "../components/Head";
import Footer from "../components/Footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Home: NextPage = () => {

    return (

        <div className="container">

            <Head
                title="SKIDCOIN"
                description="Welcome to SkidCoin community." image=""
            />

            <main className="main">

                <div className="coco">
                    <ConnectButton />
                </div>

                <h1 className="title">
                    <Link href="/">SkidCoin</Link>
                </h1>

                <div className="content">

                    <div className="grid">

                        <div className="card">
                            <Link href="/token">
                                <h2>SkidCoin &rarr;</h2>
                            </Link>
                            <Link href="/token">
                                <p>Learn about SkidCoin.</p>
                            </Link>
                        </div>

                        <a href="https://opensea.io/" className="card" target="_blank">
                            <h2>Skid NFT's &rarr;</h2>
                            <p>Learn about our upcoming NFT's.</p>
                        </a>

                    </div>

                    <div className="navigation center">
                        <Link href="/about">
                            <a className="button center">About</a>
                        </Link>{'  '}

                        <Link href="/token">
                            <a className="button center">Skidcoin</a>
                        </Link>{'  '}

                        <Link href="/swap">
                            <a className="button center">Swap/Buy</a>
                        </Link>
                    </div>

                </div>

            </main>

            <Footer />

        </div>

    );
};

export default Home;

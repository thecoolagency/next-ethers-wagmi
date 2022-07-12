import { useTransition, useEffect } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from "../components/Head";
import Footer from "../components/Footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'

const Home: NextPage = () => {

    const { isConnected, isDisconnected } = useAccount();

    useEffect(() => {
            isConnected;
    },[isConnected])

    useEffect(() => {
            isDisconnected;
    },[isDisconnected])

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

                <div className="page-content">

                    <div className="grid">

                        <div className="card">

                        {isConnected ?
                            <>
                            <Link href="/token">
                                <h2>SkidCoin &rarr;</h2>
                            </Link>
                            
                            <Link href="/token">
                                <p>Learn about SkidCoin.</p>
                            </Link>
                            </>
                        :
                            <div><br /><ConnectButton /></div>
                        }
                        </div>

                        <a href="https://opensea.io/" className="card" target="_blank" rel="noreferrer noopener">
                            <h2>Skid NFT&apos;s &rarr;</h2>
                            <p>Learn about our upcoming NFT&apos;s.</p>
                        </a>

                    </div>
                    
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

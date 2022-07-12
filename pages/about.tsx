import type { NextPage } from 'next';
import Link from 'next/link';
import Head from "../components/Head";
import Footer from "../components/Footer";
import { ConnectButton } from '@rainbow-me/rainbowkit';

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

                <div className="content">

                    <div className="page-content">

                        <h2 className="h2">ETHOS</h2>
                        <p className="description">A Community of Creatives,<br /> Developers and Entrepreneurs.</p>
                        <h2 className="h2">PATHOS</h2>
                        <p className="description">Focused on sustainability.<br /> Improving the lives of our community<br /> and the world.</p>
                        <h2 className="h2">LOGOS</h2>
                        <p className="description">Leveraging web3 technology.</p>

                    </div>

                    <div className="navigation center">
                    
                        <Link href="/">
                            <a className="button center">Home</a>
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

export default Token;
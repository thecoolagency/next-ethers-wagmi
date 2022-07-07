import Head from "next/head";

type TitleProps = {
  title: string;
  description: string;
  image: string;
};

const Title: React.FunctionComponent<TitleProps> = ({ title, description, image }) => {
  return (
    <Head>

      <title>
        {title
          ? `${title} - SKIDCOIN`
          : "Welcome - SKIDCOIN"}
      </title>
      <meta
        name="description"
        content={
          description
            ? description
            : "Join a community at SKIDCOIN."
        }
      />
      <meta
        name="viewport"
        key="viewport"
        content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=10.0, minimal-ui, viewport-fit=cover"
      />
      <meta name="theme-color" content="#000000" />
      {/*<link rel="icon" href="/favicon.ico" />*/}
      <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      <meta property="og:url" content="https://skidcoin.com/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={
          title
            ? `${title} - SKIDCOIN`
            : "Welcome - SKIDCOIN"
        }
      />
      <meta
        property="og:description"
        content={
          description
            ? description
            : "Join a community at SKIDCOIN."
        }
      />
      <meta 
        name="facebook-domain-verification"
        content=""
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="skidcoin.com" />
      <meta property="twitter:url" content="https://skidcoin.com/" />
      <meta
        name="twitter:title"
        content={
          title
            ? `${title} - SKIDCOIN`
            : "Join a community at SKIDCOIN."
        }
      />
      <meta
        name="twitter:description" 
        content={
          description
            ? description
            : "Join a community at SKIDCOIN."
        }
      />

    </Head>
  );
};

export default Title;

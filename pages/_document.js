import config from "config/config.json";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  const { parameter } = config;
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={parameter.favicon} />
      </Head>
      <body>
        <Main />
        <NextScript />

        <div id="root"></div>
      </body>
    </Html>
  );
};

export default Document;

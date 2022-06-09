import config from "config/config.json";
import { AppWrapper } from "context/state";
import { useEffect } from "react";
import TagManager from "react-gtm-module";
import "styles/globals.scss";
import "styles/typo.scss";

const tagManagerArgs = {
  gtmId: config.parameter.tag_manager_id,
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    setTimeout(() => {
      TagManager.initialize(tagManagerArgs);
    }, 10000);
  }, []);

  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;

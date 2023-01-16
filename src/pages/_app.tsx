import { type AppType } from "next/dist/shared/lib/utils";
import { ContextWrapper } from "../components/organisms/ContextWrapper";

import "../styles/globals.css";

const MovieApp: AppType = ({ Component, pageProps }) => {
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
};

export default MovieApp;

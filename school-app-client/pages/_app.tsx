import type { AppProps } from "next/app";
import withApollo from "../src/providers/Apollo";
import Layout from "../src/components/layout/Layout";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default withApollo(App);

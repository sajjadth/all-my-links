import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.sass";
import "bootstrap/dist/css/bootstrap.css";
import "nprogress/nprogress.css";
import router from "next/router";
import nProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import Layout from "../components/layout";

nProgress.configure({ showSpinner: false });
router.events.on("routeChangeStart", () => nProgress.start());
router.events.on("routeChangeComplete", () => nProgress.done());
router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <ToastContainer position="top-left" autoClose="5500" />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

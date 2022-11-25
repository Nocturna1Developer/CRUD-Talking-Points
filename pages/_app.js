import '../styles/globals.css';
import Layout from '../components/layout';
import { ToastContainer } from "react-toastify";
// Makes a cool pop up error notification
import "react-toastify/dist/ReactToastify.css";

// All the different pages on the app
// '<Component {...pageProps} /> ' is {children} in the Layout.js
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer limit={2} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

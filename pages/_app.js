import '../styles/globals.css'
import Layout from '../components/layout'

// all the different pages on the app
// '<Component {...pageProps} /> ' is {children} in the Layout.js
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} /> 
    </Layout>
  );
}

export default MyApp

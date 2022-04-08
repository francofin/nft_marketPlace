import "../public/plugins/bootstrap/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import '../public/css/style.css';
import "../public/plugins/themefisher-font/style.css";
import "../public/plugins/animate/animate.css";
import "../public/plugins/slick/slick.css";
import "../public/plugins/slick/slick-theme.css";
import {ContextProvider} from '../context';
import {Web3Provider} from '../components/providers/web3';
import Footer from "../components/Footer";


const MyApp = ({Component, pageProps}) => {
    return(
        <>
        <ContextProvider>
            <Web3Provider>
                <Component {...pageProps} />
                <Footer />
            </Web3Provider>
        </ContextProvider>
        </>
    )
}

export default MyApp;
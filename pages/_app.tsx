import '../styles/globals.css';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;

//     "react-copy-to-clipboard": "^5.0.4",
//     "react-router-dom": "^6.3.0",
//     "react-scripts": "^5.0.0",

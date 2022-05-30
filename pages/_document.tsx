import Document, { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Rubik:wght@300;400;500;700&display=swap" rel="stylesheet"/>
                    <title>Click On App</title>
                </Head>
                <body className="body">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

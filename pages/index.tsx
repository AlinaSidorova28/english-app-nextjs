import type { NextPage } from 'next';
import { Provider } from 'react-redux';

import { GlobalErrorCatchHandler } from '../components/GlobalErrorCatchHandler/GlobalErrorCatchHandler';
import { SectionHome } from '../components/SectionHome/SectionHome';
import { store } from '../utils/store';

const Home: NextPage = () => {
    return (
        <Provider store={store}>
            <GlobalErrorCatchHandler>
                <SectionHome/>
            </GlobalErrorCatchHandler>
        </Provider>
    );
};

export default Home;

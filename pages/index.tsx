import type { NextPage } from 'next';
import { Provider } from 'react-redux';

import { GlobalErrorCatchHandler } from '../components/GlobalErrorCatchHandler/GlobalErrorCatchHandler';
import { SectionHome } from '../components/SectionHome/SectionHome';
import { store } from '../utils/store';

const Home: NextPage = ({ ...props }) => {
    return (
        <Provider store={store}>
            <GlobalErrorCatchHandler>
                <SectionHome props={props}/>
            </GlobalErrorCatchHandler>
        </Provider>
    );
};

export default Home;

import * as React from 'react';

import { RESPONSE_STATUSES } from '../constants/constants';

function Error({ statusCode }) {
    let code = statusCode;

    if (statusCode !== RESPONSE_STATUSES.CODE_404
        && statusCode !== RESPONSE_STATUSES.CODE_401
        && statusCode !== RESPONSE_STATUSES.CODE_500) {
        code = RESPONSE_STATUSES.CODE_400;
    }

    return <div className={'error-section'}>
        <div className={'error'}>
            <img src={`https://http.cat/${code}`} alt={''} />
        </div>
    </div>;
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : RESPONSE_STATUSES.CODE_404;

    return { statusCode };
};

export default Error;

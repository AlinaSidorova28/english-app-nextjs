import Router from 'next/router';

import { RESPONSE_STATUSES } from '../constants/constants';

// @ts-ignore
export default function redirectTo(destination, { res, status } = {}) {
    if (res) {
        res.writeHead(status || RESPONSE_STATUSES.CODE_302, { Location: destination });
        res.end();
    } else if (destination[0] === '/' && destination[1] !== '/') {
        Router.push(destination);
    } else {
        window.location = destination;
    }
}

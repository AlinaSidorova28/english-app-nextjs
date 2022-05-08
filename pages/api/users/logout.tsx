import nookies from 'nookies';

import { RESPONSE_STATUSES } from '../../../constants/constants';

const logout = async (req, res) => {
    try {
        nookies.set({ res }, 'userName', '', { path: '/', maxAge: 0 });
        nookies.set({ res }, 'userId', '', { path: '/', maxAge: 0 });
        nookies.set({ res }, 'token', '', { path: '/', maxAge: 0 });
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', logout: true });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return logout(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

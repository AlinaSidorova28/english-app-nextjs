/* eslint-disable no-magic-numbers */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';

import { RESPONSE_STATUSES } from '../../../constants/constants';
import User from '../../../models/User';
import documentStore from '../../../utils/documentStore';

const authorize = async (req, res) => {
    const { login, password } = req.body;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const user: User | null = await session
            .query<User>({ collection: 'Users' })
            .waitForNonStaleResults()
            .whereEquals('login', login)
            .singleOrNull();

        if (user) {
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                        expiresIn: '7d',
                    });

                    nookies.set({ res }, 'token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
                    nookies.set({ res }, 'userName', user.login, { path: '/', maxAge: 60 * 60 * 24 * 7 });

                    res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', data: { token } });
                } else {
                    res.status(RESPONSE_STATUSES.CODE_400).json({ status: 'error', error: 'Password is incorrect' });
                }
            });
        } else {
            res.status(RESPONSE_STATUSES.CODE_404).json({ status: 'error', error: 'User doesn\'t exist' });
        }
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'POST':
        return authorize(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

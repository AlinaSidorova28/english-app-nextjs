import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';
import { uuid } from 'uuidv4';

import { RESPONSE_STATUSES } from '../../../constants/constants';
import Settings from '../../../models/Settings';
import User from '../../../models/User';
import documentStore from '../../../utils/documentStore';

const register = async (req, res) => {
    const { login, password } = req.body;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const candidate: User | null = await session
            .query<User>({ collection: 'Users' })
            .waitForNonStaleResults()
            .whereEquals('login', login)
            .singleOrNull();
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User(uuid(), login, hashedPassword);
        const settings = new Settings(user.id);

        if (candidate) {
            res.status(RESPONSE_STATUSES.CODE_400).json({ status: 'error', error: 'Such user already exists' });
        } else {
            await session.store<User>(user);
            await session.store<Settings>(settings);
            await session.saveChanges();

            const token = jwt.sign({ userId: user.id },
                process.env.JWT_SECRET_KEY, {
                    expiresIn: '7d',
                });

            nookies.set({ res }, 'token', token, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
            nookies.set({ res }, 'userName', user.login, { path: '/', maxAge: 60 * 60 * 24 * 7 });

            res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', data: { token } });
        }
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'POST':
        return register(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

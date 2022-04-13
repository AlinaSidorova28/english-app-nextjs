import { isUuid } from 'uuidv4';

import { RESPONSE_STATUSES } from '../../../constants/constants';
import Settings from '../../../models/Settings';
import User from '../../../models/User';
import documentStore from '../../../utils/documentStore';

const getUserDataById = async (req, res) => {
    const { userId } = req.query;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const user: User | null = await session.load(userId);
        const settings: Settings | null = await session
            .query<Settings>({ collection: 'Settings' })
            .waitForNonStaleResults()
            .whereEquals('user', user?.id)
            .singleOrNull();
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', user, settings });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

const getUserDataByName = async (req, res) => {
    const userName = req.query.userId;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const user: User | null = await session
            .query<User>({ collection: 'Users' })
            .waitForNonStaleResults()
            .whereEquals('login', userName)
            .singleOrNull();
        const settings: Settings | null = await session
            .query<Settings>({ collection: 'Settings' })
            .waitForNonStaleResults()
            .whereEquals('user', user?.id)
            .singleOrNull();
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', user, settings });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

export default async (req, res) => {
    const { userId } = req.query;

    switch (req.method) {
    case 'GET':
        return isUuid(userId)
            ? getUserDataById(req, res)
            : getUserDataByName(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

import User from '../../../models/User';
import documentStore from '../../../utils/documentStore';
import { RESPONSE_STATUSES } from '../../../constants/constants';

const getUsers = async (req, res) => {
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const users = await session
            .query<User>({ collection: 'Users' })
            .waitForNonStaleResults()
            .all();

        return res.status(RESPONSE_STATUSES.CODE_200).json({ data: users });
    } catch (error) {
        return res.status(RESPONSE_STATUSES.CODE_400).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return getUsers(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

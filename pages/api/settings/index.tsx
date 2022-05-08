import { RESPONSE_STATUSES } from '../../../constants/constants';
import Settings from '../../../models/Settings';
import documentStore from '../../../utils/documentStore';

const getSettings = async (req, res) => {
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const settings = await session
            .query<Settings>({ collection: 'Settings' })
            .waitForNonStaleResults()
            .all();

        return res.status(RESPONSE_STATUSES.CODE_200).json({ data: settings });
    } catch (error) {
        return res.status(RESPONSE_STATUSES.CODE_400).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return getSettings(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

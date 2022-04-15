import { RESPONSE_STATUSES } from '../../../constants/constants';
import Rule from '../../../models/Rule';
import documentStore from '../../../utils/documentStore';

const getRules = async (req, res) => {
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const rules = await session
            .query<Rule>({ collection: 'Rules' })
            .waitForNonStaleResults()
            .all();

        return res.status(RESPONSE_STATUSES.CODE_200).json({ data: rules });
    } catch (error) {
        return res.status(RESPONSE_STATUSES.CODE_400).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return getRules(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

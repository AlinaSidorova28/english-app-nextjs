import { RESPONSE_STATUSES } from '../../../constants/constants';
import Unit from '../../../models/Unit';
import documentStore from '../../../utils/documentStore';

const getUnits = async (req, res) => {
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const units = await session
            .query<Unit>({ collection: 'Units' })
            .waitForNonStaleResults()
            .all();

        return res.status(RESPONSE_STATUSES.CODE_200).json({ data: units });
    } catch (error) {
        return res.status(RESPONSE_STATUSES.CODE_400).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return getUnits(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

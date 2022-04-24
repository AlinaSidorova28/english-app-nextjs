import { RESPONSE_STATUSES } from '../../../constants/constants';
import Unit from '../../../models/Unit';
import documentStore from '../../../utils/documentStore';

const getUnitsById = async (req, res) => {
    const { moduleId } = req.query;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const units: Unit[] = await session
            .query<Unit>({ collection: 'Units' })
            .all();
        const filteredUnits = units.filter((rule) => rule.id.startsWith(moduleId));
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', units: filteredUnits });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        await getUnitsById(req, res);
        break;
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

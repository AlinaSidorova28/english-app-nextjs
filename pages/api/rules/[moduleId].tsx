import { RESPONSE_STATUSES } from '../../../constants/constants';
import Rule from '../../../models/Rule';
import documentStore from '../../../utils/documentStore';

const getRulesByModuleId = async (req, res) => {
    const { moduleId } = req.query;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const rules: Rule[] = await session
            .query<Rule>({ collection: 'Rules' })
            .all();
        const filteredRules = rules.filter((rule) => rule.id.startsWith(moduleId));
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', rules: filteredRules });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        await getRulesByModuleId(req, res);
        break;
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

import { RESPONSE_STATUSES } from '../../../constants/constants';
import documentStore from '../../../utils/documentStore';
import Task from '../../../models/Task';

const getTasks = async (req, res) => {
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const rules = await session
            .query<Task>({ collection: 'Tasks' })
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
        return getTasks(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

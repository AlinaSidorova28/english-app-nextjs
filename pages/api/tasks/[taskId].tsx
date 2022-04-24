import { RESPONSE_STATUSES } from '../../../constants/constants';
import Task from '../../../models/Task';
import documentStore from '../../../utils/documentStore';

const getTasksById = async (req, res) => {
    const { taskId } = req.query;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const tasks: Task | null = await session.load(taskId);
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', tasks });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        await getTasksById(req, res);
        break;
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

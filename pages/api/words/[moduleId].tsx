import { RESPONSE_STATUSES } from '../../../constants/constants';
import Word from '../../../models/Word';
import documentStore from '../../../utils/documentStore';

const getWordsByModuleId = async (req, res) => {
    const { moduleId } = req.query;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const words: Word[] = await session
            .query<Word>({ collection: 'Words' })
            .all();
        const filteredWords = words.filter((word) => word.id.startsWith(moduleId));
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', words: filteredWords });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        await getWordsByModuleId(req, res);
        break;
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

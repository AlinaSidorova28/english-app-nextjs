import { RESPONSE_STATUSES } from '../../../constants/constants';
import Word from '../../../models/Word';
import documentStore from '../../../utils/documentStore';

const getWords = async (req, res) => {
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const words = await session
            .query<Word>({ collection: 'Words' })
            .waitForNonStaleResults()
            .all();

        return res.status(RESPONSE_STATUSES.CODE_200).json({ data: words });
    } catch (error) {
        return res.status(RESPONSE_STATUSES.CODE_400).json({ error });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return getWords(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

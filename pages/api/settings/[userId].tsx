import { RESPONSE_STATUSES } from '../../../constants/constants';
import Settings from '../../../models/Settings';
import documentStore from '../../../utils/documentStore';

const getSettingsByUserId = async (req, res) => {
    const { userId } = req.query;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const settings: Settings | null = await session
            .query<Settings>({ collection: 'Settings' })
            .waitForNonStaleResults()
            .whereEquals('user', userId)
            .singleOrNull();
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', settings });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

const updateSettings = async (req, res) => {
    const { userId } = req.query;
    const { progress, lang } = req.body;
    try {
        const store = documentStore;
        const session = store.openSession('english-app');
        const settings: Settings = await session
            .query<Settings>({ collection: 'Settings' })
            .waitForNonStaleResults()
            .whereEquals('user', userId)
            .singleOrNull() ?? {} as Settings;

        settings.progress = { ...settings.progress, ...progress };
        settings.lang = lang ? lang : settings.lang;

        await session.saveChanges();
        res.status(RESPONSE_STATUSES.CODE_200).json({ status: 'success', settings });
    } catch (error) {
        res.status(RESPONSE_STATUSES.CODE_500).json({ status: 'error', error: 'Something went wrong' });
    }
};

export default async (req, res) => {
    switch (req.method) {
    case 'GET':
        return getSettingsByUserId(req, res);
    case 'POST':
        return updateSettings(req, res);
    default:
        return res.status(RESPONSE_STATUSES.CODE_404).json({ error: 'Not found' });
    }
};

import { parseCookies } from 'nookies';

const getSettingsByUserId = async (userId) => {
    try {
        const res = await fetch(`${process.env.BASE_URI || ''}/api/settings/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());

        return res;
    } catch (err) {
        console.error(err);

        return err;
    }
};

const updateSettings = async (settings) => {
    const { userId } = parseCookies();
    try {
        await fetch(`${process.env.BASE_URI || ''}/api/settings/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings),
        }).then((response) => response.json());
    } catch (err) {
        console.error(err);
    }
};

const resetSettings = async () => {
    const { userId } = parseCookies();
    try {
        await fetch(`${process.env.BASE_URI || ''}/api/settings/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json());
    } catch (err) {
        console.error(err);
    }
};

export { getSettingsByUserId, updateSettings, resetSettings };

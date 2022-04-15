const getModuleRules = async (moduleId) => {
    try {
        const res = await fetch(`${process.env.BASE_URI || ''}/api/rules/${moduleId}`, {
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

export { getModuleRules };

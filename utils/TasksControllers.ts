const getUnitsByModuleId = async (moduleId) => {
    try {
        const res = await fetch(`${process.env.BASE_URI || ''}/api/units/${moduleId}`, {
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

const getTaskById = async (taskId) => {
    try {
        const res = await fetch(`${process.env.BASE_URI || ''}/api/tasks/${taskId}`, {
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

export { getUnitsByModuleId, getTaskById };

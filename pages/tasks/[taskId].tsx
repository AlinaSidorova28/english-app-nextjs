import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getTaskById } from '../../utils/TasksControllers';

const Task = () => {
    const [tasks, setTasks] = useState([]);

    const router = useRouter();
    const { taskId } = router.query;

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const content = await getTaskById(taskId);
        const tasks = content?.tasks || [];

        setTasks(tasks);
    };

    console.log(tasks);

    return (
        <div>
            {taskId}
        </div>
    );
};

export default Task;

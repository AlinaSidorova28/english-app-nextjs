import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import TypedTask from '../../components/TaskBlock/TypedTask';
import Task from '../../models/Task';
import style from '../../styles/Tasks.module.scss';
import { GeneralTask } from '../../types/general';
import { getTaskById } from '../../utils/TasksControllers';

const Tasks = (props) => {
    const [tasks, setTasks] = useState<Task>({} as Task);

    const router = useRouter();
    const { taskId } = router.query;

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        const content = await getTaskById(taskId);
        const tasks = content?.tasks || {};

        setTasks(tasks);
    };

    return (
        <div className={'tasks'}>
            <div className={'container'}>
                <div className={style.tasks_wrapper}>
                    {tasks.task?.map((task: GeneralTask, index) => {
                        return <TypedTask key={`${taskId}-${index + 1}`} task={task}/>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Tasks;

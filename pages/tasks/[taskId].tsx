import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import NavLink from '../../components/NavLink/NavLink';
import TypedTask from '../../components/TaskBlock/TypedTask';
import { BOOKS } from '../../constants/constants';
import textForApp from '../../constants/translate';
import Task from '../../models/Task';
import style from '../../styles/Tasks.module.scss';
import { GeneralTask } from '../../types/general';
import { getTaskById } from '../../utils/TasksControllers';

const Tasks = (props) => {
    const [tasks, setTasks] = useState<Task>({} as Task);
    const [moduleName, setModuleName] = useState('');
    const [solvedTasks, setSolvedTasks] = useState(0);
    const isTest = tasks?.id?.includes('tb');

    const router = useRouter();
    const { taskId } = router.query;

    useEffect(() => {
        getTasks();
        getModuleName();
    }, []);

    const moveNext = () => {
        setSolvedTasks(solvedTasks + 1);
    };

    const getModuleName = async () => {
        const splited = (taskId as string)?.split('-') ?? '';
        setModuleName(`Unit ${splited[1]}. ${BOOKS[splited[2]]}`);
    };

    const getTasks = async () => {
        const content = await getTaskById(taskId);
        const tasks = content?.tasks || {};

        setTasks(tasks);
    };

    return (
        <div className={'tasks'}>
            <div className={'container'}>
                <div className={'module-header'}>
                    <NavLink href={'/tasks'}>
                        <a>	&#8592; {textForApp[props.lang]?.links?.[7]}</a>
                    </NavLink>
                    <h1>{moduleName}</h1>
                </div>
                <div className={style.tasks_wrapper}>
                    {tasks.task?.map((task: GeneralTask, index) => {
                        if ((isTest && index <= solvedTasks) || !isTest) {
                            return <TypedTask key={`${taskId}-${index + 1}`} task={task} moveNext={moveNext}/>;
                        }

                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Tasks;

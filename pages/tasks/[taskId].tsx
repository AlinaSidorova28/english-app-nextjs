import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import NavLink from '../../components/NavLink/NavLink';
import Spinner from '../../components/Spinner/Spinner';
import TypedTask from '../../components/TaskBlock/TypedTask';
import { BOOKS } from '../../constants/constants';
import textForApp from '../../constants/translate';
import Task from '../../models/Task';
import style from '../../styles/Tasks.module.scss';
import { GeneralTask } from '../../types/general';
import { updateSettings } from '../../utils/settingsControllers';
import { getTaskById } from '../../utils/TasksControllers';

const Tasks = (props) => {
    const [tasks, setTasks] = useState<Task>({} as Task);
    const [moduleName, setModuleName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(props.settings?.progress);
    const isTest = tasks?.id?.includes('tb');

    const router = useRouter();
    const { taskId } = router.query;
    const currentTask = progress?.[taskId as string] ?? {};
    const [solvedTasks, setSolvedTasks] = useState(Object.keys(currentTask)
        ?.filter((key) => currentTask[key]?.done)?.length ?? 0);

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
        setIsLoading(false);
    };

    const updateProgress = (settings) => {
        updateSettings(settings);
        setProgress({ ...progress, ...settings?.progress });
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
                    {isLoading
                        ? <Spinner/>
                        : tasks.task?.map((task: GeneralTask, index) => {
                            if ((isTest && index <= solvedTasks) || !isTest) {
                                return <TypedTask key={`${taskId}-${index + 1}`}
                                                  task={task}
                                                  taskId={taskId as string}
                                                  moveNext={moveNext}
                                                  progress={progress}
                                                  updateProgress={updateProgress}/>;
                            }

                            return null;
                        })}
                </div>
            </div>
        </div>
    );
};

export default Tasks;

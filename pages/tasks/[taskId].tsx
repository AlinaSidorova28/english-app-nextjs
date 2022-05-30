import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import NavLink from '../../components/NavLink/NavLink';
import Spinner from '../../components/Spinner/Spinner';
import TypedTask from '../../components/TaskBlock/TypedTask';
import { BOOKS, MAX_UNITS, PERCENT, TASKS_IN_TEST } from '../../constants/constants';
import textForApp from '../../constants/translate';
import Task from '../../models/Task';
import style from '../../styles/Tasks.module.scss';
import { GeneralTask } from '../../types/general';
import { updateSettings } from '../../utils/settingsControllers';
import { getTaskById } from '../../utils/TasksControllers';

const Tasks = ({ settings, lang }) => {
    const [tasks, setTasks] = useState<Task>({} as Task);
    const [moduleName, setModuleName] = useState<string | null>('');
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(settings?.progress);

    const router = useRouter();
    const { taskId } = router.query;
    const isTest = tasks?.id?.includes('tb');
    const [currentTask, setCurrentTask] = useState(progress?.[taskId as string] ?? {});
    const solvedTasksAmount = Object.keys(currentTask)?.filter((key) => key.match(/\d+/))?.length ?? 0;

    const [solvedTasks, setSolvedTasks] = useState(solvedTasksAmount);
    const [disabledArray, setDisabledArray] = useState(new Array(solvedTasksAmount).fill(true));
    const [result, setResult] = useState<JSX.Element | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getTasks();
        getModuleName();
    }, []);

    useEffect(() => {
        if (solvedTasks === TASKS_IN_TEST) {
            countResult();
        }
    }, [solvedTasks]);

    useEffect(() => {
        setCurrentTask(progress?.[taskId as string] ?? {});
    }, [progress]);

    const countResult = () => {
        const correct = progress[taskId as string].result?.[currentTask.attempts ? currentTask.attempts - 1 : 0];

        const result = <div className={style.result}>
            {`${textForApp[lang].inscription.result}: ${(correct / TASKS_IN_TEST) * PERCENT}% 
            (${correct}/${TASKS_IN_TEST})`}
        </div>;
        setResult(result);
    };

    const moveNext = () => {
        setSolvedTasks(solvedTasks + 1);
        setDisabledArray([...disabledArray, true]);
    };

    const getModuleName = async () => {
        const splited = (taskId as string)?.split('-') ?? '';
        if (splited.length !== 3
            || +splited[1] <= 0 || +splited[1] > MAX_UNITS
            || !Object.keys(BOOKS).includes(splited[2])) {
            setModuleName(null);
        } else {
            setModuleName(`Unit ${splited[1]}. ${BOOKS[splited[2]]}`);
        }
    };

    const getTasks = async () => {
        const content = await getTaskById(taskId);
        const tasks = content?.tasks || {};

        setTasks(tasks);
        setIsLoading(false);
    };

    const updateProgress = (settings, onReset = false) => {
        updateSettings(settings);
        if (onReset) {
            setProgress({ ...settings?.progress });
        } else {
            setProgress({ ...progress, ...settings?.progress });
        }
    };

    const showModal = (isModalOpen) => {
        setIsModalOpen(isModalOpen);
    };

    const onConfirm = () => {
        const formattedSettings = settings ? { ...settings } : {};
        const attempts = progress?.[taskId as string]?.attempts + 1 ?? 1;
        const result = progress?.[taskId as string]?.result;

        formattedSettings.progress = {
            ...progress,
            [taskId as string]: { attempts, result, done: false },
        };
        updateProgress(formattedSettings, true);
        setSolvedTasks(0);
        setDisabledArray([]);
        showModal(false);
    };

    if (moduleName === null || (!isLoading && !tasks?.task?.length)) {
        return <div className={'error-section'}>
            <div className={'error'}>
                <img src={`https://http.cat/400`} alt={''} />
            </div>
        </div>;
    }

    return (
        <div className={'tasks'}>
            {isModalOpen && <ConfirmModal question={textForApp[lang]?.modal?.questions?.[0]}
                                          lang={lang}
                                          onClose={showModal.bind(null, false)}
                                          onConfirm={onConfirm.bind(null)}/>}

            <div className={'container'}>
                <div className={'module-header'}>
                    <NavLink href={'/tasks'}>
                        <a>	&#8592; {textForApp[lang]?.links?.[6]}</a>
                    </NavLink>
                    <h1>{moduleName}</h1>
                </div>
                <div className={style['tasks-wrapper']}>
                    {isLoading
                        ? <Spinner/>
                        : <>
                            {tasks.task?.map((task: GeneralTask, index) => {
                                if ((isTest && index <= solvedTasks) || !isTest) {
                                    return <TypedTask key={`${taskId}-${index + 1}`}
                                                      task={task}
                                                      taskId={taskId as string}
                                                      moveNext={moveNext}
                                                      progress={progress}
                                                      isTest={isTest}
                                                      disabled={isTest && disabledArray[index]}
                                                      updateProgress={updateProgress}/>;
                                }

                                return null;
                            })}
                            {solvedTasks === TASKS_IN_TEST
                                && <div className={style.reset}>
                                    {result}
                                    <button className={style['reset-button']}
                                            onClick={showModal.bind(null, true)}>
                                        <img src={'/reset.png'}/> {textForApp[lang].inscription.again}
                                    </button>
                                </div>}
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Tasks;

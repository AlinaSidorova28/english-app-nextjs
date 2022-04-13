import Task from '../models/Task';
import documentStore from '../utils/documentStore';

export default async function addTask() {
    const store = documentStore;

    const session = store.openSession('english-app');

    const task = new Task(
        'a2-3-tb',
        [],
    );

    console.log(task);
    await session.store<Task>(task);
    await session.saveChanges();
}

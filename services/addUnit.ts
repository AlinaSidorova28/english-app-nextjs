import Unit from '../models/Unit';
import documentStore from '../utils/documentStore';

export default async function addUnit() {
    const store = documentStore;

    const session = store.openSession('english-app');

    const unit = new Unit(
        'a2-4',
        'What a day!',
        'a2-4-sb',
        'a2-4-wb',
        'a2-4-tb',
    );

    // console.log(unit);
    await session.store<Unit>(unit);
    await session.saveChanges();
}

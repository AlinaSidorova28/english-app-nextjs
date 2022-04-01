import Word from '../models/Word';
import documentStore from '../utils/documentStore';

export default async function addWord() {
    const store = documentStore;

    // documentStore.conventions.registerEntityType(Word);
    const session = store.openSession('english-app');

    const word = new Word(
        '1', 'iPhone XS', 999.99, 'USD', 64, 'Apple', true, 'date',
    );

    console.log(word);
    await session.store<Word>(word);
    await session.saveChanges();
}

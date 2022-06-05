import Word from '../models/Word';
import documentStore from '../utils/documentStore';

export default async function addWord() {
    const store = documentStore;

    const session = store.openSession('english-app');

    const word = new Word(
        'a2-1-words',
        1,
        [
            'a2-1-words-1.jpg',
            'a2-1-words-2.jpg',
            'a2-1-words-3.jpg',
        ],
    );

    // console.log(word);
    await session.store<Word>(word);
    await session.saveChanges();
}

import Rule from '../models/Rule';
import documentStore from '../utils/documentStore';

export default async function addRule() {
    const store = documentStore;

    const session = store.openSession('english-app');

    const rule = new Rule(
        'a2-4-rules',
        [
            {
                number: 1,
                name: 'Past Continuous',
                content: [
                    'a2-4-rules-1-1.jpg',
                    'a2-4-rules-1-2.jpg',
                ],
            },
            {
                number: 2,
                name: 'Adjectives/adverbs',
                content: [
                    'a2-4-rules-2-1.jpg',
                    'a2-4-rules-2-2.jpg',
                ],
            },
            {
                number: 3,
                name: 'Can/may (permission)',
                content: ['a2-4-rules-3-1.jpg'],
            },
        ],
    );

    console.log(rule);
    await session.store<Rule>(rule);
    await session.saveChanges();
}

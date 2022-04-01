import { DocumentStore } from 'ravendb';

import { certificate } from './certificate';

const authOptions = {
    certificate,
    type: "pem",
    password: '',
};

// @ts-ignore
const documentStore = new DocumentStore(['https://a.free.asidorova.ravendb.cloud'], 'english-app', authOptions);
documentStore.initialize();

export default documentStore;

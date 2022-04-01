import { DocumentStore } from 'ravendb';

import { DB_NAME, DB_URI } from '../constants/constants';
import { certificate } from './certificate';

const authOptions = {
    certificate,
    type: "pem",
    password: '',
};

// @ts-ignore
const documentStore = new DocumentStore([DB_URI], DB_NAME, authOptions);
documentStore.initialize();

export default documentStore;

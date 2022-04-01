import * as React from 'react';

import { ChunksErrorView } from '../../components/GlobalErrorCatchHandler/GlobalErrorCatchHandler';

type TLazyImport = { default: React.ComponentType<any> };
export const index = async (fn: () => Promise<TLazyImport>): Promise<TLazyImport> => {
    try {
        return await fn();
    } catch (e) {
        return new Promise((resolve) => {
            return resolve({
                default: ChunksErrorView.bind(null, e),
            });
        });
    }
};

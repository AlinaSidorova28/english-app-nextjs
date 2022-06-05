import type { NextApiRequest, NextApiResponse } from 'next';

import { RESPONSE_STATUSES } from '../../constants/constants';

type Data = {
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    // await addWord();
    // await addRule();
    // await addTask();
    // await addUnit();
    res.status(RESPONSE_STATUSES.CODE_200).json({ name: 'John Doe' });
}

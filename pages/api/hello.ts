// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import addWord from 'services/addWord';

type Data = {
    name: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await addWord();
    res.status(200).json({ name: 'John Doe' });
}

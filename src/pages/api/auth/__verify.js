import { jwtVerify } from 'jose';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    try {

        console.log(`server`, req)

        // let authorizationToken = req.headers.authorization;
        // authorizationToken = authorizationToken.split(' ')[1]

        const key = new TextEncoder().encode(SECRET_KEY);
        const jwt = await jwtVerify(authorizationToken, key);
        // if (jwt) {
        //     const { exp, payload } = jwt;
        //     if (Date.now() > exp) {
        //         return res.status(200).json(null);
        //     }

        //     const admin = await prisma.user.findUnique({
        //         where: {
        //             id: payload.id
        //         }
        //     });
        //     if (admin) {
        //         return res.status(200).send({ message: 'verified' });
        //     } else {
        //         return res.status(401).send({ message: 'Unauthorized' });
        //     }
        // } else {
        //     return res.status(401).send({ message: 'Unauthorized' });
        // }

    } catch (err) {
        console.error(err)
        res.status(400).json(err);
    }
}
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createAdmin = async (email, password) => {
    try {

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptedPwd = await bcrypt.hash(password, salt);

        // insert a user
        const admin = await prisma.user.create({
            data: { email, password: encryptedPwd }
        });

        // return admin
        return admin;

    } catch (err) {
        throw err;
    }
}

export default async function handler(req, res) {

    if (req.method === 'POST') {
        return res.status(405).send({ message: `${req.method} method does not allowed` });
    }

    try {

        const SECRET_KEY = process.env.SECRET_KEY;
        const { email, password } = req.body;

        // create admin for medicare
        // const newAdmin = await createAdmin(email, password);

        // find user
        const admin = await prisma.user.findUnique({
            where: { email },
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin Not Found' });
        }

        bcrypt.compare(password, admin.password, async (err, result) => {
            if (!result) {
                return res.status(401).json({ message: 'Invalid login credentials' });
            } else {
                const expiredTime = new Date(Date.now() + (3600000 * (24 * 7))); // expiration date
                const key = new TextEncoder().encode(SECRET_KEY) // encoded key

                const jwt = new SignJWT(admin);
                jwt.setProtectedHeader({ alg: 'HS256', });
                jwt.setExpirationTime(expiredTime);
                const token = await jwt.sign(key);
                res.setHeader('Set-Cookie', `medicare_admin=${token}; HttpOnly; Expires:${expiredTime.toUTCString()}; Path=/`)
                return res.status(200).send({ message: 'login successfully', token });
            }
        })


    } catch (err) {
        res.status(400).json({ message: err?.message || '' });
    }
}

export const config = {
    api: {
        externalResolver: true,
    },
}

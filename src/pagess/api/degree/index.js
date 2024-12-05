import prisma from "@/lib/prisma";

export default async function handler(req, res) {

    if (!(req.method === 'POST' || req.method === 'GET')) {
        return res.status(405).json({ message: `${req.method} method not allowed` });
    }

    try {

        if (req.method === 'POST') { // add degree
            const newDegree = req.body;
            const degree = await prisma.degree.create({ data: newDegree });
            return res.status(201).send(degree);
        }

        // send all degree
        const degrees = await prisma.degree.findMany({});
        return res.status(200).send(degrees);

    } catch (err) {
        res.status(400).json(err);
    }
}
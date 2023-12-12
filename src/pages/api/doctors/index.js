import prisma from "@/lib/prisma";

export default async function handler(req, res) {

    if (!(req.method === 'POST' || req.method === 'GET')) {
        return res.status(405).json({ message: `${req.method} method not allowed` });
    }

    try {

        if (req.method === 'POST') {
            const newDoctor = req.body;
            const result = await prisma.doctor.create({ data: newDoctor });

            return res.status(201).json(result);
        }

        const doctors = await prisma.doctor.findMany({});
        return res.json(doctors);

    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }

}
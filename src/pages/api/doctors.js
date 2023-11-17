const doctorsData = [
    {
        name: "Dr. John Smith",
        image: "/images/doctores/image1.jpg",
        currentEmployeeOf: "City Hospital",
        visitTimes: ["Monday 10am-2pm", "Wednesday 2pm-6pm", "Friday 9am-1pm"],
        visitPrice: 100,
        degree: "MD, Internal Medicine",
        specialist: "Internal Medicine",
    },
    {
        name: "Dr. Emily Johnson",
        image: "/images/doctores/image2.jpg",
        currentEmployeeOf: "Regional Medical Center",
        visitTimes: ["Tuesday 1pm-5pm", "Thursday 10am-2pm", "Saturday 3pm-7pm"],
        visitPrice: 120,
        degree: "DO, Family Medicine",
        specialist: "Family Medicine",
    },
    {
        name: "Dr. Michael Davis",
        image: "/images/doctores/image3.jpg",
        currentEmployeeOf: "General Hospital",
        visitTimes: ["Monday 9am-1pm", "Wednesday 3pm-7pm", "Friday 11am-3pm"],
        visitPrice: 110,
        degree: "MD, Cardiology",
        specialist: "Cardiology",
    },
    {
        name: "Dr. Sarah Miller",
        image: "/images/doctores/image4.jpg",
        currentEmployeeOf: "Community Clinic",
        visitTimes: ["Tuesday 2pm-6pm", "Thursday 9am-1pm", "Saturday 11am-3pm"],
        visitPrice: 90,
        degree: "DO, Pediatrics",
        specialist: "Pediatrics",
    },
    {
        name: "Dr. James Wilson",
        image: "/images/doctores/image5.jpg",
        currentEmployeeOf: "University Medical Center",
        visitTimes: ["Monday 1pm-5pm", "Wednesday 10am-2pm", "Friday 3pm-7pm"],
        visitPrice: 105,
        degree: "MD, Orthopedics",
        specialist: "Orthopedics",
    },
    {
        name: "Dr. Elizabeth Taylor",
        image: "/images/doctores/image28.jpg",
        currentEmployeeOf: "Private Practice",
        visitTimes: ["Monday 3pm-7pm", "Wednesday 9am-1pm", "Friday 1pm-5pm"],
        visitPrice: 95,
        degree: "MD, Dermatology",
        specialist: "Dermatology",
    },
    {
        name: "Dr. Christopher Brown",
        image: "/images/doctores/image29.jpg",
        currentEmployeeOf: "City Medical Center",
        visitTimes: ["Tuesday 3pm-7pm", "Thursday 9am-1pm", "Saturday 1pm-5pm"],
        visitPrice: 100,
        degree: "DO, Neurology",
        specialist: "Neurology",
    },
    {
        name: "Dr. Olivia Clark",
        image: "/images/doctores/image30.jpg",
        currentEmployeeOf: "Regional Hospital",
        visitTimes: ["Monday 2pm-6pm", "Wednesday 10am-2pm", "Friday 3pm-7pm"],
        visitPrice: 110,
        degree: "MD, Gynecology",
        specialist: "Gynecology",
    },
];

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(405).json({ message: `${req.method} method is not allowed` });
    }

    try {
        return res.status(200).json(doctorsData);
    } catch (err) {
        return res.status(400).send(err);
    }
}

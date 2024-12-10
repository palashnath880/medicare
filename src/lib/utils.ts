import { toast } from "react-toastify";

export const convertTimeStringToDateObject = (timeString) => {
  if (
    !timeString &&
    !(timeString.endsWith("AM") || timeString.endsWith("PM"))
  ) {
    return null;
  }

  // Extract the hours, minutes, and AM/PM indicator from the time string
  const [hoursString, minutesString] = timeString.split(":");
  const amPmIndicator = minutesString.split(" ")[1];

  // Convert the hours and minutes strings to numbers
  let hours = parseInt(hoursString);
  let minutes = parseInt(minutesString);

  // Convert the AM/PM indicator to 12-hour format
  const isPm = amPmIndicator.toUpperCase() === "PM";
  if (isPm && hours !== 12) {
    hours += 12;
  } else if (!isPm && hours === 12) {
    hours = 0;
  }

  // Create a new Date object with the extracted time values
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return date;
};

export const generateTimeList = () => {
  const times = [];
  const startDate = new Date();
  startDate.setHours(1, 0, 0, 0); // Set initial time to 1:00 AM

  for (let i = 0; i < 48; i++) {
    const currentTime = new Date(startDate.getTime() + i * 15 * 60 * 1000);
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    // Determine AM or PM
    const period = hours < 12 ? "AM" : "PM";

    // Format hours and minutes
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Format and push the time to the list
    times.push(`${formattedHours}:${formattedMinutes} ${period}`);
  }

  return times;
};

export const isTimeBetween = (startTime, endTime, time) => {
  if (!startTime && !endTime) {
    return false;
  }

  if (startTime === time) {
    // if start time equal to time
    return true;
  }

  if (endTime === time) {
    // if end time equal to time
    return true;
  }

  if (!startTime || !endTime) {
    return false;
  }

  const startTimeToDate = convertTimeStringToDateObject(startTime);
  const endTimeToDate = convertTimeStringToDateObject(endTime);
  const timeToDate = convertTimeStringToDateObject(time);

  if (startTimeToDate <= timeToDate && timeToDate <= endTimeToDate) {
    return true;
  }

  return false;
};

export const uploadImage = (image) =>
  new Promise(async (resolve, reject) => {
    try {
      const imgRes = await fetch(image);
      const blob = await imgRes.blob();

      const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`;
      const form = new FormData();
      form.append("image", blob);
      // form.append('key', process.env.NEXT_PUBLIC_IMGBB_KEY);

      const res = await fetch(url, {
        method: "POST",
        body: form,
      });
      const data = await res.json();

      if (data?.data) {
        resolve(data.data);
      }
    } catch (err) {
      reject(err);
    }
  });

export const modifiedToast = (text, icon) => {
  return toast(text, {
    icon: icon,
    className: "!text-sm !text-white !font-semibold !bg-secondary",
    theme: "dark",
  });
};

export const filterTimeForBooking = (inputTime, bookedTime, schedules) => {};

export const displayPrice = (amount: number) => {
  const formattedNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "bdt",
  }).format(amount);
  return formattedNumber;
};

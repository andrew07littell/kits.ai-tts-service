import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDifference(inputTime: string) {
  const inputDate = new Date(inputTime);

  const currentDate = new Date();

  const timeDifference = Math.max(currentDate - inputDate, 0);

  const secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${
      secondsDifference !== 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 3600) {
    const minutesDifference = Math.floor(secondsDifference / 60);
    return `${minutesDifference} minute${
      minutesDifference !== 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 86400) {
    const hoursDifference = Math.floor(secondsDifference / 3600);
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  } else {
    const daysDifference = Math.floor(secondsDifference / 86400);
    return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
  }
}

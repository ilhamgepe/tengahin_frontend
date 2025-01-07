import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const nameParts = name.trim().split(" ");

  if (nameParts.length === 1) {
    return nameParts[0][0].toUpperCase();
  } else {
    return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
  }
}

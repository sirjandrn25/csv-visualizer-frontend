import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const parseCsvHeaderToTableColumn = (data: any[]) => {
    return data.map((item) => ({
        accessorKey: item?.name,
        header: Capitalize(item.name?.split("_").join(" ")),
    }));
};
export const Capitalize = (str: string = "") => {
    if (!str) return str;
    const firstElement = str[0];
    return `${firstElement.toUpperCase()}${str.slice(1, str?.length)}`;
};

export const base_url = "http://127.0.0.1:8000";

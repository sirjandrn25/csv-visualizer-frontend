import { DictionaryType } from "../types/common.types";

export class CommonUtils {
    static IsUndefined = (value: any) => {
        return typeof value === "undefined";
    };

    static IsUndefinedOrNull = (value: any) => {
        if (CommonUtils.IsUndefined(value)) return true;
        return value === null;
    };

    static createQueryString(
        params: Record<string, string | number | null>,
        searchParams: DictionaryType
    ) {
        const newSearchParams = new URLSearchParams(searchParams?.toString());

        for (const [key, value] of Object.entries(params)) {
            if (value === null) {
                newSearchParams.delete(key);
            } else {
                newSearchParams.set(key, String(value));
            }
        }

        return newSearchParams.toString();
    }
    static randomFourDigit = (digit = 4) => {
        const fourDigit = Math.floor(1000 + Math.random() * 9000);
        return fourDigit.toString();
    };
}

export const EmptyFunction = () => {
    // empty function
};
let timer: any;
export const Debounce = (func: (value?: any) => void, wait: number) => {
    return (...args: any) => {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
};

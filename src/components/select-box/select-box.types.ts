export const parseSelectBoxOptions = (
    data: any = [],
    value: any = "",
    label: any = ""
) => {
    return data.map((item: any, index: any) => {
        if (typeof item === "string") {
            return {
                label: item,
                id: index + 1,
                value: item,
            };
        }
        return {
            label: item[label],
            value: item[value],
            data: item,
        };
    });
};
export type SelectOptionType = {
    label: string;
    value: string | number;
    data?: any;
};

export interface SelectBoxInterface {
    label?: string;
    options?: SelectOptionType[];
    onChange?: (value: any) => any;
    error?: string;
    isMultiple?: boolean;
    required?: boolean;
    className?: string;
    async?: boolean;
    isSearchable?: boolean;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    valueClassName?: string;
    isClearable?: boolean;
}

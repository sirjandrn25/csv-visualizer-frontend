"use client";

import { forwardRef } from "react";

import { cn } from "../../lib/utils";

import {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
    Select,
} from "../ui/select";
import { SelectOptionType } from "./select-box.types";

export type SelectFieldType = {
    options?: SelectOptionType[];

    name?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
    error?: string;
    triggerClassName?: string;
    [key: string]: any;
};
const SelectBox = forwardRef(
    (
        {
            label,
            options,
            onChange,
            required,
            value,
            className,
            error,
            ...rest
        }: SelectFieldType,
        ref: any
    ) => {
        return (
            <div className={cn("flex flex-col gap-2", className)}>
                <Select
                    onValueChange={onChange}
                    value={value}
                    defaultValue={value}
                    disabled={rest?.disabled}
                >
                    <SelectTrigger className={rest?.triggerClassName} ref={ref}>
                        <SelectValue
                            defaultValue={String(value)}
                            placeholder={rest?.placeholder ?? "Select Options"}
                        />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                            {options?.map((option) => {
                                return (
                                    <SelectItem
                                        key={option?.value}
                                        value={String(option?.value)}
                                    >
                                        {option?.label}{" "}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        );
    }
);
SelectBox.displayName = "SelectBox";
export default SelectBox;

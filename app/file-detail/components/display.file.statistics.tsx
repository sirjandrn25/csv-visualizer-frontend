"use client";

import { ArrayUtils } from "@/lib/array.utils";
import { base_url } from "@/lib/utils";
import { DictionaryType } from "@/types/common.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import StatisticChart from "./static-chart";
const meta_info = `/file-meta-info`;
const DisplayFileStatistics = () => {
    const { data = {} } = useQuery({
        queryFn: async () => {
            try {
                const result = await axios.get(`${base_url}${meta_info}`);

                return result?.data;
            } catch (error) {
                return {};
            }
        },
        queryKey: [meta_info],
    });
    const sanitizeData = useMemo(() => {
        const result: DictionaryType[] = [];
        Object.entries(data).forEach(([key, value]) => {
            result.push({
                label: key,
                info: value,
            });
        });
        return result.filter((item: DictionaryType) => {
            return item?.label !== "id";
        });
    }, [data]);
    if (ArrayUtils.isEmpty(sanitizeData)) return <></>;
    return (
        <div className="flex items-center gap-4 flex-wrap">
            {sanitizeData?.map((item: DictionaryType) => {
                return (
                    <FileStatisticsCard
                        key={item?.label as string}
                        label={item?.label}
                        info={item?.info}
                    />
                );
            })}
        </div>
    );
};

export default DisplayFileStatistics;
type InformationItemProps = {
    label: string;
    value: string | number;
};

export type FileStatisticsCardProps = {
    label: string;
    info: FileStatisticsCardInfoProps;
};
export type FileStatisticsCardInfoProps = {
    count: number;
    min: number;
    max: number;
    mean: number;
    std: number;
    [key: string]: number;
};
export const FileStatisticsCard = ({
    label,
    info,
}: FileStatisticsCardProps) => {
    return (
        <div className="rounded flex-1 border shadow flex flex-col ">
            <div className=" border-b px-4 py-2 flex items-center justify-between ">
                <div className="capitalize font-medium">{label} Overview</div>
            </div>
            <div className="flex flex-col gap-1  px-4 text-sm py-2">
                <StatisticChart {...info} />
                {/* <InformationItem
                    {...{ label: "Count", value: info.count || 0 }}
                />
                <InformationItem {...{ label: "Min", value: info.min }} />
                <InformationItem {...{ label: "Max", value: info.max }} />
                <InformationItem {...{ label: "Mean", value: info.mean }} />
                <InformationItem
                    {...{ label: "Standard Deviation", value: info.std }}
                /> */}
            </div>
        </div>
    );
};
const InformationItem = ({ label, value }: InformationItemProps) => {
    return (
        <div className="flex justify-between">
            <p className="text-muted-foreground capitalize">{label}</p>
            <p>{value}</p>
        </div>
    );
};

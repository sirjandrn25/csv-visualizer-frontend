"use client";
import DataTable from "@/components/data-table/data-table.component";
import { base_url, parseCsvHeaderToTableColumn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DisplayFileStatistics from "./components/display.file.statistics";

const table_info = `/file-table-info`;

const FileDetail = () => {
    const { data } = useQuery({
        queryFn: async () => {
            try {
                const result = await axios.get(`${base_url}${table_info}`);

                return result?.data;
            } catch (error) {
                return {};
            }
        },
        queryKey: [table_info],
    });

    const columns = parseCsvHeaderToTableColumn(
        (data as any)?.schema?.fields || []
    );

    return (
        <div className="container flex flex-col gap-6 py-6">
            <DisplayFileStatistics />
            <DataTable columns={columns} data={(data as any)?.data || []} />
        </div>
    );
};

export default FileDetail;

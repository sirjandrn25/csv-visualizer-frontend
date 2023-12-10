import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";
import SelectBox from "../select-box/select-box.component";
import { Button } from "../ui/button";

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
    table,
    pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
    return (
        <div className="flex flex-col items-center justify-between w-full gap-4 px-2 py-1 overflow-auto sm:flex-row sm:gap-8">
            <div className="flex-1 text-sm whitespace-nowrap text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium whitespace-nowrap">
                        Rows per page
                    </p>
                    <SelectBox
                        options={pageSizeOptions.map((option) => ({
                            label: String(option),
                            value: option,
                        }))}
                        onChange={(value: any) => {
                            table.setPageSize(Number(value));
                        }}
                        triggerClassName="h-8 w-[70px]"
                        placeholder={table
                            .getState()
                            .pagination.pageSize.toString()}
                        value={`${table.getState().pagination.pageSize}`}
                    />
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2 ">
                    <Button
                        aria-label="Go to first page"
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <DoubleArrowLeftIcon
                            className="w-4 h-4"
                            aria-hidden="true"
                        />
                    </Button>
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeftIcon
                            className="w-4 h-4"
                            aria-hidden="true"
                        />
                    </Button>
                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        className="w-8 h-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRightIcon
                            className="w-4 h-4"
                            aria-hidden="true"
                        />
                    </Button>
                    <Button
                        aria-label="Go to last page"
                        variant="outline"
                        className="hidden w-8 h-8 p-0 lg:flex"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        <DoubleArrowRightIcon
                            className="w-4 h-4"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}

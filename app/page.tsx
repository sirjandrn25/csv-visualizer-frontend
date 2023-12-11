"use client";
import FileUploader from "@/components/file.uploader";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const [files, setFiles] = useState([
        "https://csv-visualizer.s3.us-east-1.amazonaws.com/employee_demo.csv-8239",
    ]);
    return (
        <div className="h-screen w-screen flex items-center  justify-center">
            <div className="flex flex-col gap-6 min-w-[300px]">
                {" "}
                <FileUploader
                    onUpload={(file: any) => {
                        setFiles([file, ...files]);
                    }}
                />
                <div className="border-b p-2">Csv Files</div>
                <div className="flex flex-col gap-4">
                    {files.map((file) => (
                        <div
                            key={file}
                            className="flex items-center flex-wrap gap-4 justify-between p-2  px-4  rounded border "
                        >
                            <Link
                                href={file}
                                className="text-blue-500 hover:underline text-sm"
                                target="_blank"
                            >
                                {file}
                            </Link>
                            <Link
                                href={`/file-detail?file=${file}`}
                                className={buttonVariants({
                                    size: "sm",
                                    className: "border  h-[30px] ",
                                })}
                                target="_blank"
                            >
                                Visualize
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

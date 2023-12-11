"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Loader, UploadCloud } from "lucide-react";
import axios from "axios";

const url = "http://localhost:3000";
const FileUploader = ({ onUpload }: { onUpload: (file: any) => void }) => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<any>();
    const onUploadFile = useCallback(
        async (file: any) => {
            const formData = new FormData();
            formData.append("file", file);

            const headers = { "Content-Type": "multipart/form-data" };
            try {
                const response = await axios({
                    headers,
                    method: "post",
                    data: formData,
                    url: `${url}/api/uploads`,
                });

                onUpload(response?.data?.file);
            } catch (error) {
                setError((error as any)?.message);
            }
            setUploading(false);
        },
        [onUpload]
    );
    const onDrop = useCallback(
        (acceptedFiles: any, fileRejections: any) => {
            setUploading(true);

            if (fileRejections?.length) {
                setError(fileRejections[0]?.errors[0]?.message);
            } else if (acceptedFiles?.length) {
                onUploadFile(acceptedFiles[0]);
            }

            // Do something with the files
        },
        [onUploadFile]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            "text/csv": [".csv"],
        },
        disabled: uploading,
    });
    return (
        <div {...getRootProps()} className="flex flex-col gap-1">
            <input {...getInputProps()} />
            <Button
                variant={"outline"}
                className="rounded flex items-center gap-2 border-dashed"
                disabled={uploading}
            >
                {uploading ? (
                    <Loader className="text-secondary" />
                ) : (
                    <UploadCloud />
                )}{" "}
                <span>Upload Csv File</span>
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default FileUploader;

"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Loader, UploadCloud } from "lucide-react";

const FileUploader = () => {
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<any>();
    const onDrop = useCallback((acceptedFiles: any, fileRejections: any) => {
        setUploading(true);
        setTimeout(() => setUploading(false), 5000);
        if (fileRejections?.length) {
            setError(fileRejections[0]?.errors[0]?.message);
        }
        // Do something with the files
    }, []);
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

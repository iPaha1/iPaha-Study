"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "react-hot-toast";

interface FileUploadProps {
    onChanges: (files: string) => void;
    endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
    onChanges,
    endpoint

}: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChanges(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />

    )
}

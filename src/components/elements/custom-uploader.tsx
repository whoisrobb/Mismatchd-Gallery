import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { FileResponse } from "@/lib/types";
import { useUploadThing } from "@/lib/uploadthing";

export interface MyFileType extends File {
    preview: string;
}
 
export const MultiUploader = ({ addFiles, triggerDialog }: { addFiles: (to: FileResponse[]) => void, triggerDialog: (to: boolean) => void }) => {
  const [files, setFiles] = useState<MyFileType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles);
  }, [files]);
 
  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (fileUrl) => {
        console.log("response", fileUrl)
        addFiles(fileUrl);
        triggerDialog(false);
        setFiles([]);
        setIsSubmitting(false)
      },
      onUploadError: () => {
        toast.error("Error occurred while uploading");
      },
    },
  );
  
  const onSubmit = async (files: MyFileType[]) => {
    setIsSubmitting(true);

    try {
      const result = await toast.promise(startUpload(files), {
        loading: 'Uploading...',
        success: () => 'Uploaded successfully!',
        error: () => 'Failed to upload!',
      });

    } catch (error) {
        toast.error('Failed to upload!');
    } finally {
        setIsSubmitting(false);
    }
};
 
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

    const removeItem = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }
 
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
 
  return (
    <>        
        <div>
            <div {...getRootProps()} className="cursor-pointer border-2 border-dashed rounded-lg h-48 w-full grid place-items-center">
                <input {...getInputProps()} />
                <div className="grid place-items-center gap-y-4">
                    <div className="border border-dashed rounded-full h-12 w-12 grid place-items-center">
                        <UploadIcon />
                    </div>
                    <div className="text-center">
                        <p className="font-bold">Drag & drop some files here &lsquo or click to select files</p>
                        <p className="text-sm text-muted-foreground">You can upload up to 8 files (max 4mb each)</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4 m-4">
                {files.map((file, index) => (
                    <FileComponent
                        key={index}
                        file={file}
                        index={index}
                        removeItem={removeItem}
                    />
                ))}
            </div>
            {files.length > 0 && <Button 
                disabled={isSubmitting}
                onClick={() => onSubmit(files)}
            >
                Continue
            </Button>}
        </div>
    </>
  );
}

const FileComponent = ({ file, index, removeItem }: { file: MyFileType, index: number, removeItem: (to: number) => void }) => {
    return (
        <div className="flex gap-4 justify-between">
            <Image
                src={file.preview}
                alt={file.name}
                width={48}
                height={48}
                loading="lazy"
                className="aspect-square shrink-0 rounded-md object-cover"
            />
            <div className="">
                <p className="">{file.name}</p>
                <p className="text-sm text-muted-foreground">{Math.floor(file.size / 1024)} KB</p>
            </div>
            <Button
                variant={"outline"}
                size={"icon"}
                onClick={() => removeItem(index)}
            >
                <Cross2Icon />
            </Button>
        </div>
    )
}
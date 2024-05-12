"use client";

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileResponse } from "@/lib/types";
import { MultiUploader } from "./custom-uploader";

const FileInput = ({ addFiles, triggerDialog }: { addFiles: (to: FileResponse[]) => void, triggerDialog: (to: boolean) => void }) => {
    return (
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Upload files</DialogTitle>
            <DialogDescription>
                <MultiUploader addFiles={addFiles} triggerDialog={triggerDialog} />
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    )
}

export default FileInput;
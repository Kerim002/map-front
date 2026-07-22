import { IMAGE_EXTS, ONLYOFFICE_EXTS } from "../constants/item-exts";

export const getFileInfo = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase() || "";
    return {
        isDoc: ONLYOFFICE_EXTS.includes(ext),
        isImage: IMAGE_EXTS.includes(ext),
        ext
    };
};
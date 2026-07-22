type VariantKeys = "user" | "image" | "fileDownload" | "trash";
type SizeKeys = "sm" | "md" | "xmd";

type VariantFunctions = {
  user: (url: string) => Record<SizeKeys, string>;
  image: (url: string) => Record<SizeKeys, string>;
  fileDownload: (url: string) => string;
  trash:(url:string) => string
};

const S3URL = import.meta.env.VITE_MINIO_URL;

const variants: VariantFunctions = {
  user: (url: string) => ({
    sm: `${S3URL}/location-image/${url}/sm.webp?${Date.now().toString().slice(0,8)}`,
    md: `${S3URL}/location-image/${url}/md.webp?${Date.now().toString().slice(0,8)}`,
    xmd: `${S3URL}/location-image/${url}/xmd.webp?${Date.now().toString().slice(0,8)}`,
  }),
  image: (url: string) => ({
    sm: `${S3URL}/location-image/${url}/sm.webp?${Date.now().toString().slice(0,8)}`,
    md: `${S3URL}/location-image/${url}/md.webp?${Date.now().toString().slice(0,8)}`,
    xmd: `${S3URL}/location-image/${url}/xmd.webp?${Date.now().toString().slice(0,8)}`,
  }),
  fileDownload: (url: string) => `${S3URL}/location-files/${url}`,
  trash:(url:string) => `${S3URL}/${url}`

};

// Overloads
export function storageUrlCreate(type: "user", url: string, key: SizeKeys): string;
export function storageUrlCreate(type: "image", url: string, key: SizeKeys): string;
export function storageUrlCreate(type: "fileDownload", url: string): string;
export function storageUrlCreate(type: "trash", url:string):string

// Implementation
export function storageUrlCreate(
  type: VariantKeys,
  url: string,
  key?: SizeKeys // key must be optional here to support fileDownload
): string {
  if (!url) return "";

  const variantFn = variants[type];

  // We use a type assertion or a check here because variantFn's return type varies
  const result = variantFn(url);

  if (typeof result === "string") {
    return result;
  }

  // If it's an object, we need the key
  return key ? result[key] : "";
}
type VariantKeys = "user" | "image"; // Removed "file" as it isn't implemented yet
type SizeKeys = "sm" | "md" | "xmd";

type VariantFunctions = {
  user: (url: string) => Record<SizeKeys, string>;
  image: (url: string) => Record<SizeKeys, string>;
};

const S3URL = import.meta.env.VITE_MINIO_URL;

const variants: VariantFunctions = {
  user: (url: string) => ({
    sm: `${S3URL}/${url}/sm.webp?${Date.now()}`,
    md: `${S3URL}/${url}/md.webp?${Date.now()}`,
    xmd: `${S3URL}/${url}/xmd.webp?${Date.now()}`,
  }),

  image: (url: string) => ({
    sm: `${S3URL}/${url}/sm.webp?${Date.now()}`,
    md: `${S3URL}/${url}/sm.webp?${Date.now()}`,
    xmd: `${S3URL}/${url}/xmd.webp?${Date.now()}`,
  }),
};

// Overloads for better IDE autocompletion
export function storageUrlCreate(type: "user", url: string, key: SizeKeys): string;
export function storageUrlCreate(type: "image", url: string, key: SizeKeys): string;

// Implementation
export function storageUrlCreate(
  type: VariantKeys,
  url: string,
  key: SizeKeys
): string {
  if (!url) return "";

  const variantFn = variants[type];

  if (variantFn) {
    const urls = variantFn(url);
    return urls[key] || "";
  }

  return "";
}
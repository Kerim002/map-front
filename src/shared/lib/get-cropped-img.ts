export async function getCroppedImage(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number }
): Promise<File> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((res) => (image.onload = res));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  // Canvas dimensions based on the 3:4 crop area
  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(
        new File([blob!], "cropped-portrait.png", { type: "image/png" })
      );
    }, "image/png");
  });
}
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary and return the secure URL.
 * @param source - File path, URL, base64 data URI, or Buffer
 * @param folder  - Optional folder to organise uploads (e.g. "portfolio/projects")
 */
export async function uploadToCloudinary(
  source: string,
  folder?: string
): Promise<string> {
  const result = await cloudinary.uploader.upload(source, {
    ...(folder && { folder }),
  });
  return result.secure_url;
}

/**
 * Build an optimised Cloudinary delivery URL for an existing asset.
 * @param publicId   - The public ID of the asset (as returned by Cloudinary)
 * @param options    - Transformation options (width, height, quality, format, …)
 */
export function getCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | "auto";
    format?: string;
    crop?: string;
  } = {}
): string {
  return cloudinary.url(publicId, {
    secure: true,
    fetch_format: options.format ?? "auto",
    quality: options.quality ?? "auto",
    ...(options.width && { width: options.width }),
    ...(options.height && { height: options.height }),
    ...(options.crop && { crop: options.crop }),
  });
}

/**
 * Delete an asset from Cloudinary by its public ID.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Initialize S3 Client
const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function generateUploadURL(imgExtension) {
  const rawBytes = crypto.randomBytes(16);
  const imageName = `${rawBytes.toString("hex")}.${imgExtension}`;

  // Create command for S3 upload
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: imageName,
    ContentType: `image/${imgExtension}`, // Ensuring correct MIME type
  });

  // Generate a pre-signed upload URL (set expiration to 60 seconds)
  const uploadURL = await getSignedUrl(s3, command, { expiresIn: 60 });

  return { url: uploadURL, key: imageName };
}

export async function POST(req) {
  try {
    const { imgExtension } = await req.json();
    if (!imgExtension) {
      return new Response(
        JSON.stringify({ error: "imgExtension is required" }),
        { status: 400 }
      );
    }

    const data = await generateUploadURL(imgExtension);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error generating S3 URL:", error);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
    });
  }
}

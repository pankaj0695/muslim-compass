// File: app/api/image/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import formidable from "formidable";

// Disable body parsing by Next.js
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Create a new formidable instance
    const form = formidable({
        uploadDir,
        keepExtensions: true,
    });

    try {
        // Convert Next.js request to Node.js-readable stream
        const formData = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const file = formData.files.file;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Generate a unique filename
        const ext = path.extname(file.originalFilename);
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const newFilename = `file-${uniqueSuffix}${ext}`;
        const newPath = path.join(uploadDir, newFilename);

        // Rename the file
        fs.renameSync(file.filepath, newPath);

        // Return success response
        return NextResponse.json({
            message: "File uploaded successfully",
            filename: newFilename,
            path: `/uploads/${newFilename}`,
        });
    } catch (error) {
        console.error("Error processing file:", error);
        return NextResponse.json(
            { error: "An error occurred during file upload" },
            { status: 500 }
        );
    }
}
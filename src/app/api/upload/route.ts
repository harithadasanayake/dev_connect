import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: Request) {
  try {
    // Convert the Request body to a Node.js-readable stream
    const body = await req.arrayBuffer();
    const nodeStream = Readable.from(Buffer.from(body));

    // Simulate a Node.js IncomingMessage object
    const headers = Object.fromEntries(req.headers.entries());
    const simulatedRequest = Object.assign(nodeStream, { headers });

    const form = formidable({
      uploadDir,
      keepExtensions: true,
    });

    // Parse the form using the simulated Node.js request
    const files: any = await new Promise((resolve, reject) => {
      form.parse(simulatedRequest as any, (err, fields, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    if (!fileArray || fileArray.length === 0) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const file = fileArray[0];
    const filePath = path.join('/uploads', path.basename(file.filepath));

    return NextResponse.json({ filePath });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing the file upload' }, { status: 500 });
  }
}

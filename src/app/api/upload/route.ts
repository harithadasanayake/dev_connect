import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import formidable, { File, Fields, Files } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err: any, fields: Fields, files: Files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing the files' });
      return;
    }

    const fileArray = Array.isArray(files.file) ? files.file : [files.file];
    if (!fileArray || fileArray.length === 0) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const file = fileArray[0] as File;
    const filePath = path.join('/uploads', path.basename(file.filepath));

    res.status(200).json({ filePath });
  });
}
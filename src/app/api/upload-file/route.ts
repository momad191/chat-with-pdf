import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';


import { createFile } from "@/queries/files";
import { dbConnect } from "@/lib/mongo";
import { loadS3IntoPinecone } from "@/lib/pinecone"; 
// import { getS3Url } from "@/lib/s3";
import { auth } from "@/auth";
 
   
export async function POST(request: NextRequest) {

  await dbConnect()
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const foldername = session?.user?.email;

  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' });
  }
    
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Define the folder and file paths
  const folderPath = join(process.cwd(), 'public', `uploads/${foldername}`);
  const filePath = join(folderPath, file.name);
  const fileUrl = `/uploads/${foldername}/${file.name}`; // Relative URL to access the file

 
  
  try {

    
 
    const newFile = {
      file_name:file.name,
      file_url:fileUrl,
      user_name:session?.user?.name,
      user_email:session?.user?.email
    }

    // Create the folder if it doesn't exist
    await mkdir(folderPath, { recursive: true });

    // Write the file to the folder
    await writeFile(filePath, buffer);

    // load the file into Pinecone
    await loadS3IntoPinecone(file.name);

    await createFile(newFile);

    console.log(session)
    console.log(`File uploaded successfully. Path: ${filePath}`);
    return NextResponse.json({ success: true, url: `${fileUrl}`});
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ success: false });
  }
}
import { NextResponse } from "next/server";
import { createUser } from "@/queries/users"; 
import { dbConnect } from "@/lib/mongo";
import bcrypt from "bcryptjs";
 
export const POST = async (request) => {
  const {name, email, image, password} = await request.json();

  console.log(name, email, image, password);
 
  // Create a DB Conenction
  await dbConnect(); 
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
    image
  }
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err) {
    return new NextResponse(error.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });

 }
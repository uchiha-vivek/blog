import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import * as z from 'zod'

const userSchema = z.object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, 'Email is required').email("Invalid Email"),
    password: z.string().min(6, 'Password must have a minimum of 6 characters'),
})  
 


// POST Request 
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } =userSchema.parse(body);

        // check if email exists
        const existingUserByEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: 'User with this email already exists' }, { status: 409 });
        }

        // check if username already exists 
        const existingUserByUsername = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserByUsername) {
            return NextResponse.json({ user: null, message: 'User with this username already exists' }, { status: 409 });
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Save the user with the hashed password
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword // use the hashed password here
            }
        });

        return NextResponse.json({ user: newUser, message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

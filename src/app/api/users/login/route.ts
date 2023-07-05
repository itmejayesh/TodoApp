import { Connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    //checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //creating token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //creating token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, {
      expiresIn: "1d",
    });

    //sending token to user cookies
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

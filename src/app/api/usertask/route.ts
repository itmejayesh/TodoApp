import { Connect } from "@/db/dbConfig";
import Task from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { task } = reqBody;
    //checking is task body is empty
    if (!task) {
      return NextResponse.json({ error: "Task is required." }, { status: 400 });
    }

    const userTask = new Task({ task });
    const savedUser = await userTask.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "Task added successfully.",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}

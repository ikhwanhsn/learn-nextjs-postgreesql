import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const post = await prisma.post.create({
    data: { title, content },
  });
  return NextResponse.json(post);
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

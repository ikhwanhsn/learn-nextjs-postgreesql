import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json();
  const post = await prisma.post.update({
    where: { id: parseInt(params.id) },
    data: { title, content },
  });
  return NextResponse.json(post);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.post.delete({
    where: { id: parseInt(params.id) },
  });
  return NextResponse.json({ message: "Post deleted" });
}

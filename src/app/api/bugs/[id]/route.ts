import authOptions from "@/lib/authOptions";
import prisma from "@/lib/db";
import { patchBugSchema } from "@/lib/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // 1. Check request body
  const body: unknown = await request.json();
  const validation = patchBugSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 422 });
  }

  // 2. Check whether the id exists
  const bug = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!bug) {
    return NextResponse.json("Invalid bug", { status: 404 });
  }

  // 3. Update data
  const { title, description, userId } = validation.data;
  const updatedBug = await prisma.bug.update({
    where: {
      id: bug.id,
    },
    data: {
      title,
      description,
      userId,
    },
  });
  return NextResponse.json(updatedBug);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const bug = await prisma.bug.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!bug) {
    return NextResponse.json("Invalid bug", { status: 404 });
  }

  await prisma.bug.delete({ where: { id: bug.id } });

  return NextResponse.json({});
}

import authOptions from "@/lib/authOptions";
import prisma from "@/lib/db";
import { bugSchema } from "@/lib/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body: unknown = await request.json();
  const validation = bugSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 422 });
  }

  const { title, description } = validation.data;
  const bug = await prisma.bug.create({
    data: { title, description },
  });

  return NextResponse.json(bug, { status: 201 });
}

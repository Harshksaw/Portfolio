import { NextResponse } from "next/server";
import { getAll, create } from "@/lib/projects-store";

// GET /api/projects
export async function GET() {
  return NextResponse.json(getAll());
}

// POST /api/projects
export async function POST(req: Request) {
  const body = await req.json();
  const project = create(body);
  return NextResponse.json(project, { status: 201 });
}

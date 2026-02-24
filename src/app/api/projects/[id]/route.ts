import { NextResponse } from "next/server";
import { getById, update, remove } from "@/lib/projects-store";

type Ctx = { params: Promise<{ id: string }> };

// GET /api/projects/:id
export async function GET(_: Request, { params }: Ctx) {
  const { id } = await params;
  const project = getById(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

// PUT /api/projects/:id
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = await req.json();
  const updated = update(id, body);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /api/projects/:id
export async function DELETE(_: Request, { params }: Ctx) {
  const { id } = await params;
  const ok = remove(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}

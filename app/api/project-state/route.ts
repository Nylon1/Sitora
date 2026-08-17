import { NextResponse } from "next/server";
import { getProjectStates } from "@/lib/project-state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await getProjectStates();

  return NextResponse.json({
    generated_at: new Date().toISOString(),
    count: projects.length,
    projects,
  });
}

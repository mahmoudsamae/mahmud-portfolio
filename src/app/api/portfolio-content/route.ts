import { NextResponse } from "next/server";
import { mergePortfolioContent } from "@/lib/portfolio-content";
import { readPortfolioContent, writePortfolioContent } from "@/lib/portfolio-content-file";
import { isStudioAuthenticated } from "@/lib/studio-auth";

export async function GET() {
  return NextResponse.json(readPortfolioContent());
}

export async function POST(request: Request) {
  if (!(await isStudioAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const content = mergePortfolioContent(body);

  try {
    writePortfolioContent(content);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error:
          "This deployment's filesystem is read-only, so changes can't be saved from the live Studio. " +
          "Run the project locally (npm run dev), save your changes there, then commit and push " +
          "content/portfolio-content.json to update the live site.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, content });
}

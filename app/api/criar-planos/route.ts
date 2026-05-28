import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch("http://localhost:3000/api/plans", {
    method: "POST",
  });

  const data = await response.json();

  return NextResponse.json(data);
}

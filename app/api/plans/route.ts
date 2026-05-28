import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { verifyAdminToken } from "@/lib/auth";

async function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || "";

  const token = cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("admin_token="))
    ?.replace("admin_token=", "");

  if (!token) return false;

  return Boolean(await verifyAdminToken(token));
}

export async function GET() {
  try {
    await connectMongoDB();

    const plans = await Plan.find({ active: true }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      plans,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar planos.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json(
        {
          success: false,
          message: "Acesso negado.",
        },
        { status: 401 },
      );
    }

    await connectMongoDB();

    const body = await request.json();

    const plan = await Plan.create({
      name: body.name,
      price: body.price,
      description: body.description,
      features: body.features || [],
      active: true,
    });

    return NextResponse.json({
      success: true,
      message: "Plano criado com sucesso!",
      plan,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao criar plano.",
      },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Plan from "@/models/Plan";
import { verifyAdminToken } from "@/lib/auth";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

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

function unauthorized() {
  return NextResponse.json(
    {
      success: false,
      message: "Acesso negado.",
    },
    { status: 401 },
  );
}

export async function GET(request: Request, { params }: Params) {
  try {
    if (!(await isAdmin(request))) {
      return unauthorized();
    }

    await connectMongoDB();

    const { id } = await params;

    const plan = await Plan.findById(id);

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Plano não encontrado.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      plan,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar plano.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    if (!(await isAdmin(request))) {
      return unauthorized();
    }

    await connectMongoDB();

    const { id } = await params;
    const body = await request.json();

    const plan = await Plan.findByIdAndUpdate(
      id,
      {
        name: body.name,
        price: body.price,
        description: body.description,
        features: body.features || [],
      },
      { new: true },
    );

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Plano não encontrado.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plano atualizado com sucesso!",
      plan,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao atualizar plano.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    if (!(await isAdmin(request))) {
      return unauthorized();
    }

    await connectMongoDB();

    const { id } = await params;

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Plano não encontrado.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Plano removido com sucesso!",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao remover plano.",
      },
      { status: 500 },
    );
  }
}

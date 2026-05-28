import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Informe e-mail e senha.",
        },
        { status: 400 },
      );
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "E-mail ou senha inválidos.",
        },
        { status: 401 },
      );
    }

    const token = await createAdminToken();

    const response = NextResponse.json({
      success: true,
      message: "Login realizado com sucesso.",
    });

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao fazer login.",
      },
      { status: 500 },
    );
  }
}

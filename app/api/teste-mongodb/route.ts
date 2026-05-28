import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectMongoDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB conectado com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao conectar no MongoDB",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}

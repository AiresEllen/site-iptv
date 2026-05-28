import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import SiteConfig from "@/models/SiteConfig";
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

    let config = await SiteConfig.findOne();

    if (!config) {
      config = await SiteConfig.create({});
    }

    return NextResponse.json({
      success: true,
      config,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar configurações.",
      },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
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

    let config = await SiteConfig.findOne();

    if (!config) {
      config = await SiteConfig.create({});
    }

    config.brandName = body.brandName;
    config.heroTitle = body.heroTitle;
    config.heroDescription = body.heroDescription;
    config.logoUrl = body.logoUrl;
    config.bannerImageUrl = body.bannerImageUrl;
    config.whatsappNumber = body.whatsappNumber;
    config.whatsappMessage = body.whatsappMessage;
    config.trialUrl = body.trialUrl;

    await config.save();

    return NextResponse.json({
      success: true,
      message: "Configurações atualizadas com sucesso!",
      config,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao atualizar configurações.",
      },
      { status: 500 },
    );
  }
}

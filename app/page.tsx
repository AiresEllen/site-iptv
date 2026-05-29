import {
  Headphones,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Tv,
  X,
} from "lucide-react";

async function getConfig() {
  try {
    const baseUrl =
      process.env.URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/config`, {
      cache: "no-store",
    });

    const data = await response.json();

    return {
      brandName: data.config?.brandName || "Stream Prime",
      heroTitle:
        data.config?.heroTitle ||
        "Seus conteúdos favoritos em qualquer dispositivo.",
      heroDescription:
        data.config?.heroDescription ||
        "Compatível com Smart TV, Android, iPhone, TV Box, computador e tablet.",
      logoUrl: data.config?.logoUrl || "",
      bannerImageUrl: data.config?.bannerImageUrl || "",
      whatsappNumber: data.config?.whatsappNumber || "5511999999999",
      whatsappMessage:
        data.config?.whatsappMessage ||
        "Olá! Gostaria de saber mais sobre os planos.",
      trialUrl: data.config?.trialUrl || "",
      primaryColor: data.config?.primaryColor || "#10b981",
      backgroundColor: data.config?.backgroundColor || "#020617",
      cardColor: data.config?.cardColor || "#07111f",
    };
  } catch {
    return {
      brandName: "Stream Prime",
      heroTitle: "Seus conteúdos favoritos em qualquer dispositivo.",
      heroDescription:
        "Compatível com Smart TV, Android, iPhone, TV Box, computador e tablet.",
      logoUrl: "",
      bannerImageUrl: "",
      whatsappNumber: "5511999999999",
      whatsappMessage: "Olá! Gostaria de saber mais sobre os planos.",
      trialUrl: "",
      primaryColor: "#10b981",
      backgroundColor: "#020617",
      cardColor: "#07111f",
    };
  }
}

function limparMensagem(message: string) {
  const frase = "Olá! Gostaria de saber mais sobre os planos.";
  return message.replace(`${frase}${frase}`, frase).trim();
}

export default async function Home() {
  const config = await getConfig();

  const whatsappLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
    limparMensagem(config.whatsappMessage),
  )}`;

  const trialLink =
    config.trialUrl || "https://sistema.one/teste/gerar/69jxBSwk3jwfU";

  return (
    <main className="site-page">
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            background: ${config.backgroundColor};
          }

          .site-page {
            min-height: 100vh;
            background:
              radial-gradient(circle at 82% 18%, color-mix(in srgb, ${config.primaryColor} 16%, transparent), transparent 34%),
              ${config.backgroundColor};
            color: #ffffff;
            font-family: Arial, sans-serif;
            overflow-x: hidden;
          }

          .site-container {
            width: 100%;
            max-width: 1180px;
            margin: 0 auto;
            padding: 0 28px;
          }

          .site-header {
            min-height: 82px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 22px;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .brand-logo {
            width: 38px;
            height: 38px;
            object-fit: contain;
            border-radius: 8px;
            flex-shrink: 0;
          }

          .brand-name {
            font-size: 22px;
            font-weight: 900;
            white-space: nowrap;
          }

          .nav {
            display: flex;
            align-items: center;
            gap: 34px;
            font-size: 14px;
            font-weight: 800;
          }

          .nav a {
            color: #ffffff;
            text-decoration: none;
            white-space: nowrap;
          }

          .hero-grid {
            display: grid;
            grid-template-columns: 0.95fr 1.05fr;
            gap: 54px;
            align-items: center;
            padding: 54px 0 30px;
          }

          .eyebrow {
            color: ${config.primaryColor};
            font-size: 13px;
            font-weight: 900;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin: 0 0 20px;
          }

          .hero-title {
            font-size: 54px;
            line-height: 1.08;
            font-weight: 900;
            letter-spacing: -1.5px;
            margin: 0;
            max-width: 540px;
          }

          .hero-description {
            color: #cbd5e1;
            font-size: 17px;
            line-height: 1.65;
            margin: 22px 0 0;
            max-width: 560px;
          }

          .button-row {
            display: flex;
            gap: 16px;
            margin-top: 28px;
          }

          .primary-button {
            background: ${config.primaryColor};
            color: ${config.backgroundColor};
            border: none;
            border-radius: 16px;
            padding: 15px 24px;
            font-size: 14px;
            font-weight: 900;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
          }

          .banner-card {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: 28px;
            padding: 18px;
          }

          .banner-box {
            width: 100%;
            aspect-ratio: 16 / 9;
            border-radius: 22px;
            overflow: hidden;
            position: relative;
            border: 1px solid rgba(255,255,255,0.08);
            background: ${config.cardColor};
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .banner-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 18px;
            display: block;
          }

          .fallback-banner {
            width: 100%;
            height: 100%;
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .device-section {
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.10);
            border-radius: 26px;
            padding: 22px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            margin: 0 0 28px;
          }

          .device-card {
            display: flex;
            gap: 14px;
            align-items: flex-start;
          }

          .device-card h3 {
            font-size: 18px;
            margin: 0;
          }

          .device-card p {
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.45;
            margin: 6px 0 0;
          }

          .modal {
            position: fixed;
            inset: 0;
            background: rgba(2,6,23,0.88);
            z-index: 999;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }

          .modal:target {
            display: flex !important;
          }

          .modal-card {
            width: 100%;
            max-width: 460px;
            border-radius: 28px;
            background: ${config.cardColor};
            border: 1px solid rgba(255,255,255,0.12);
            padding: 28px;
            box-shadow: 0 30px 90px rgba(0,0,0,0.55);
            position: relative;
          }

          .modal-close {
            position: absolute;
            top: 18px;
            right: 18px;
            color: #fff;
            text-decoration: none;
          }

          .modal-card h2 {
            font-size: 30px;
            margin: 18px 0 10px;
          }

          .modal-card p {
            color: #cbd5e1;
            line-height: 1.6;
          }

          .modal-button {
            width: 100%;
            justify-content: center;
            margin-top: 24px;
          }

          @media (max-width: 900px) {
            .site-page {
              min-height: 100vh;
              display: block;
              padding: 18px 0 26px;
            }

            .site-container {
              width: 100%;
              max-width: 100%;
              padding: 0 16px;
              margin: 0 auto;
            }

            .site-header {
              min-height: 50px;
              gap: 10px;
              align-items: center;
            }

            .brand {
              gap: 7px;
            }

            .brand-logo {
              width: 26px;
              height: 26px;
            }

            .brand-name {
              font-size: 15px;
            }

            .nav {
              gap: 11px;
              font-size: 10px;
            }

            .hero-grid {
              grid-template-columns: 1fr;
              gap: 16px;
              padding: 22px 0 14px;
            }

            .eyebrow {
              font-size: 10px;
              letter-spacing: 1.6px;
              line-height: 1.35;
              margin-bottom: 10px;
            }

            .hero-title {
              font-size: 42px;
              line-height: 1.02;
              letter-spacing: -1.2px;
              max-width: 100%;
            }

            .hero-description {
              font-size: 15px;
              line-height: 1.45;
              margin-top: 14px;
              max-width: 100%;
            }

            .button-row {
              margin-top: 18px;
            }

            .primary-button {
              border-radius: 15px;
              padding: 15px 18px;
              font-size: 14px;
              gap: 8px;
            }

            .primary-button svg {
              width: 18px;
              height: 18px;
            }

            .banner-card {
              border-radius: 20px;
              padding: 8px;
            }

            .banner-box {
              aspect-ratio: 16 / 9;
              border-radius: 16px;
            }

            .banner-image {
              border-radius: 14px;
            }

            .device-section {
              grid-template-columns: 1fr;
              gap: 10px;
              padding: 12px;
              border-radius: 18px;
              margin-top: 2px;
              margin-bottom: 0;
            }

            .device-card {
              gap: 10px;
              align-items: center;
            }

            .device-card svg {
              width: 22px;
              height: 22px;
              flex-shrink: 0;
            }

            .device-card h3 {
              font-size: 14px;
            }

            .device-card p {
              font-size: 11px;
              line-height: 1.35;
              margin-top: 3px;
            }
          }
        `}
      </style>

      <section>
        <div className="site-container">
          <header className="site-header">
            <div className="brand">
              {config.logoUrl ? (
                <img
                  src={config.logoUrl}
                  alt={config.brandName}
                  className="brand-logo"
                />
              ) : (
                <Tv color={config.primaryColor} size={40} />
              )}

              <strong className="brand-name">{config.brandName}</strong>
            </div>

            <nav className="nav">
              <a href="/planos" target="_blank">
                Planos
              </a>
              <a href="#dispositivos">Dispositivos</a>
              <a href={trialLink} target="_blank">
                Teste Grátis
              </a>
            </nav>
          </header>

          <div className="hero-grid">
            <div>
              <p className="eyebrow">Plataforma moderna e suporte rápido</p>

              <h1 className="hero-title">{config.heroTitle}</h1>

              <p className="hero-description">{config.heroDescription}</p>

              <div className="button-row">
                <a href="#whatsapp-modal" className="primary-button">
                  <MessageCircle size={22} />
                  Falar com revendedor
                </a>
              </div>
            </div>

            <div className="banner-card">
              <div className="banner-box">
                {config.bannerImageUrl ? (
                  <img
                    src={config.bannerImageUrl}
                    alt="Banner principal"
                    className="banner-image"
                  />
                ) : (
                  <div className="fallback-banner">
                    <Tv color={config.primaryColor} size={58} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <section id="dispositivos" className="device-section">
            <div className="device-card">
              <Headphones color={config.primaryColor} size={36} />
              <div>
                <h3>Suporte rápido</h3>
                <p>Atendimento direto com o revendedor.</p>
              </div>
            </div>

            <div className="device-card">
              <Smartphone color={config.primaryColor} size={36} />
              <div>
                <h3>Android e iPhone</h3>
                <p>Aplicativos otimizados e interface intuitiva.</p>
              </div>
            </div>

            <div className="device-card">
              <ShieldCheck color={config.primaryColor} size={36} />
              <div>
                <h3>Seguro e estável</h3>
                <p>Servidores de alta qualidade para melhor experiência.</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      <div id="whatsapp-modal" className="modal">
        <div className="modal-card">
          <a href="#" className="modal-close">
            <X size={24} />
          </a>

          <MessageCircle color={config.primaryColor} size={42} />

          <h2>Fale com o revendedor</h2>

          <p>Clique abaixo para abrir o WhatsApp e falar com o revendedor.</p>

          <a
            href={whatsappLink}
            target="_blank"
            className="primary-button modal-button"
          >
            <MessageCircle size={22} />
            Abrir WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export default function ConfiguracoesPage() {
  const [brandName, setBrandName] = useState("Stream Prime");

  const [heroTitle, setHeroTitle] = useState(
    "Seus conteúdos favoritos em qualquer dispositivo.",
  );

  const [heroDescription, setHeroDescription] = useState(
    "Compatível com Smart TV, Android, iPhone, TV Box, computador e tablet.",
  );

  const [logoUrl, setLogoUrl] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const [whatsappMessage, setWhatsappMessage] = useState(
    "Olá! Gostaria de saber mais sobre os planos.",
  );

  const [trialUrl, setTrialUrl] = useState("");

  const [primaryColor, setPrimaryColor] = useState("#10b981");
  const [backgroundColor, setBackgroundColor] = useState("#020617");
  const [cardColor, setCardColor] = useState("#07111f");

  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      const response = await fetch("/api/config");
      const data = await response.json();

      if (data.success && data.config) {
        setBrandName(data.config.brandName || "Stream Prime");

        setHeroTitle(
          data.config.heroTitle ||
            "Seus conteúdos favoritos em qualquer dispositivo.",
        );

        setHeroDescription(
          data.config.heroDescription ||
            "Compatível com Smart TV, Android, iPhone, TV Box, computador e tablet.",
        );

        setLogoUrl(data.config.logoUrl || "");
        setBannerImageUrl(data.config.bannerImageUrl || "");
        setWhatsappNumber(data.config.whatsappNumber || "");

        setWhatsappMessage(
          data.config.whatsappMessage ||
            "Olá! Gostaria de saber mais sobre os planos.",
        );

        setTrialUrl(data.config.trialUrl || "");

        setPrimaryColor(data.config.primaryColor || "#10b981");
        setBackgroundColor(data.config.backgroundColor || "#020617");
        setCardColor(data.config.cardColor || "#07111f");
      }
    }

    loadConfig();
  }, []);

  async function uploadImage(file: File, folder: string) {
    const formData = new FormData();

    formData.append("file", file);

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
    );

    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    return data.secure_url || "";
  }

  async function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadingLogo(true);

    const url = await uploadImage(file, "iptv-streams/logos");

    setUploadingLogo(false);

    if (url) {
      setLogoUrl(url);
    } else {
      alert("Erro ao enviar logo.");
    }
  }

  async function handleBannerUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadingBanner(true);

    const url = await uploadImage(file, "iptv-streams/banners");

    setUploadingBanner(false);

    if (url) {
      setBannerImageUrl(url);
    } else {
      alert("Erro ao enviar banner.");
    }
  }

  async function saveConfig() {
    setSaving(true);

    const response = await fetch("/api/config", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        brandName,
        heroTitle,
        heroDescription,
        logoUrl,
        bannerImageUrl,
        whatsappNumber,
        whatsappMessage,
        trialUrl,
        primaryColor,
        backgroundColor,
        cardColor,
      }),
    });

    const data = await response.json();

    setSaving(false);

    if (data.success) {
      alert("Configurações salvas com sucesso!");
    } else {
      alert("Erro ao salvar configurações.");
    }
  }

  return (
    <main className="config-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          background: #020617;
          overflow-x: hidden;
          font-family: Arial, sans-serif;
        }

        .config-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 18%, rgba(16,185,129,0.14), transparent 34%),
            #020617;
          color: #ffffff;
          padding: 34px 24px 44px;
        }

        .config-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          text-decoration: none;
          font-weight: 900;
          font-size: 14px;
          margin-bottom: 18px;
        }

        .hero-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 30px;
          backdrop-filter: blur(12px);
          margin-bottom: 20px;
        }

        .hero-title {
          margin: 0;
          font-size: 38px;
          font-weight: 900;
        }

        .hero-description {
          margin-top: 10px;
          color: #cbd5e1;
          font-size: 15px;
        }

        .save-button {
          margin-top: 18px;
          border: none;
          background: #10b981;
          color: #020617;
          border-radius: 16px;
          padding: 15px 24px;
          font-size: 14px;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 24px;
          backdrop-filter: blur(12px);
        }

        .card-title {
          margin-top: 0;
          font-size: 24px;
          font-weight: 900;
        }

        .label {
          display: block;
          margin-top: 18px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 900;
        }

        .input,
        .textarea {
          width: 100%;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          color: #ffffff;
          padding: 15px 16px;
          font-size: 14px;
          outline: none;
        }

        .textarea {
          resize: none;
        }

        .input:focus,
        .textarea:focus {
          border-color: #10b981;
        }

        .color-input {
          width: 100%;
          height: 52px;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 8px;
          cursor: pointer;
        }

        .upload-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #10b981;
          color: #10b981;
          border-radius: 14px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
        }

        .preview-box {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .logo-preview {
          width: 100%;
          max-width: 180px;
          aspect-ratio: 1 / 1;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
        }

        .helper {
          color: #94a3b8;
          font-size: 12px;
          line-height: 1.5;
          word-break: break-all;
        }

        .color-preview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        .color-chip {
          border-radius: 14px;
          min-height: 54px;
          border: 1px solid rgba(255,255,255,0.10);
        }

        @media (max-width: 900px) {
          .config-page {
            padding: 18px 0;
          }

          .config-container {
            width: min(100%, 430px);
            padding: 0 12px;
          }

          .back-link {
            font-size: 10px;
            gap: 5px;
            margin-bottom: 10px;
          }

          .back-link svg {
            width: 12px;
            height: 12px;
          }

          .hero-card {
            border-radius: 18px;
            padding: 16px;
            margin-bottom: 12px;
          }

          .hero-title {
            font-size: 24px;
          }

          .hero-description {
            font-size: 10px;
            margin-top: 6px;
          }

          .save-button {
            border-radius: 12px;
            padding: 10px 14px;
            font-size: 10px;
            gap: 5px;
          }

          .save-button svg {
            width: 13px;
            height: 13px;
          }

          .grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .card {
            border-radius: 18px;
            padding: 14px;
          }

          .card-title {
            font-size: 18px;
          }

          .label {
            margin-top: 12px;
            margin-bottom: 5px;
            font-size: 10px;
          }

          .input,
          .textarea {
            border-radius: 12px;
            padding: 10px;
            font-size: 10px;
          }

          .color-input {
            height: 42px;
            border-radius: 12px;
            padding: 6px;
          }

          .upload-button {
            border-radius: 11px;
            padding: 9px 12px;
            font-size: 9px;
          }

          .preview-box,
          .logo-preview {
            border-radius: 16px;
          }

          .helper {
            font-size: 9px;
          }
        }
      `}</style>

      <div className="config-container">
        <Link href="/admin" className="back-link">
          <ArrowLeft size={16} />
          Voltar ao painel
        </Link>

        <section className="hero-card">
          <h1 className="hero-title">Configurações do site</h1>

          <p className="hero-description">
            Altere logo, banner, textos principais, teste grátis, cores e
            WhatsApp.
          </p>

          <button
            onClick={saveConfig}
            disabled={saving}
            className="save-button"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}

            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </section>

        <div className="grid">
          <section className="card">
            <h2 className="card-title">Identidade visual</h2>

            <div className="logo-preview">
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="preview-image" />
              ) : (
                <span style={{ color: "#64748b" }}>Sem logo</span>
              )}
            </div>

            <label className="upload-button">
              {uploadingLogo ? "Enviando..." : "Enviar logo"}

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: "none" }}
              />
            </label>

            <p className="helper">{logoUrl || "Nenhuma logo enviada."}</p>

            <label className="label">Nome da marca</label>

            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="input"
            />

            <label className="label">Título principal</label>

            <input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              className="input"
            />

            <label className="label">Descrição principal</label>

            <textarea
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              rows={4}
              className="textarea"
            />
          </section>

          <section className="card">
            <h2 className="card-title">Banner da página inicial</h2>

            <div className="preview-box">
              {bannerImageUrl ? (
                <img
                  src={bannerImageUrl}
                  alt="Banner"
                  className="preview-image"
                />
              ) : (
                <span style={{ color: "#64748b" }}>Nenhum banner enviado</span>
              )}
            </div>

            <label className="upload-button">
              {uploadingBanner ? "Enviando..." : "Enviar banner"}

              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                style={{ display: "none" }}
              />
            </label>

            <p className="helper">
              {bannerImageUrl ||
                "Recomendado: imagem horizontal 1200x700 ou maior."}
            </p>

            <h2 className="card-title" style={{ marginTop: 28 }}>
              Teste grátis
            </h2>

            <label className="label">Link do teste grátis</label>

            <input
              value={trialUrl}
              onChange={(e) => setTrialUrl(e.target.value)}
              className="input"
              placeholder="https://seudominio.com/teste"
            />

            <h2 className="card-title" style={{ marginTop: 28 }}>
              Cores do site
            </h2>

            <label className="label">Cor principal</label>

            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="color-input"
            />

            <label className="label">Cor de fundo</label>

            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="color-input"
            />

            <label className="label">Cor dos cards</label>

            <input
              type="color"
              value={cardColor}
              onChange={(e) => setCardColor(e.target.value)}
              className="color-input"
            />

            <div className="color-preview">
              <div
                className="color-chip"
                style={{ background: primaryColor }}
              />
              <div
                className="color-chip"
                style={{ background: backgroundColor }}
              />
              <div className="color-chip" style={{ background: cardColor }} />
            </div>

            <h2 className="card-title" style={{ marginTop: 28 }}>
              WhatsApp
            </h2>

            <label className="label">Número do WhatsApp</label>

            <input
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="input"
            />

            <label className="label">Mensagem automática</label>

            <textarea
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              rows={5}
              className="textarea"
            />
          </section>
        </div>
      </div>
    </main>
  );
}

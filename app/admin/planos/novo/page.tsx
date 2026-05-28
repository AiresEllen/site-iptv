"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export default function NovoPlanoPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const features = featuresText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const response = await fetch("/api/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, description, features }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      router.push("/admin/planos");
      router.refresh();
      return;
    }

    alert(data.message || "Erro ao salvar plano.");
  }

  return (
    <main className="new-plan-page">
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

        .new-plan-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 18%, rgba(16,185,129,0.14), transparent 34%),
            #020617;
          color: #ffffff;
          padding: 34px 24px 44px;
        }

        .new-plan-container {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .header-card,
        .form-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
        }

        .header-card {
          border-radius: 28px;
          padding: 30px;
          margin-bottom: 20px;
          text-align: center;
        }

        .eyebrow {
          color: #10b981;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin: 0 0 12px;
        }

        .title {
          font-size: 40px;
          font-weight: 900;
          margin: 0;
          line-height: 1.05;
        }

        .subtitle {
          color: #cbd5e1;
          font-size: 15px;
          margin: 12px 0 0;
          line-height: 1.5;
        }

        .form-card {
          border-radius: 28px;
          padding: 28px;
        }

        .form-grid {
          display: grid;
          gap: 18px;
        }

        .field label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 900;
        }

        .field input,
        .field textarea {
          width: 100%;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          color: #ffffff;
          padding: 15px 16px;
          font-size: 14px;
          outline: none;
          font-family: Arial, sans-serif;
        }

        .field textarea {
          resize: none;
        }

        .field input:focus,
        .field textarea:focus {
          border-color: #10b981;
        }

        .save-button {
          width: 100%;
          border: none;
          background: #10b981;
          color: #020617;
          border-radius: 16px;
          padding: 16px 20px;
          font-weight: 900;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          cursor: pointer;
          transition: 0.2s;
        }

        .save-button:hover {
          opacity: 0.92;
          transform: scale(1.01);
        }

        .save-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 900px) {
          .new-plan-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px 0;
          }

          .new-plan-container {
            width: min(100%, 430px);
            padding: 0 12px;
          }

          .back-link {
            font-size: 9px;
            gap: 5px;
            margin-bottom: 10px;
          }

          .back-link svg {
            width: 11px;
            height: 11px;
          }

          .header-card {
            border-radius: 18px;
            padding: 15px;
            margin-bottom: 10px;
          }

          .eyebrow {
            font-size: 9px;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
          }

          .title {
            font-size: 25px;
          }

          .subtitle {
            font-size: 9px;
            margin-top: 7px;
          }

          .form-card {
            border-radius: 18px;
            padding: 14px;
          }

          .form-grid {
            gap: 10px;
          }

          .field label {
            font-size: 9px;
            margin-bottom: 5px;
          }

          .field input,
          .field textarea {
            border-radius: 11px;
            padding: 10px;
            font-size: 9px;
          }

          .field textarea {
            rows: 3;
          }

          .save-button {
            border-radius: 11px;
            padding: 11px;
            font-size: 10px;
            gap: 5px;
          }

          .save-button svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>

      <div className="new-plan-container">
        <Link href="/admin/planos" className="back-link">
          <ArrowLeft size={16} />
          Voltar para planos
        </Link>

        <section className="header-card">
          <p className="eyebrow">Cadastro de plano</p>

          <h1 className="title">Novo plano</h1>

          <p className="subtitle">
            Preencha os dados abaixo para publicar no site.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-grid">
            <div className="field">
              <label>Nome do plano</label>

              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                placeholder="Ex: Plano Mensal"
              />
            </div>

            <div className="field">
              <label>Preço</label>

              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
                placeholder="Ex: R$ 29,90"
              />
            </div>

            <div className="field">
              <label>Descrição</label>

              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={4}
                placeholder="Ex: Ideal para quem quer testar com qualidade."
              />
            </div>

            <div className="field">
              <label>Benefícios</label>

              <textarea
                value={featuresText}
                onChange={(event) => setFeaturesText(event.target.value)}
                rows={5}
                placeholder={`Um benefício por linha:\nSuporte via WhatsApp\nCompatível com Smart TV\nAtivação rápida`}
              />
            </div>

            <button disabled={loading} className="save-button">
              {loading ? <Loader2 className="animate-spin" /> : <Save />}
              Salvar plano
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

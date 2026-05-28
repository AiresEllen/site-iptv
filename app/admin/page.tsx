"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  Tv,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <main className="admin-page">
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

        .admin-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 18%, rgba(16,185,129,0.14), transparent 34%),
            #020617;
          color: #ffffff;
          padding: 34px 24px 44px;
        }

        .admin-container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        .top-actions {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 16px;
        }

        .logout-button {
          border: 1px solid rgba(239,68,68,0.35);
          background: rgba(239,68,68,0.10);
          color: #fca5a5;
          border-radius: 14px;
          padding: 12px 18px;
          font-weight: 900;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .hero-card,
        .summary-card,
        .menu-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
        }

        .hero-card {
          border-radius: 28px;
          padding: 34px;
          margin-bottom: 22px;
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
          font-size: 42px;
          font-weight: 900;
          margin: 0;
          line-height: 1.05;
        }

        .subtitle {
          color: #cbd5e1;
          font-size: 16px;
          margin: 14px 0 0;
        }

        .site-button {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #10b981;
          color: #020617;
          padding: 14px 22px;
          border-radius: 15px;
          font-weight: 900;
          text-decoration: none;
          font-size: 14px;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .menu-card {
          border-radius: 24px;
          padding: 24px;
          text-decoration: none;
          color: #fff;
          transition: 0.25s;
        }

        .menu-card:hover {
          transform: translateY(-3px);
          border-color: rgba(16,185,129,0.4);
        }

        .menu-card h2,
        .summary-card h2 {
          margin: 16px 0 8px;
          font-size: 22px;
          font-weight: 900;
        }

        .menu-card p,
        .summary-card p {
          color: #cbd5e1;
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }

        .summary-card {
          margin-top: 20px;
          border-radius: 24px;
          padding: 24px;
        }

        @media (max-width: 900px) {
          .admin-page {
            min-height: 100vh;
            padding: 16px 0;
          }

          .admin-container {
            width: min(100%, 430px);
            padding: 0 12px;
          }

          .top-actions {
            margin-bottom: 10px;
          }

          .logout-button {
            border-radius: 11px;
            padding: 9px 12px;
            font-size: 10px;
            gap: 5px;
          }

          .logout-button svg {
            width: 13px;
            height: 13px;
          }

          .hero-card {
            border-radius: 18px;
            padding: 18px;
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
            font-size: 10px;
            margin-top: 8px;
          }

          .site-button {
            margin-top: 14px;
            padding: 10px 14px;
            border-radius: 11px;
            font-size: 10px;
          }

          .menu-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }

          .menu-card {
            border-radius: 16px;
            padding: 10px;
            min-height: 116px;
          }

          .menu-card svg,
          .summary-card svg {
            width: 18px;
            height: 18px;
          }

          .menu-card h2,
          .summary-card h2 {
            font-size: 11px;
            margin: 8px 0 5px;
          }

          .menu-card p,
          .summary-card p {
            font-size: 7px;
            line-height: 1.35;
          }

          .summary-card {
            margin-top: 8px;
            border-radius: 16px;
            padding: 10px;
          }
        }
      `}</style>

      <div className="admin-container">
        <div className="top-actions">
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={16} />
            Sair
          </button>
        </div>

        <section className="hero-card">
          <p className="eyebrow">Painel administrativo</p>

          <h1 className="title">Stream Prime Admin</h1>

          <p className="subtitle">
            Gerencie planos, banners e WhatsApp do site.
          </p>

          <Link href="/" className="site-button">
            Ver site
          </Link>
        </section>

        <section className="menu-grid">
          <Link href="/admin/planos" className="menu-card">
            <Tv size={34} color="#10b981" />

            <h2>Planos</h2>

            <p>Criar, editar e remover planos.</p>
          </Link>

          <Link href="/admin/configuracoes" className="menu-card">
            <MessageCircle size={34} color="#10b981" />

            <h2>WhatsApp</h2>

            <p>Alterar número e mensagem automática.</p>
          </Link>

          <Link href="/admin/configuracoes" className="menu-card">
            <Settings size={34} color="#10b981" />

            <h2>Banner</h2>

            <p>Atualizar banner e identidade visual.</p>
          </Link>
        </section>

        <section className="summary-card">
          <LayoutDashboard size={34} color="#10b981" />

          <h2>Resumo</h2>

          <p>O painel está pronto para receber novos módulos.</p>
        </section>
      </div>
    </main>
  );
}

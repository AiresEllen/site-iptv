"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Pencil, Plus, Trash2 } from "lucide-react";

type Plan = {
  _id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
};

export default function AdminPlanosPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingId, setLoadingId] = useState("");

  async function loadPlans() {
    const response = await fetch("/api/plans");
    const data = await response.json();
    setPlans(data.plans || []);
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Tem certeza que deseja remover este plano?")) return;

    setLoadingId(id);

    const response = await fetch(`/api/plans/${id}`, { method: "DELETE" });
    const data = await response.json();

    setLoadingId("");

    if (!data.success) {
      alert(data.message || "Erro ao remover plano.");
      return;
    }

    await loadPlans();
  }

  useEffect(() => {
    loadPlans();
  }, []);

  return (
    <main className="admin-plans-page">
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

        .admin-plans-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 18%, rgba(16,185,129,0.14), transparent 34%),
            #020617;
          color: #ffffff;
          padding: 34px 24px 44px;
        }

        .admin-plans-container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        .top-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 28px;
          padding: 30px;
          margin-bottom: 22px;
          backdrop-filter: blur(12px);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
        }

        .top-content {
          margin-top: 22px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .title {
          font-size: 38px;
          font-weight: 900;
          margin: 0;
          line-height: 1.05;
        }

        .subtitle {
          color: #cbd5e1;
          font-size: 15px;
          margin: 10px 0 0;
          line-height: 1.5;
        }

        .new-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #10b981;
          color: #020617;
          border-radius: 16px;
          padding: 15px 22px;
          font-weight: 900;
          text-decoration: none;
          font-size: 14px;
          white-space: nowrap;
          transition: 0.2s;
        }

        .new-button:hover {
          opacity: 0.92;
          transform: scale(1.01);
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .plan-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 24px;
          min-height: 350px;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(12px);
          transition: 0.25s;
        }

        .plan-card:hover {
          transform: translateY(-3px);
          border-color: rgba(16,185,129,0.4);
        }

        .plan-name {
          margin: 0;
          font-size: 22px;
          font-weight: 900;
        }

        .plan-price {
          margin: 16px 0 14px;
          font-size: 34px;
          font-weight: 900;
          color: #10b981;
          line-height: 1;
        }

        .plan-description {
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.55;
          min-height: 42px;
        }

        .features {
          margin-top: 18px;
          display: grid;
          gap: 9px;
        }

        .feature {
          background: rgba(255,255,255,0.05);
          border-radius: 13px;
          padding: 10px 12px;
          font-size: 12px;
          color: #ffffff;
        }

        .actions {
          margin-top: auto;
          padding-top: 22px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .edit-button,
        .delete-button {
          height: 44px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: 0.2s;
        }

        .edit-button {
          background: rgba(16,185,129,0.14);
          color: #6ee7b7;
        }

        .delete-button {
          background: rgba(239,68,68,0.14);
          color: #fca5a5;
        }

        .edit-button:hover {
          background: rgba(16,185,129,0.24);
        }

        .delete-button:hover {
          background: rgba(239,68,68,0.24);
        }

        .delete-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .empty-card {
          grid-column: 1 / -1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 34px;
          text-align: center;
          color: #cbd5e1;
        }

        @media (max-width: 900px) {
          .admin-plans-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px 0;
          }

          .admin-plans-container {
            width: min(100%, 430px);
            padding: 0 12px;
          }

          .top-card {
            border-radius: 18px;
            padding: 14px;
            margin-bottom: 10px;
          }

          .back-link {
            font-size: 9px;
            gap: 5px;
          }

          .back-link svg {
            width: 11px;
            height: 11px;
          }

          .top-content {
            margin-top: 12px;
            gap: 8px;
            align-items: center;
          }

          .title {
            font-size: 20px;
          }

          .subtitle {
            font-size: 8px;
            margin-top: 5px;
          }

          .new-button {
            border-radius: 11px;
            padding: 9px 10px;
            font-size: 8px;
            gap: 4px;
          }

          .new-button svg {
            width: 11px;
            height: 11px;
          }

          .plans-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
          }

          .plan-card {
            border-radius: 16px;
            padding: 10px;
            min-height: 238px;
          }

          .plan-name {
            font-size: 11px;
          }

          .plan-price {
            font-size: 20px;
            margin: 10px 0 8px;
          }

          .plan-description {
            font-size: 7px;
            line-height: 1.35;
            min-height: 28px;
          }

          .features {
            gap: 5px;
            margin-top: 9px;
          }

          .feature {
            border-radius: 8px;
            padding: 6px;
            font-size: 6.5px;
          }

          .actions {
            gap: 5px;
            padding-top: 10px;
          }

          .edit-button,
          .delete-button {
            height: 28px;
            border-radius: 9px;
            font-size: 7px;
            gap: 3px;
          }

          .edit-button svg,
          .delete-button svg {
            width: 9px;
            height: 9px;
          }

          .empty-card {
            padding: 20px;
            border-radius: 16px;
            font-size: 10px;
          }
        }
      `}</style>

      <div className="admin-plans-container">
        <header className="top-card">
          <Link href="/admin" className="back-link">
            <ArrowLeft size={16} />
            Voltar ao painel
          </Link>

          <div className="top-content">
            <div>
              <h1 className="title">Gerenciar Planos</h1>

              <p className="subtitle">
                Crie, edite e remova planos salvos no MongoDB.
              </p>
            </div>

            <Link href="/admin/planos/novo" className="new-button">
              <Plus size={18} />
              Novo plano
            </Link>
          </div>
        </header>

        <section className="plans-grid">
          {plans.length === 0 ? (
            <div className="empty-card">Nenhum plano cadastrado ainda.</div>
          ) : (
            plans.map((plan) => (
              <div key={plan._id} className="plan-card">
                <h2 className="plan-name">{plan.name}</h2>

                <p className="plan-price">{plan.price}</p>

                <p className="plan-description">{plan.description}</p>

                <div className="features">
                  {plan.features?.map((feature) => (
                    <div key={feature} className="feature">
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <Link
                    href={`/admin/planos/${plan._id}/editar`}
                    className="edit-button"
                  >
                    <Pencil size={16} />
                    Editar
                  </Link>

                  <button
                    onClick={() => handleDelete(plan._id)}
                    disabled={loadingId === plan._id}
                    className="delete-button"
                  >
                    {loadingId === plan._id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                    Remover
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}

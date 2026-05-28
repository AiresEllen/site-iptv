import Link from "next/link";

async function getPlans() {
  try {
    const response = await fetch("http://localhost:3000/api/plans", {
      cache: "no-store",
    });

    const data = await response.json();
    return data.plans || [];
  } catch {
    return [];
  }
}

async function getConfig() {
  try {
    const response = await fetch("http://localhost:3000/api/config", {
      cache: "no-store",
    });

    const data = await response.json();

    return {
      brandName: data.config?.brandName || "Stream Prime",
      whatsappNumber: data.config?.whatsappNumber || "5511999999999",
    };
  } catch {
    return {
      brandName: "Stream Prime",
      whatsappNumber: "5511999999999",
    };
  }
}

export default async function PlanosPage() {
  const plans = await getPlans();
  const config = await getConfig();

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          background: #020617;
          overflow-x: hidden;
          font-family: Arial, sans-serif;
        }

        .plans-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, rgba(16,185,129,0.15), transparent 30%),
            #020617;
          color: #ffffff;
          padding: 34px 24px 44px;
        }

        .plans-container {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #10b981;
          text-decoration: none;
          font-weight: 800;
          margin-bottom: 24px;
          font-size: 14px;
        }

        .title {
          font-size: 42px;
          font-weight: 900;
          margin: 0;
          line-height: 1;
        }

        .subtitle {
          margin-top: 14px;
          color: #cbd5e1;
          font-size: 16px;
          max-width: 600px;
          line-height: 1.6;
        }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 34px;
        }

        .plan-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 24px;
          backdrop-filter: blur(12px);
          transition: 0.25s;
          min-height: 390px;
          display: flex;
          flex-direction: column;
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
          margin: 20px 0 16px;
          font-size: 42px;
          font-weight: 900;
          color: #10b981;
          line-height: 1;
        }

        .plan-description {
          color: #cbd5e1;
          line-height: 1.55;
          font-size: 14px;
          min-height: 48px;
        }

        .features {
          display: grid;
          gap: 10px;
          margin-top: 22px;
        }

        .feature {
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          padding: 12px 14px;
          color: #ffffff;
          font-size: 13px;
        }

        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin-top: auto;
          background: #10b981;
          color: #020617;
          border-radius: 16px;
          padding: 15px;
          text-decoration: none;
          font-weight: 900;
          font-size: 14px;
          transition: 0.2s;
        }

        .button:hover {
          opacity: 0.92;
          transform: scale(1.01);
        }

        @media (max-width: 900px) {
          .plans-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 14px 0;
          }

          .plans-container {
            width: min(100%, 430px);
            padding: 0 12px;
          }

          .back-button {
            font-size: 10px;
            margin-bottom: 14px;
          }

          .title {
            font-size: 28px;
          }

          .subtitle {
            font-size: 10px;
            margin-top: 8px;
          }

          .plans-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-top: 18px;
          }

          .plan-card {
            border-radius: 16px;
            padding: 10px;
            min-height: 250px;
          }

          .plan-name {
            font-size: 12px;
          }

          .plan-price {
            font-size: 22px;
            margin: 12px 0 10px;
          }

          .plan-description {
            font-size: 8px;
            line-height: 1.35;
            min-height: 34px;
          }

          .features {
            gap: 6px;
            margin-top: 10px;
          }

          .feature {
            border-radius: 9px;
            padding: 7px;
            font-size: 7px;
          }

          .button {
            border-radius: 10px;
            padding: 9px 6px;
            font-size: 8px;
          }
        }
      `}</style>

      <main className="plans-page">
        <div className="plans-container">
          <Link href="/" className="back-button">
            ← Voltar para o site
          </Link>

          <h1 className="title">Planos disponíveis</h1>

          <p className="subtitle">
            Escolha um plano e fale diretamente com o revendedor.
          </p>

          <div className="plans-grid">
            {plans.map((plan: any) => (
              <div key={plan._id} className="plan-card">
                <h2 className="plan-name">{plan.name}</h2>

                <div className="plan-price">{plan.price}</div>

                <div className="plan-description">{plan.description}</div>

                <div className="features">
                  {plan.features?.map((feature: string) => (
                    <div key={feature} className="feature">
                      {feature}
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${
                    config.whatsappNumber
                  }?text=${encodeURIComponent(
                    `Olá! Tenho interesse no ${plan.name}.`,
                  )}`}
                  target="_blank"
                  className="button"
                >
                  Tenho interesse
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

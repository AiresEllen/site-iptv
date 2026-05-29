import Link from "next/link";

async function getBaseUrl() {
  return (
    process.env.URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000"
  );
}

async function getPlans() {
  try {
    const baseUrl = await getBaseUrl();

    const response = await fetch(`${baseUrl}/api/plans`, {
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
    const baseUrl = await getBaseUrl();

    const response = await fetch(`${baseUrl}/api/config`, {
      cache: "no-store",
    });

    const data = await response.json();

    return {
      brandName: data.config?.brandName || "Stream Prime",
      whatsappNumber: data.config?.whatsappNumber || "5511999999999",
      primaryColor: data.config?.primaryColor || "#10b981",
      backgroundColor: data.config?.backgroundColor || "#020617",
      cardColor: data.config?.cardColor || "#07111f",
    };
  } catch {
    return {
      brandName: "Stream Prime",
      whatsappNumber: "5511999999999",
      primaryColor: "#10b981",
      backgroundColor: "#020617",
      cardColor: "#07111f",
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
          background: ${config.backgroundColor};
          overflow-x: hidden;
          font-family: Arial, sans-serif;
        }

        .plans-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top right, color-mix(in srgb, ${config.primaryColor} 15%, transparent), transparent 30%),
            ${config.backgroundColor};
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
          color: ${config.primaryColor};
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
          background: ${config.cardColor};
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
          border-color: ${config.primaryColor};
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
          color: ${config.primaryColor};
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
          background: rgba(255,255,255,0.08);
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
          background: ${config.primaryColor};
          color: ${config.backgroundColor};
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

        .empty-card {
          margin-top: 34px;
          border: 1px solid rgba(255,255,255,0.08);
          background: ${config.cardColor};
          border-radius: 24px;
          padding: 28px;
          color: #cbd5e1;
          font-size: 16px;
        }

        @media (max-width: 900px) {
          .plans-page {
            min-height: 100vh;
            padding: 16px 0;
          }

          .plans-container {
            width: min(100%, 430px);
            padding: 0 12px;
          }

          .back-button {
            font-size: 10px;
            margin-bottom: 10px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 10px;
            margin-top: 7px;
          }

          .plans-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-top: 16px;
          }

          .plan-card {
            border-radius: 16px;
            padding: 10px;
            min-height: 248px;
          }

          .plan-name {
            font-size: 11px;
          }

          .plan-price {
            font-size: 20px;
            margin: 10px 0 8px;
          }

          .plan-description {
            font-size: 7.5px;
            line-height: 1.35;
            min-height: 30px;
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

          .button {
            border-radius: 10px;
            padding: 9px 6px;
            font-size: 7.5px;
            margin-top: auto;
          }

          .empty-card {
            margin-top: 16px;
            border-radius: 16px;
            padding: 14px;
            font-size: 10px;
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

          {plans.length === 0 ? (
            <div className="empty-card">
              Nenhum plano disponível no momento.
            </div>
          ) : (
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
          )}
        </div>
      </main>
    </>
  );
}

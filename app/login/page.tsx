"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    setLoading(false);

    if (!data.success) {
      setError(data.message || "E-mail ou senha inválidos.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="login-page">
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

        .login-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 82% 18%, rgba(16,185,129,0.16), transparent 34%),
            #020617;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .login-card {
          width: 100%;
          max-width: 430px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 28px;
          padding: 28px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.45);
          backdrop-filter: blur(12px);
        }

        .icon-box {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          background: #10b981;
          color: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
        }

        .title {
          text-align: center;
          font-size: 28px;
          font-weight: 900;
          margin: 0;
        }

        .subtitle {
          text-align: center;
          color: #cbd5e1;
          font-size: 14px;
          line-height: 1.5;
          margin: 10px 0 28px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .input-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #020617;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 14px 16px;
          margin-bottom: 16px;
        }

        .input-box:focus-within {
          border-color: #10b981;
        }

        .input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #ffffff;
          font-size: 15px;
        }

        .error {
          border: 1px solid rgba(239,68,68,0.35);
          background: rgba(239,68,68,0.12);
          color: #fecaca;
          border-radius: 16px;
          padding: 12px;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .button {
          width: 100%;
          border: none;
          background: #10b981;
          color: #020617;
          border-radius: 16px;
          padding: 16px;
          font-size: 15px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 22px;
            border-radius: 22px;
          }

          .title {
            font-size: 24px;
          }

          .subtitle {
            font-size: 13px;
          }
        }
      `}</style>

      <form onSubmit={handleLogin} className="login-card">
        <div className="icon-box">
          <Lock size={28} />
        </div>

        <h1 className="title">Acesso Admin</h1>

        <p className="subtitle">
          Entre para gerenciar planos, banners e WhatsApp.
        </p>

        <label className="label">E-mail</label>

        <div className="input-box">
          <Mail size={18} color="#10b981" />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input"
            placeholder="Digite seu e-mail"
            type="email"
            required
          />
        </div>

        <label className="label">Senha</label>

        <div className="input-box">
          <Lock size={18} color="#10b981" />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input"
            placeholder="Digite sua senha"
            type="password"
            required
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button disabled={loading} className="button">
          {loading && <Loader2 className="animate-spin" size={18} />}
          Entrar
        </button>
      </form>
    </main>
  );
}

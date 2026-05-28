"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";

export default function EditarPlanoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(true);

  async function loadPlan() {
    const response = await fetch(`/api/plans/${id}`);
    const data = await response.json();

    if (data.success) {
      setName(data.plan.name || "");
      setPrice(data.plan.price || "");
      setDescription(data.plan.description || "");
      setFeaturesText((data.plan.features || []).join("\n"));
    }

    setLoadingPlan(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const features = featuresText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    const response = await fetch(`/api/plans/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description, features }),
    });

    const data = await response.json();
    setLoading(false);

    if (!data.success) {
      alert(data.message || "Erro ao atualizar plano.");
      return;
    }

    router.push("/admin/planos");
    router.refresh();
  }

  useEffect(() => {
    loadPlan();
  }, []);

  if (loadingPlan) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <Loader2 className="animate-spin text-emerald-400" size={36} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-xl">
        <Link
          href="/admin/planos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
        >
          <ArrowLeft size={16} />
          Voltar para planos
        </Link>

        <div className="mb-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-400">
            Edição de plano
          </p>

          <h1 className="mt-2 text-4xl font-black">Editar plano</h1>

          <p className="mt-3 text-slate-300">
            Altere apenas o que precisar e salve.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl"
        >
          <div className="space-y-5">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 outline-none transition focus:border-emerald-400"
            />

            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 outline-none transition focus:border-emerald-400"
            />

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
              rows={4}
              className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 outline-none transition focus:border-emerald-400"
            />

            <textarea
              value={featuresText}
              onChange={(event) => setFeaturesText(event.target.value)}
              rows={6}
              className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 outline-none transition focus:border-emerald-400"
            />

            <button
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 font-black text-slate-950 transition hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save />}
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

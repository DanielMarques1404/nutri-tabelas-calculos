import { Link, Route, Routes } from 'react-router-dom'

import { cn } from './lib/utils'

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <section className="mx-auto flex max-w-4xl flex-col gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-cyan-950/30 sm:p-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            React + Vite
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Ambiente pronto para desenvolver.
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Projeto configurado com TypeScript, Tailwind CSS, react-router-dom,
            clsx e helper cn.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {['React', 'Vite', 'TypeScript', 'Tailwind', 'Router'].map((item) => (
            <span
              className={cn(
                'rounded-full border border-cyan-300/30 px-4 py-2 text-sm text-cyan-100',
                item === 'Tailwind' && 'bg-cyan-300/10',
              )}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <Link
          className="w-fit rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          to="/sobre"
        >
          Ver rota de exemplo
        </Link>
      </section>
    </main>
  )
}

function About() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 text-slate-100">
      <section className="max-w-xl space-y-5 rounded-3xl border border-white/10 p-8">
        <h1 className="text-3xl font-bold">Rota /sobre</h1>
        <p className="text-slate-300">
          Esta tela confirma que o react-router-dom esta configurado.
        </p>
        <Link className="text-cyan-300 underline-offset-4 hover:underline" to="/">
          Voltar para inicio
        </Link>
      </section>
    </main>
  )
}

export function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<About />} path="/sobre" />
    </Routes>
  )
}

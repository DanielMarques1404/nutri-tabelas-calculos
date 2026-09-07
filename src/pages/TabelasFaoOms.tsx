import { useEffect, useState } from "react";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { faoOmsRecomendacoes, type Sexo } from "../data";

const parseNonNegativeNumber = (value: string) =>
  Math.max(parseFloat(value) || 0, 0);

const formatNecessidadeCalorica = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const TabelasFaoOms = () => {
  const [peso, setPeso] = useState<number>(0);
  const [sexo, setSexo] = useState<Sexo>("masculino");
  const [faixaEtaria, setFaixaEtaria] = useState<number>(0);
  const [necessidadeCalorica, setNecessidadeCalorica] = useState<number>(0);

  useEffect(() => {
    const faoOms = faoOmsRecomendacoes[faixaEtaria];
    setNecessidadeCalorica(faoOms?.recomendacao(peso, sexo) ?? 0);
  }, [faixaEtaria, peso, sexo]);

  const fatorAplicado =
    faoOmsRecomendacoes[faixaEtaria]?.recomendacao(1, sexo) ?? 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Recomendações FAO/OMS
        </h1>

        <Select
          label={"Faixa Etária"}
          value={faixaEtaria}
          onChange={(e) => setFaixaEtaria(parseInt(e.target.value))}
        >
          {faoOmsRecomendacoes.map((recomendacao) => (
            <option key={recomendacao.id} value={recomendacao.id}>
              {recomendacao.faixaEtaria}
            </option>
          ))}
        </Select>

        <Input
          label="Peso (kg)"
          type="number"
          min={0}
          placeholder="Digite o peso"
          value={peso}
          onChange={(e) => setPeso(parseNonNegativeNumber(e.target.value))}
        />

        <Select
          label={"Sexo"}
          value={sexo}
          onChange={(e) => setSexo(e.target.value as Sexo)}
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </Select>

        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
          <span className="text-sm font-medium text-red-700">
            Necessidade calórica estimada
          </span>
          <h1 className="mt-2 text-4xl font-bold text-red-800">
            {formatNecessidadeCalorica(necessidadeCalorica)} kcal
          </h1>
          {faixaEtaria ? (
            <p className="mt-2 text-sm text-slate-700">
              {necessidadeCalorica > 0
                ? `Fator aplicado: ${fatorAplicado} kcal/kg para ${faoOmsRecomendacoes[faixaEtaria].faixaEtaria}.`
                : "Informe o peso para calcular a necessidade calórica."}
            </p>
          ) : (
            <p className="mt-2 text-sm text-slate-700">
              Nenhuma faixa etária encontrada para a idade informada.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 bg-amber-50 p-3 rounded-lg mt-2">
          <span className="text-sm text-slate-700">
            <strong>Desenvolvido por: </strong>Emanuella Alves Monteiro Marques
            (Estagiária de Nutrição Unifametro){" "}
            <a
              className="text-blue-800 hover:font-semibold hover:text-blue-500"
              href="https://www.instagram.com/emanuellanutri/"
              target="_blank"
            >
              @emanuellanutri
            </a>
          </span>
          <span className="text-sm text-slate-700">
            <strong>Preceptora: </strong>Guilhermina Cordeiro
          </span>
        </div>
      </div>
    </section>
  );
};

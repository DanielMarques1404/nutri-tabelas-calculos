import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Toggle } from "../components/ui/Toggle";
import {
  faoOmsAnosData,
  faoOmsMesesData,
  type RecomendacoesType,
} from "../data";

type UnidadeIdade = "meses" | "anos";
type Sexo = "masculino" | "feminino";

const parseNonNegativeNumber = (value: string) =>
  Math.max(parseFloat(value) || 0, 0);

const formatNecessidadeCalorica = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const findRecomendacao = (idade: number, data: RecomendacoesType[]) => {
  return data.find((recomendacao, index) => {
    const isLastRange = index === data.length - 1;

    return (
      idade >= recomendacao.faixaEtariaInicial &&
      (idade < recomendacao.faixaEtariaFinal ||
        (isLastRange && idade === recomendacao.faixaEtariaFinal))
    );
  });
};

export const TabelasFaoOms = () => {
  const [peso, setPeso] = useState<number>(0);
  const [idade, setIdade] = useState<number>(0);
  const [sexo, setSexo] = useState<Sexo>("masculino");
  const [unidadeIdade, setUnidadeIdade] = useState<UnidadeIdade>("meses");
  const recomendacoesData =
    unidadeIdade === "meses" ? faoOmsMesesData : faoOmsAnosData;
  const recomendacao = findRecomendacao(idade, recomendacoesData);
  const fator =
    sexo === "masculino" ? recomendacao?.paraMeninos : recomendacao?.paraMeninas;
  const necessidadeCalorica = fator ? peso * fator : 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Recomendações FAO/OMS
        </h1>
        <Toggle
          label="Informe a idade em"
          options={[
            { label: "Meses", value: "meses" },
            { label: "Anos", value: "anos" },
          ]}
          value={unidadeIdade}
          onValueChange={setUnidadeIdade}
        />
        <Input
          label={`Idade (${unidadeIdade})`}
          type="number"
          min={0}
          placeholder="Digite a idade"
          value={idade}
          onChange={(e) => setIdade(parseNonNegativeNumber(e.target.value))}
        />
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
          {fator ? (
            <p className="mt-2 text-sm text-slate-700">
              Fator aplicado: {fator} kcal/kg para {idade} {unidadeIdade}.
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

import { useState } from "react";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Toggle } from "../components/ui/Toggle";
import {
  faoOmsCriticamenteDoentesRecomendacoes,
  faoOmsRecomendacoes,
  schofieldCriticamenteDoentesRecomendacoes,
  type Sexo,
} from "../data";

type TipoRecomendacao = "fao-oms" | "criticamente-doentes";
type FormulaCriticamenteDoente = "fao-oms" | "schofield";

const parseNonNegativeNumber = (value: string) =>
  Math.max(parseFloat(value.replace(",", ".")) || 0, 0);

const isDecimalInput = (value: string) => /^\d*([,.]\d*)?$/.test(value);

const formatNecessidadeCalorica = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const NecessidadesCaloricas = () => {
  const [pesoInput, setPesoInput] = useState("");
  const [estaturaInput, setEstaturaInput] = useState("");
  const [sexo, setSexo] = useState<Sexo>("masculino");
  const [faixaEtaria, setFaixaEtaria] = useState<number | null>(null);
  const [tipoRecomendacao, setTipoRecomendacao] =
    useState<TipoRecomendacao>("fao-oms");
  const [formulaCriticamenteDoente, setFormulaCriticamenteDoente] =
    useState<FormulaCriticamenteDoente>("fao-oms");

  const recomendacoes =
    tipoRecomendacao === "fao-oms"
      ? faoOmsRecomendacoes
      : formulaCriticamenteDoente === "fao-oms"
        ? faoOmsCriticamenteDoentesRecomendacoes
        : schofieldCriticamenteDoentesRecomendacoes;
  const recomendacao =
    faixaEtaria === null ? undefined : recomendacoes[faixaEtaria];
  const peso = parseNonNegativeNumber(pesoInput);
  const estatura = parseNonNegativeNumber(estaturaInput);
  const necessidadeCalorica =
    recomendacao?.recomendacao(peso, sexo, estatura) ?? 0;
  const usaSchofield =
    tipoRecomendacao === "criticamente-doentes" &&
    formulaCriticamenteDoente === "schofield";
  const camposFaltando = [
    faixaEtaria === null ? "faixa etária" : null,
    peso === 0 ? "peso" : null,
    usaSchofield && estatura === 0 ? "estatura" : null,
  ].filter((campo): campo is string => Boolean(campo));
  const podeCalcular = camposFaltando.length === 0;

  const handleTipoRecomendacaoChange = (value: TipoRecomendacao) => {
    setTipoRecomendacao(value);
    setFaixaEtaria(null);
  };

  const handleFormulaCriticamenteDoenteChange = (
    value: FormulaCriticamenteDoente,
  ) => {
    setFormulaCriticamenteDoente(value);
    setFaixaEtaria(null);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Necessidades Calóricas Estimadas
        </h1>

        <Toggle
          label="Tipo de recomendação"
          options={[
            { label: "Recomendações FAO/OMS", value: "fao-oms" },
            { label: "Criticamente Doentes", value: "criticamente-doentes" },
          ]}
          value={tipoRecomendacao}
          onValueChange={handleTipoRecomendacaoChange}
        />

        {tipoRecomendacao === "criticamente-doentes" && (
          <Toggle
            label="Fórmula para criticamente doentes"
            options={[
              { label: "FAO/OMS", value: "fao-oms" },
              { label: "Schofield", value: "schofield" },
            ]}
            value={formulaCriticamenteDoente}
            onValueChange={handleFormulaCriticamenteDoenteChange}
          />
        )}

        <Select
          label={"Faixa Etária"}
          value={faixaEtaria ?? ""}
          onChange={(e) =>
            setFaixaEtaria(
              e.target.value === "" ? null : parseInt(e.target.value),
            )
          }
        >
          <option value="">Selecione a faixa etária</option>
          {recomendacoes.map((recomendacao, index) => (
            <option key={recomendacao.id} value={index}>
              {recomendacao.faixaEtaria}
            </option>
          ))}
        </Select>

        <Input
          label="Peso (kg)"
          type="text"
          inputMode="decimal"
          placeholder="Digite o peso"
          value={pesoInput}
          onChange={(e) => {
            if (isDecimalInput(e.target.value)) setPesoInput(e.target.value);
          }}
        />

        {usaSchofield && (
          <Input
            label="Estatura (cm)"
            type="text"
            inputMode="decimal"
            placeholder="Digite a estatura"
            value={estaturaInput}
            onChange={(e) => {
              if (isDecimalInput(e.target.value)) {
                setEstaturaInput(e.target.value);
              }
            }}
          />
        )}

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
          {podeCalcular && recomendacao ? (
            <>
              <h1 className="mt-2 text-4xl font-bold text-red-800">
                {formatNecessidadeCalorica(necessidadeCalorica)} kcal/dia
              </h1>
              <p className="mt-2 text-sm text-slate-700">
                Recomendação aplicada para {recomendacao.faixaEtaria}.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-slate-700">
              Preencha {camposFaltando.join(", ")} para calcular a necessidade
              calórica.
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

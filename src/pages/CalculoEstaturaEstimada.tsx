import { useEffect, useState } from "react";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";

const formatEstatura = (value: number) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const parseNonNegativeNumber = (value: string) =>
  Math.max(parseFloat(value) || 0, 0);

export const CalculoEstaturaEstimada =() => {
  const [isNeuropata, setIsNeuropata] = useState(false);
  const [estatura, setEstatura] = useState<number | null>(null);
  const [aj, setAj] = useState<number>(0);
  const [idade, setIdade] = useState<number>(0);
  const [sexo, setSexo] = useState<string>("masculino");

  const EDefault = (aj: number) => {
    return 2.69 * aj + 24.2;
  };

  const EMasculino = (aj: number, idade: number) => {
    return 64.19 - 0.04 * idade + 2.02 * aj;
  };

  const EFeminino = (aj: number, idade: number) => {
    return 84.88 - 0.24 * idade + 1.83 * aj;
  };

  const EEstimado = (aj: number, idade: number, sexo: string) => {
    if (sexo === "masculino") {
      return EMasculino(aj, idade);
    } else {
      return EFeminino(aj, idade);
    }
  }

  const calculateEstatura = (aj: number, idade: number, sexo: string) => {
    if (aj == 0) return 0;
    
    if (isNeuropata) {
      return EDefault(aj);
    } else {
      return EEstimado(aj, idade, sexo);
    }
  };

  useEffect(() => {
    setEstatura(calculateEstatura(aj, idade, sexo));
  }, [aj, idade, isNeuropata, sexo]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-slate-800 text-center">
          Calculadora de Estatura Estimada por Altura do Joelho (AJ)
        </h1>
        <Input
          label="AJ (em centímetros)"
          type="number"
          min={0}
          placeholder="Digite o valor de AJ"
          value={aj}
          onChange={(e) => setAj(parseNonNegativeNumber(e.target.value))}
        />
        <Input
          label="Paciente neuropata"
          type="checkbox"
          onChange={(e) => setIsNeuropata(e.target.checked)}
        />
        <Input
          label="Idade (anos)"
          type="number"
          min={0}
          placeholder="Digite a idade"
          value={idade}
          onChange={(e) => setIdade(parseNonNegativeNumber(e.target.value))}
          disabled={isNeuropata}
        />
        <Select
          label={"Sexo"}
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          disabled={isNeuropata}
        >
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </Select>

        <h1 className="text-4xl font-bold text-red-800 text-center">
          {aj == 0
            ? "--"
            : `${formatEstatura(estatura || 0)} cm = ${formatEstatura(
                (estatura || 0) / 100,
              )} m`}
        </h1>

        <div className="grid grid-cols-2 grid-rows-2 gap-1 text-sm text-slate-700 border-2 border-slate-300 px-3 py-1 rounded-lg">
          <p>STEVENSON, R. D. </p>
          <p>E = (2,69 x AJ) + 24,2</p>
          <p>
            CHUMLEA <i>et al.</i> (1985)
          </p>
          <div>
            <p>HOMENS: 64,19 - (0,04 x idade) + (2,02 x AJ)</p>
            <p>FEMININO: 84,88 - (0,24 x idade) + (1,83 x AJ)</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 bg-amber-50 p-3 rounded-lg mt-2">
          <span className="text-sm text-slate-700">
          <strong>Desenvolvido por: </strong>Emanuella Alves Monteiro Marques
          (Estagiária de Nutrição Unifametro) <a className="text-blue-800 hover:font-semibold hover:text-blue-500" href="https://www.instagram.com/emanuellanutri/" target="_blank">
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
}

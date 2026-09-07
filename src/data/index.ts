export const pages: string[] = ["Estatura", "FAO"];

export type Sexo = "masculino" | "feminino";

export type RecomendacoesType = {
  id: number;
  faixaEtaria: string;
  recomendacao: (peso: number, sexo: Sexo, estatura?: number) => number;
};

export const faoOmsRecomendacoes: RecomendacoesType[] = [
  {
    id: 0,
    faixaEtaria: "0 a 1 mes",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 113 : 107),
  },
  {
    id: 1,
    faixaEtaria: "1 a 2 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 104 : 101),
  },
  {
    id: 2,
    faixaEtaria: "2 a 3 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 95 : 94),
  },
  {
    id: 3,
    faixaEtaria: "3 a 4 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 82 : 84),
  },
  {
    id: 4,
    faixaEtaria: "4 a 5 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 81 : 83),
  },
  {
    id: 5,
    faixaEtaria: "5 a 6 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 81 : 82),
  },
  {
    id: 6,
    faixaEtaria: "6 a 9 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 79 : 78),
  },
  {
    id: 7,
    faixaEtaria: "9 a 11 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 80 : 79),
  },
  {
    id: 8,
    faixaEtaria: "11 a 12 meses",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 81 : 79),
  },
  {
    id: 9,
    faixaEtaria: "1 a 2 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 82.4 : 80.1),
  },
  {
    id: 10,
    faixaEtaria: "2 a 3 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 83.6 : 80.6),
  },
  {
    id: 11,
    faixaEtaria: "3 a 4 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 79.7 : 76.5),
  },
  {
    id: 12,
    faixaEtaria: "4 a 5 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 76.8 : 73.9),
  },
  {
    id: 13,
    faixaEtaria: "5 a 6 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 74.5 : 71.5),
  },
  {
    id: 14,
    faixaEtaria: "6 a 7 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 72.5 : 69.3),
  },
  {
    id: 15,
    faixaEtaria: "7 a 8 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 70.5 : 66.7),
  },
  {
    id: 16,
    faixaEtaria: "8 a 9 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 68.5 : 63.8),
  },
  {
    id: 17,
    faixaEtaria: "9 a 10 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 66.6 : 60.8),
  },
  {
    id: 18,
    faixaEtaria: "10 a 11 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 64.6 : 57.8),
  },
  {
    id: 19,
    faixaEtaria: "11 a 12 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 62.4 : 54.8),
  },
  {
    id: 20,
    faixaEtaria: "12 a 13 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 60.2 : 52),
  },
  {
    id: 21,
    faixaEtaria: "13 a 14 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 57.9 : 49.3),
  },
  {
    id: 22,
    faixaEtaria: "14 a 15 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 55.6 : 47),
  },
  {
    id: 23,
    faixaEtaria: "15 a 16 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      peso * (sexo === "masculino" ? 53.4 : 45.3),
  },
];

export const faoOmsCriticamenteDoentesRecomendacoes: RecomendacoesType[] = [
  {
    id: 0,
    faixaEtaria: "0 a 3 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      sexo === "masculino" ? 60.9 * peso - 54 : 61 * peso - 51,
  },
  {
    id: 1,
    faixaEtaria: "3 a 10 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      sexo === "masculino" ? 22.7 * peso + 495 : 22.5 * peso + 499,
  },
  {
    id: 2,
    faixaEtaria: "10 a 18 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      sexo === "masculino" ? 17.5 * peso + 651 : 12.2 * peso + 746,
  },
];

export const schofieldCriticamenteDoentesRecomendacoes: RecomendacoesType[] = [
  {
    id: 0,
    faixaEtaria: "0 a 3 anos",
    recomendacao: (peso: number, sexo: Sexo, estatura = 0) =>
      sexo === "masculino"
        ? 0.167 * peso + 15.17 * estatura - 617.6
        : 16.252 * peso + 10.232 * estatura - 413.5,
  },
  {
    id: 1,
    faixaEtaria: "3 a 10 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      sexo === "masculino" ? 22.7 * peso + 495 : 22.5 * peso + 499,
  },
  {
    id: 2,
    faixaEtaria: "10 a 18 anos",
    recomendacao: (peso: number, sexo: Sexo) =>
      sexo === "masculino" ? 17.5 * peso + 651 : 12.2 * peso + 746,
  },
];

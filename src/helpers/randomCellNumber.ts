import { DDDs } from "../mocks/ddds";

export const gerarNumeroDeCelularAleatorio = () => {

  const ddd = DDDs[Math.floor(Math.random() * DDDs.length)];
  const quatroNumerosAleatorios = Math.floor(Math.random() * 10000).toString().padStart(4, "0")

  return `${ddd} 9 ${quatroNumerosAleatorios}-${quatroNumerosAleatorios}`;
};

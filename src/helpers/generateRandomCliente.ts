const opcoesDeClientes = ['Luffy', 'Zoro', 'Nami', 'Usopp', 'Sanji', 'Chopper', 'Robin', 'Franky', 'Brook', 'Jinbe'];

export const gerarNomeAleatorio = () => {
  const randomIndex = Math.floor(Math.random() * opcoesDeClientes.length);
  return opcoesDeClientes[randomIndex];
};

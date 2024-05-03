export const opcoesDeClientes = [
  'Luffy',
  'Zoro',
  'Nami',
  'Usopp',
  'Sanji',
  'Chopper',
  'Robin',
  'Franky',
  'Brook',
  'Jinbe',
  'Ace',
  'Roger',
  'Teach',
  'Shanks',
  'Buggy',
  'Sogeking',
  'Katakuri',
  'Linlin',
  'Oda',
  'Enel',
  'Garp',
  'Kaya',
  'Hiyori',
  'Kuro',
  'Kureha',
  'Morgans',
  'Perona',
  'Noland',
  'Sora',
  'Kaido'
];

export const gerarNomeAleatorio = () => {
  const randomIndex = Math.floor(Math.random() * opcoesDeClientes.length);
  return opcoesDeClientes[randomIndex];
};

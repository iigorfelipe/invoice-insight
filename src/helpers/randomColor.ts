export const gerarCorAleatoria = () => {
  return "#"+((1<<24)*Math.random()|0).toString(16);
};

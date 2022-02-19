export default function print() {
  alert(`
Será aberta a opção de imprimir. 

Caso deseje uma cópia física, deve escolher a
impressora que preferir.

Para gerar um arquivo, deve se escolher a opção de
salvar em PDF.

Obs: Para melhor visualização escolher o layout que
melhor ficam os dados (Retrato/paisagem).

Ir em Mais definições e ativar Gráficos de segundo
plano e Desativar Cabeçalhos e rodapés.`);
    window.print();
}
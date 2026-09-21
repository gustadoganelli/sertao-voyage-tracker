# Sertão Express Tracker

Crie uma animação KPI premium e realista para um painel corporativo da organização Amigos do Bem, representando visualmente a jornada de uma carreta que transporta produtos produzidos no sertão nordestino até São Paulo.

O componente deve funcionar como um card KPI compacto dentro de um dashboard HTML, e não como uma animação em tela cheia.

Conceito da jornada

A carreta realiza uma viagem entre:

Origem: São Paulo – SP
Destino: Catimbau – PE, região do sertão de Pernambuco.

A jornada deve ter duração de 7 dias.

O mapa deve representar o Brasil de forma geograficamente coerente, com o contorno real do território brasileiro e, se possível, a divisão visual dos estados de maneira discreta.

A rota deve sair da região de São Paulo, seguir em direção ao Nordeste, atravessar visualmente o território brasileiro e terminar na região de Catimbau, Pernambuco.

Não utilizar uma linha reta artificial entre os dois pontos. A rota deve possuir uma curva natural, semelhante à trajetória de uma viagem rodoviária, respeitando visualmente a posição geográfica de São Paulo e Pernambuco.

Carreta

Utilizar uma carreta/caminhão moderno em visão lateral ou levemente isométrica, com aparência profissional e realista, adequada para um dashboard corporativo.

A carreta deve possuir o logo oficial dos Amigos do Bem aplicado na lateral do baú, utilizando exatamente a identidade visual fornecida, sem distorcer ou alterar o logo.

A carreta deve estar claramente associada ao transporte de produtos e à logística da organização.

Animação

A posição da carreta deve representar o progresso da viagem:

Dia 0/7: carreta em São Paulo.
Dia 1–2: início da viagem, saindo de São Paulo.
Dia 3–4: carreta no percurso pelo Brasil.
Dia 5–6: aproximação do Nordeste e de Pernambuco.
Dia 7/7: chegada ao sertão, em Catimbau – PE.

O movimento deve ser suave e contínuo, evitando movimentos bruscos ou artificiais.

Conforme os dias avançam:

 a carreta percorre a rota;

 a linha da rota acompanha visualmente o progresso;

 o indicador de progresso aumenta;

 o destino fica progressivamente mais próximo;

 ao chegar ao Dia 7, a animação deve apresentar claramente a chegada ao destino.

Card KPI

O componente deve ter aparência de um KPI executivo moderno, adequado para Power BI, Power Apps, SharePoint ou um painel HTML.

Estrutura sugerida:

JORNADA DA CARRETA
São Paulo • SP → Catimbau • PE

Dia 4/7

Mapa do Brasil com:

 rota;

 ponto de origem;

 ponto de destino;

 carreta em movimento;

 indicação visual do progresso.

Na parte inferior:

Em trânsito • 57% da jornada

E no Dia 7:

Chegada no sertão • Catimbau, PE

Identidade visual

Utilizar uma estética inspirada na identidade visual dos Amigos do Bem, com:

 azul;

 azul-esverdeado;

 amarelo/laranja do logo;

 branco;

 tons neutros;

 sombras suaves;

 bordas arredondadas;

 aparência limpa e institucional.

O design deve transmitir logística, impacto social, movimento e conexão entre São Paulo e o sertão.

Evitar excesso de elementos, excesso de texto ou aparência de videogame.

Qualidade técnica

Desenvolver preferencialmente utilizando:

HTML + CSS + JavaScript + SVG

O mapa e a carreta devem ser vetoriais sempre que possível, para manter excelente qualidade em diferentes tamanhos de tela e monitores de alta resolução.

Não utilizar uma imagem JPG como elemento principal da animação. O objetivo é que o componente permaneça nítido mesmo quando redimensionado.

Integração com dados

A animação deve permitir que o dashboard controle o dia atual da viagem por JavaScript.

Criar uma função pública como:

updateCarreta(diasDecorridos, diasTotais)

Exemplos:

updateCarreta(0, 7) → Dia 0/7, São Paulo
updateCarreta(3, 7) → Dia 3/7, em trânsito
updateCarreta(5, 7) → Dia 5/7, aproximando-se de Pernambuco
updateCarreta(7, 7) → Dia 7/7, chegada em Catimbau

O componente deve ser responsivo e funcionar dentro de um card de dashboard sem ocupar a tela inteira.

Prioridade máxima: coerência geográfica, aparência profissional, movimento natural da carreta, utilização correta do logo Amigos do Bem e integração com dados reais do painel. O resultado final deve parecer um componente desenvolvido para um dashboard corporativo moderno, e não uma animação genérica.

Uma melhoria importante

Eu acrescentaria esta instrução no final se você for passar o prompt para uma IA que vai gerar o código:

Não simplifique o mapa para um desenho abstrato do Brasil. Utilize uma representação vetorial geograficamente fiel do território brasileiro e posicione São Paulo e Catimbau, Pernambuco, de acordo com suas posições reais. A rota deve ser visualmente plausível e a carreta deve permanecer sobre a rota durante toda a animação. Entregue o resultado como um único arquivo HTML autocontido, sempre que possível, sem depender de imagens externas.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sertao-voyage-tracker.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/960f80f5-3e39-5266-8e53-95dfdd8cab43).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

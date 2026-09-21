# Painel logístico ampliado

## Objetivo
Transformar o card atual em uma área executiva compacta, mantendo a jornada como foco e usando a carreta vermelha enviada como referência visual.

## O que será criado
- Faixa superior com KPIs de distância percorrida, carga transportada, famílias impactadas e previsão de chegada.
- Linha do tempo interativa de 7 dias, com marcos da rota e seleção direta de cada dia.
- Atualização sincronizada de mapa, carreta, rota, percentual e todos os KPIs ao escolher um dia ou chamar `updateCarreta(diasDecorridos, diasTotais)`.
- Carreta vetorial mais próxima da referência: cabine e baú vermelhos, perfil rodoviário e aplicação preservada do logo Amigos do Bem.
- Estados de partida, trânsito, aproximação e chegada com textos corporativos objetivos.
- Adaptação para cards largos e telas menores, sem transformar a experiência em página promocional.

## Dados demonstrativos
Enquanto não houver uma fonte conectada, distância, carga e impacto serão valores demonstrativos calculados pelo progresso e claramente identificados no painel.

## Detalhes técnicos
- Manter mapa vetorial e coordenadas geográficas existentes.
- Centralizar o estado da viagem para que mapa, KPIs e linha do tempo respondam ao mesmo valor.
- Preservar a função pública JavaScript já disponível para integração com Power BI, Power Apps, SharePoint ou outro painel HTML.
- Validar visualmente os estados Dia 0, Dia 4 e Dia 7 em desktop e celular.

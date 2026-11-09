# Perfil original preservado

A tela atual substituiu o conteúdo de `src/screens/ProfileScreen.tsx` no diretório de trabalho. No HEAD anterior, a implementação antiga estava comentada, com a mensagem “Fora do Escopo”, desde o commit `6560658` de 18 de maio de 2026.

O código completo anterior a essa desativação foi recuperado do commit `9230ade7ea7982fcffedbb71f6c0d3f1ea3cb83f`:

- `ProfileScreen.original.tsx.txt`: conteúdo original exato da tela, com idade, peso, gênero, gestante, condições e alergias. A extensão `.txt` impede que o TypeScript compile acidentalmente essa referência histórica.
- `perfil-original-9230ade.zip`: pasta `src` e `package.json` daquela revisão, incluindo hook, componentes, dados e navegação compatíveis com a tela antiga.

Esses arquivos não são importados pelo aplicativo. Para reaproveitar o layout, adapte-o ao contrato atual de `useHealthProfile`; não substitua apenas a tela, pois a API do hook mudou. Os campos antigos não comprovam a existência de regras clínicas para todas as condições listadas.

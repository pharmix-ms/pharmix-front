# 💊 Pharmix

> Aplicativo mobile de apoio à automedicação responsável, com foco na identificação de interações entre princípios ativos de medicamentos.

---

## 📋 Sobre o Projeto

A automedicação é uma prática amplamente disseminada no Brasil e, quando realizada sem orientação adequada, pode representar riscos sérios à saúde — especialmente pela combinação inadvertida de medicamentos incompatíveis. O **Pharmix** surge como uma ferramenta de apoio informacional, permitindo que o usuário verifique possíveis interações entre princípios ativos antes de utilizá-los simultaneamente.

O projeto se alinha à **ODS 3 da ONU – Saúde e Bem-Estar**, promovendo o uso mais seguro e consciente de medicamentos.

> ⚠️ O Pharmix **não substitui** a orientação de um profissional de saúde. A ferramenta é exclusivamente informacional e complementar ao acompanhamento médico e farmacêutico.

---

## ✨ Funcionalidades (MVP)

- 🔍 **Busca no catálogo** de princípios ativos, alimentos e bebidas
- ⚡ **Consulta de interações** entre princípios ativos e de relações cadastradas com espinafre, bebida alcoólica e água
- 👤 **Perfil opcional** com alergias autorrelatadas, gravidez e condições cobertas pelo conjunto inicial de regras
- 🕓 **Histórico local** para reabrir consultas e seus detalhes
- 📱 Demonstração em Android

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Linguagem | TypeScript |
| Framework mobile | React Native 0.81 + Expo SDK 54 |
| Estilização | NativeWind 4 (Tailwind CSS para RN) |
| Navegação | React Navigation 7 (stack + bottom tabs) |
| Animações | React Native Reanimated 4 + Gesture Handler |
| Ícones | Lucide React Native |
| Armazenamento local | AsyncStorage |
| Autocompletar | React Native Autocomplete Dropdown |
| API de dados | Backend Pharmix em NestJS com PostgreSQL e dados importados do Detecta Interações |
| Design/Prototipação | Figma |
| Linting/Formatação | ESLint + Prettier (com plugin Tailwind) |
| Versionamento | Git + GitHub |

O aplicativo envia ao backend apenas os nomes dos princípios ativos selecionados para a consulta entre medicamentos. O perfil, o histórico e as regras complementares são processados no aparelho. Cada orientação complementar de origem externa indica a referência. Uma resposta sem registros significa que a consulta não encontrou correspondência na base disponível.

---

## 🗂️ Estrutura do Projeto

```
pharmix-front/
├── assets/          # Imagens e recursos estáticos
├── src/             # Código-fonte principal
├── App.tsx          # Componente raiz
├── index.ts         # Entry point
├── app.json         # Configurações do Expo
├── tailwind.config.js
└── package.json
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 22 ou 24
- Android Studio com emulador configurado
- Backend Pharmix executando na porta 3000 com a base importada, conforme as [instruções do backend](https://github.com/pharmix-ms/pharmix-back/blob/feat-mateus/docs/importacao-detecta.md)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/pharmix-ms/pharmix-front.git
cd pharmix-front

# Instale as dependências
npm ci
cp .env.example .env

# Compile e abra a versão de desenvolvimento no emulador
npm run android
```

No PowerShell, use `Copy-Item .env.example .env`. O emulador padrão do Android Studio acessa o computador pelo endereço `http://10.0.2.2:3000`, definido em `EXPO_PUBLIC_BASE_URL`. Se a versão de desenvolvimento já estiver instalada, inicie o Metro com `npx expo start --dev-client`.

Use `npm test` para executar os cenários das regras complementares, `npm run lint` para a análise estática e `npx tsc --noEmit` para a checagem de tipos.

---

## Demonstração no Android

| Cenário | Fluxo esperado |
|---|---|
| AAS + Varfarina | Registro da base Detecta Interações com tela de detalhes |
| AAS + Acetaminofeno, com perfil limpo | Resposta sem registros para a seleção |
| Varfarina + Espinafre | Cartão de interação com referência |
| Paracetamol + Bebida alcoólica | Cartão de interação com referência |
| Omeprazol + Água | Cartão de orientação de administração |
| Perfil com alergia informada a AAS, seguido de consulta por AAS | Alerta do perfil |
| Aba Histórico | Reabertura e limpeza das consultas salvas |

## 🔭 Roadmap

As próximas etapas incluem ampliar as regras documentadas, avaliar a compreensão dos alertas com o público-alvo e expandir a cobertura para apresentações e nomes comerciais.

---

## 👥 Equipe

Desenvolvido por estudantes da **Faculdade de Análise e Desenvolvimento de Sistemas – Senac Hub Academy**, Campo Grande – MS.

| Nome | Contato |
|---|---|
| Mateus Storti Hellmann | mateus54099606@aluno.ms.senac.br |
| Guilherme Nantes Bergamo | guilherme54098226@aluno.ms.senac.br |
| Maria Eduarda | maria54099376@aluno.ms.senac.br |

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

<p align="center">Feito com ❤️ e TypeScript · Pharmix © 2026</p>

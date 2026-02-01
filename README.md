<p align="center">
  <h1 align="center">🌆 URBANIFY - Frontend Dashboard</h1>
  <p align="center">
    <strong>Dashboard administrativo moderno para gestão de infraestrutura urbana com visualização geográfica interativa</strong>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
  <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components" />
</p>

---

## 🎬 Demonstração

<p align="center">
  <img src="public/presentation.gif" alt="Demonstração do Urbanify Dashboard" width="100%" />
</p>

---

## 📋 Sobre o Projeto

O **Urbanify Frontend** é um dashboard administrativo desenvolvido para gestores públicos acompanharem e gerenciarem reports de infraestrutura urbana. A aplicação oferece visualização geográfica em tempo real, métricas analíticas e sistema de ranking dos cidadãos mais ativos.

### 🎯 Principais Funcionalidades

- **🗺️ Mapa Interativo**: Visualização de reports com clustering inteligente usando Leaflet + Supercluster
- **📊 Métricas Avançadas**: Dashboards com Chart.js para análise temporal e geográfica
- **🏆 Sistema de Ranking**: Gamificação para engajar cidadãos reportadores
- **📱 Design Responsivo**: Interface adaptável para desktop e tablets
- **🔐 Autenticação Segura**: Login com Google OAuth + JWT

---

## 🏛️ Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         PRESENTATION LAYER                          │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │  │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────────────┐ │  │
│  │  │  Login    │  │ Dashboard │  │ Management│  │     Metrics       │ │  │
│  │  │  Page     │  │   Page    │  │   Page    │  │      Page         │ │  │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────────────┘ │  │
│  │                                                                      │  │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         COMPONENT LAYER                              │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ │  │
│  │  │  Header  │ │  Sidebar │ │  Navbar  │ │  Filter  │ │ Pagination │ │  │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └────────────┘ │  │
│  │                                                                      │  │
│  │  ┌──────────────────────────────────────────────────────────────┐   │  │
│  │  │                    PAGE COMPONENTS                            │   │  │
│  │  │  • MapView (Leaflet + MarkerCluster + Supercluster)          │   │  │
│  │  │  • Charts (Chart.js + React-Chartjs-2)                        │   │  │
│  │  │  • ReportCard, ReportDetail, ReportModal                      │   │  │
│  │  │  • RankingTable, MetricsCard, StatsWidget                     │   │  │
│  │  └──────────────────────────────────────────────────────────────┘   │  │
│  │                                                                      │  │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                          STATE & SERVICES                            │   │
│  ├───────────────────────┬─────────────────────────────────────────────┤   │
│  │      Context API      │              Services Layer                  │   │
│  │  • AuthContext        │  • Dashboard API    • Metrics API           │   │
│  │  • ThemeContext       │  • Ranking API      • Report API            │   │
│  └───────────────────────┴─────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                           UTILS & HOOKS                              │   │
│  │  • useAuth         • useReports        • useDebounce                 │   │
│  │  • usePagination   • Custom Hooks      • Helper Functions            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 📁 Estrutura de Pastas

```
src/
├── assets/              # Recursos estáticos (imagens, ícones)
├── components/          # Componentes reutilizáveis
│   ├── buttons/         # Botões customizados
│   ├── filter/          # Sistema de filtros avançados
│   ├── header/          # Cabeçalho da aplicação
│   ├── loadings/        # Componentes de loading/skeleton
│   ├── navbar/          # Barra de navegação
│   ├── pagination/      # Paginação customizada
│   ├── sidebar/         # Menu lateral
│   └── pages/           # Componentes específicos de páginas
│       ├── dashboard/   # Cards, mapas, widgets do dashboard
│       ├── management/  # Gestão de reports
│       ├── metrics/     # Gráficos e métricas
│       └── ranking/     # Tabela de ranking
├── context/             # Context API (Auth, Theme)
├── hooks/               # Custom Hooks
├── layout/              # Layout principal (RootLayout)
├── pages/               # Páginas da aplicação
│   ├── dashboard/       # Página principal com mapa
│   ├── login/           # Autenticação
│   ├── management/      # Gestão de reports
│   ├── metrics/         # Analytics e métricas
│   └── ranking/         # Ranking de usuários
├── services/            # Camada de integração com API
├── styles/              # Estilos globais e tokens
└── utils/               # Funções utilitárias
```

---

## 🛠️ Stack Tecnológica

### Core Framework
| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **React** | 19 RC | Biblioteca UI com últimas features (hooks, concurrent) |
| **Vite** | 6.2 | Build tool ultrarrápido com HMR |
| **React Router** | 7 | Roteamento com data loaders |

### Estilização
| Tecnologia | Propósito |
|------------|-----------|
| **Styled Components** | CSS-in-JS com tema dinâmico |
| **React Icons** | Biblioteca de ícones unificada |

### Visualização de Dados
| Tecnologia | Propósito |
|------------|-----------|
| **Leaflet** | Mapas interativos |
| **React-Leaflet** | Integração React com Leaflet |
| **Leaflet.MarkerCluster** | Agrupamento de markers |
| **Supercluster** | Clustering performático |
| **Chart.js** | Gráficos e dashboards |
| **React-Chartjs-2** | Wrapper React para Chart.js |

### Autenticação & Segurança
| Tecnologia | Propósito |
|------------|-----------|
| **@react-oauth/google** | OAuth 2.0 com Google |
| **JWT-Decode** | Decodificação de tokens |
| **CryptoJS** | Criptografia client-side |

### Qualidade & DX
| Tecnologia | Propósito |
|------------|-----------|
| **ESLint** | Linting de código |
| **Prettier** | Formatação consistente |
| **TypeScript ESLint** | Type checking |

### Utilitários
| Tecnologia | Propósito |
|------------|-----------|
| **Axios** | HTTP client com interceptors |
| **ExcelJS** | Exportação de relatórios Excel |
| **Flatpickr** | Date picker moderno |
| **React Toastify** | Notificações elegantes |
| **React Lazy Load** | Lazy loading de imagens |

---

## 🗺️ Sistema de Mapeamento

O sistema de visualização geográfica combina múltiplas tecnologias para performance:

```
┌──────────────────────────────────────────────────────────────┐
│                    MAPPING ARCHITECTURE                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   Reports (API)           Supercluster            Leaflet     │
│   ┌──────────┐           ┌───────────┐         ┌──────────┐  │
│   │ lat, lng │──────────▶│ Clustering│─────────▶│ Markers  │  │
│   │ severity │           │ Algorithm │         │ + Popups │  │
│   │ status   │           └───────────┘         └──────────┘  │
│   └──────────┘                 │                     │        │
│                                │                     │        │
│                                ▼                     ▼        │
│                    ┌───────────────────────────────────────┐ │
│                    │         INTERACTIVE MAP               │ │
│                    │  • Zoom-sensitive clustering          │ │
│                    │  • Status-based marker colors         │ │
│                    │  • Severity indicators                │ │
│                    │  • Photo previews on click            │ │
│                    └───────────────────────────────────────┘ │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Features do Mapa
- **Clustering Dinâmico**: Agrupa markers por zoom level
- **Cores por Status**: Verde (resolvido), Amarelo (avaliado), Vermelho (pendente)
- **Fly-to Animation**: Navegação suave para reports
- **Screenshot Export**: Exporta mapa com Leaflet-image

---

## 📊 Dashboard Analytics

```
┌────────────────────────────────────────────────────────────────────────────┐
│                           DASHBOARD LAYOUT                                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                         METRICS ROW                                   │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │  │
│  │  │  Total   │  │ Pending  │  │Evaluated │  │ Resolved │              │  │
│  │  │ Reports  │  │  Count   │  │  Count   │  │  Count   │              │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────┐  ┌────────────────────────────────┐  │
│  │         INTERACTIVE MAP          │  │         RECENT REPORTS         │  │
│  │                                   │  │                                │  │
│  │   [Leaflet + Clustering]         │  │   • Lista com scroll           │  │
│  │                                   │  │   • Cards visuais              │  │
│  │                                   │  │   • Quick actions              │  │
│  └──────────────────────────────────┘  └────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                       CHARTS ROW                                      │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────────────────┐│  │
│  │  │  Reports by Region      │  │        Monthly Trend               ││  │
│  │  │     (Pie Chart)         │  │        (Line Chart)                ││  │
│  │  └─────────────────────────┘  └─────────────────────────────────────┘│  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Sistema de Autenticação

### Protected Routes

```jsx
// Implementação de rotas protegidas
<Route element={<ProtectedRoute />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="management/:rep?" element={<Management />} />
  <Route path="metrics" element={<Metrics />} />
  <Route path="ranking" element={<Ranking />} />
</Route>
```

### Fluxo de Auth

```
┌──────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│   ┌─────────────┐         ┌───────────────┐                  │
│   │ Google OAuth│─────────▶│ Backend API  │                  │
│   │   Button    │         │  /auth/google │                  │
│   └─────────────┘         └───────┬───────┘                  │
│                                   │                           │
│                                   ▼                           │
│                          ┌────────────────┐                   │
│                          │  JWT Tokens    │                   │
│                          │ Access+Refresh │                   │
│                          └───────┬────────┘                   │
│                                  │                            │
│                                  ▼                            │
│                          ┌────────────────┐                   │
│                          │ AuthContext    │                   │
│                          │ (Global State) │                   │
│                          └───────┬────────┘                   │
│                                  │                            │
│                                  ▼                            │
│                          ┌────────────────┐                   │
│                          │ Protected      │                   │
│                          │ Routes Access │                   │
│                          └────────────────┘                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuração do Projeto

### Pré-requisitos

- Node.js 18+
- NPM ou Yarn
- Backend Urbanify rodando

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/urbanify-frontend.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute em modo desenvolvimento
npm run dev
```

### Variáveis de Ambiente

```env
# API Backend
VITE_API_URL=http://localhost:3000

# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Executa linting
```

---

## 📱 Páginas da Aplicação

| Página | Rota | Descrição |
|--------|------|-----------|
| **Login** | `/` | Autenticação com Google OAuth |
| **Dashboard** | `/dashboard` | Visão geral com mapa e métricas |
| **Management** | `/management/:rep?` | Gestão detalhada de reports |
| **Metrics** | `/metrics` | Analytics e gráficos avançados |
| **Ranking** | `/ranking` | Ranking de cidadãos ativos |

---

## 🎨 Decisões de Design

### Por que React 19?
- **Concurrent Features**: Renderização otimizada
- **Automatic Batching**: Menos re-renders
- **Suspense Improvements**: Loading states melhores
- **Server Components Ready**: Preparado para RSC

### Por que Styled Components?
- **Tema Dinâmico**: Suporte a dark/light mode
- **Scoped Styles**: CSS isolado por componente
- **Props-based**: Estilos condicionais simples
- **No Class Conflicts**: Hashes únicos automáticos

### Por que Supercluster + Leaflet?
- **Performance**: Clustering em Web Workers
- **Zoom Adaptive**: Agrupa por nível de zoom
- **Memory Efficient**: Renderiza apenas visível
- **Open Source**: Sem custos de API (vs Google Maps)

---

## 📞 Contato

<p align="center">
  <a href="mailto:jadson20051965@gmail.com">
    <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" />
  </a>
  <a href="https://www.linkedin.com/in/jadson-abreu/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
</p>

---

<p align="center">
  <strong>Desenvolvido por Jadson Abreu</strong>
</p>
# urbanify_frontend

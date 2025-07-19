# 🧱 Project Structure Overview – Next.js 14/15 (App Router)

This project is structured following **domain-based (feature-first)** architecture, optimized for scalability, maintainability, and clean separation of concerns. Ideal for medium to large Next.js applications using the App Router.

---

## 📁 Folder Structure

my-next-app/
├── public/
├── src/
│
│─── app/ # App Router: routing, layouts, pages
│ ├── layout.tsx # Global layout
│ ├── page.tsx # Home page
│ └── dashboard/
│ ├── page.tsx
│ └── settings/page.tsx
│
│─── modules/ # Domain logic grouped by feature
│ ├── user/
│ │ ├── components/ # UI components for 'user' domain
│ │ ├── services/ # API functions (e.g., getUserProfile)
│ │ ├── dto/ # Data Transfer Objects (UserDTO.ts)
│ │ ├── mappers/ # Raw -> DTO converters
│ │ ├── hooks/ # Custom hooks (useUser)
│ │ └── types.ts # Type definitions for domain
│ └── product/
│ ├── components/
│ ├── services/
│ ├── dto/
│ ├── mappers/
│ ├── hooks/
│ └── types.ts
│
│─── components/ # Shared UI components (Button, Modal, etc.)
│ └── ui/
│
│─── hooks/ # Shared reusable hooks
│
│─── lib/ # Core infrastructure & integrations
│ ├── axiosInstance.ts # Axios client with interceptors
│ ├── auth.ts # Auth helpers
│ ├── env.ts # Environment loader/validator
│ ├── prisma.ts # Prisma client
│ └── logger.ts # Logging utilities
│
│─── common/ # App-wide contracts, types, constants
│ ├── dto/ # Global DTOs (optional if not under modules/)
│ ├── constants/ # Constants for enums/configs
│ ├── types/ # Global TypeScript types
│ └── schemas/ # Zod/Yup schemas
│
│─── store/ # Global state stores (Zustand, Jotai, etc.)
│
│─── utils/ # Pure utility functions (e.g., formatDate)
│
│─── styles/ # Tailwind/global stylesheets
│
├── .env.local # Environment variables
├── next.config.js
├── tsconfig.json
└── package.json


---

## 🧠 Layer Responsibilities

| Layer        | Description |
|--------------|-------------|
| `modules/`   | Domain-oriented structure. Each feature contains its own UI, logic, DTOs, services, and types. |
| `components/`| Shared UI components used globally (e.g., buttons, cards) |
| `lib/`       | External integrations and foundational logic (e.g., axios client, auth, DB clients) |
| `common/`    | Global DTOs, constants, and types not tied to a specific domain |
| `store/`     | Global app state (Zustand, Jotai, etc.) |
| `hooks/`     | Shared hooks across domains or components |
| `utils/`     | Pure utility functions (e.g., string/date formatting) |
| `styles/`    | Tailwind or global CSS/SCSS |

---

## ✅ Best Practices

- **Domain-First**: Each module owns its entire stack (UI, services, types, hooks).
- **DTOs + Mappers**: All raw API responses are mapped to strongly typed DTOs.
- **Decoupled UI**: UI components do not depend on data-fetching logic directly.
- **Hooks → Services → Lib → Mapper → DTO**: Follow this data flow for clean logic separation.

---

## 📦 Tech Stack Suggestions

- `Axios` → in `lib/axiosInstance.ts`
- `Zustand` or `Jotai` → in `store/`
- `React Query` / `SWR` → in `hooks/`
- `Prisma` → in `lib/prisma.ts`
- `Zod` → in `common/schemas/`

---

## 🔧 Need Setup Support?

This structure is extensible to support:
- Monorepo with `pnpm workspaces`
- Feature flags, multi-tenant apps
- Custom backoffice panel or storefront

Let us know and we’ll tailor the setup.

---

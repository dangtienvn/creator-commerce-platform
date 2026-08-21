<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Creator%20Commerce%20Platform&fontSize=50&fontAlignY=38&desc=Digital%20Product%20Commerce%20Ecosystem&descAlignY=60&descAlign=60" width="100%" />

  <p>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&amp;logo=next.js&amp;logoColor=white" alt="Next.js" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&amp;logo=nodedotjs&amp;logoColor=white" alt="Node.js" /></a>
    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&amp;logo=express&amp;logoColor=white" alt="Express.js" /></a>
    <a href="https://www.prisma.io/"><img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" /></a>
    <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /></a>
    <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" /></a>
    <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" /></a>
  </p>
  
  <p>
    <i>An enterprise-grade, comprehensive platform empowering creators and independent sellers to distribute digital products effortlessly.</i>
  </p>
</div>

---

## 📖 Overview

The **Creator Commerce Platform** is a specialized E-Commerce and CRM Ecosystem built entirely around the distribution and management of **digital products**. It empowers creators and independent sellers to easily set up a storefront, sell their digital assets, and process payments without needing to construct a complex infrastructure from scratch.

Designed with a **Service-Oriented Architecture (SOA)**, the ecosystem cleanly separates the customer-facing digital storefront, the creator administration portal, and a robust core backend, ensuring seamless scalability and long-term maintainability.

## 🎯 Project Goals & Solutions

This platform focuses strictly on the complete digital product lifecycle—from **creation → publishing → selling → granting entitlements → distribution → updating → archiving**. It resolves the friction in selling digital goods by providing:

- **Centralized Digital Asset Management:** Effortlessly create, publish, and manage digital products and their versions/updates.
- **Automated Entitlement & Distribution:** Instantly grant usage rights (entitlements) and deliver products to customers upon successful payment verification.
- **Streamlined Storefront Generation:** Beautiful, customizable web storefronts for product showcasing.
- **Comprehensive Analytics & Tracking:** Monitor product launch performance, track revenue, and manage the customer base from a dedicated Creator Portal.
- **Robust Order Processing:** Secure checkout flow, order handling, and robust payment webhooks integrations.

## 👥 Target Audiences

- **Admin:** Manages the entire platform with top-level system permissions.
- **Creator / Seller:** Creates and sells digital products, manages their own customers, storefronts, and products.
- **Customer:** Browses the storefront, securely purchases, and consumes the digital assets.
- **Guest:** Discovers products, reads blogs, and browses the storefront.

## 🚀 Scalability & Future-Proofing

> The system is architected to be highly **modular and extensible**, allowing for the effortless addition of new digital product types, advanced creator/team management, and other business capabilities as real-world demands arise.

## 🏗 System Architecture

The project leverages a **Monorepo** structure, ensuring type safety and shared configuration across the entire ecosystem.

```mermaid
graph TD
    User((Customers / Guests))
    Creator((Creators / Admins))

    subgraph Frontend Applications
        Store[Storefront Web<br/>Next.js]
        CRM[Admin/Creator Portal<br/>React/Vite]
    end
    
    subgraph Shared Packages
        DB_PKG[@repo/database]
        UI_PKG[@repo/ui]
    end

    subgraph Backend Core
        API[Backend Core API<br/>Node.js / Express]
        Queue[Background Jobs<br/>Redis Worker]
    end

    subgraph Databases & Infrastructure
        Postgres[(PostgreSQL<br/>Core DB)]
        RedisCache[(Redis<br/>Cache & Queue)]
    end
    
    subgraph Third-Party Integrations
        Pay[Payment Gateways<br/>Stripe / VNPay]
    end

    User -->|Browse & Purchase| Store
    Creator -->|Manage Products, Lifecycle & Revenue| CRM

    Store -->|REST API| API
    CRM -->|REST API| API
    
    Store -.->|Use| UI_PKG
    CRM -.->|Use| UI_PKG
    API -.->|Use| DB_PKG

    DB_PKG -->|Read/Write Data| Postgres
    API -->|Enqueue Task| RedisCache
    Queue -->|Process Task| RedisCache
    
    API -.->|Verify Webhooks| Pay
```

## 📂 Ecosystem Structure

All applications reside within the `apps/` directory, while shared resources and configurations are managed in `packages/`.

### 1. [Backend Core API (`apps/backend-core`)](./apps/backend-core)
- **Role:** The engine of the platform. It handles business logic, automated digital product distribution & entitlements, secure authentication (RBAC), and payment webhook processing.
- **Tech Stack:** Node.js, Express.js, PostgreSQL, Redis.

### 2. [Storefront Web (`apps/storefront`)](./apps/storefront)
- **Role:** The customer-facing application. Supports multi-tenant routing (subdomains) and is optimized for SEO, speed, and providing a frictionless checkout experience for purchasing digital products.
- **Tech Stack:** Next.js (App Router), React, Tailwind CSS.

### 3. [Creator / Admin Portal (`apps/crm-system`)](./apps/crm-system)
- **Role:** The internal dashboard for creators and admins. Features robust tools to manage the digital product lifecycle (create, update, archive), track orders, view customer data, and analyze post-launch revenue.
- **Tech Stack:** React, Vite, Tailwind CSS, React Query.

### 4. Shared Packages (`packages/`)
- **Role:** Reusable code modules synced via NPM Workspaces to ensure DRY principles.
- **Components:** `@repo/database` (Prisma schema & client), `@repo/ui` (Shared React components), `@repo/theme-engine`, `@repo/types`, `@repo/eslint-config`, and `@repo/tsconfig`.

## ✨ Key Features

- **Lifecycle Management:** Complete control over digital products including creation, versioning/updates, and archiving.
- **Entitlement & Automated Delivery:** Securely grant access and distribute digital assets (files, access keys, links) immediately after successful checkout.
- **Payment Gateway Integrations:** Robust webhook handlers to securely process payments and validate transactions.
- **Enterprise-Grade Backend:** Type-safe database interactions with Prisma ORM and high-concurrency handling.
- **Cloud Infrastructure Ready:** Fully containerized via Docker for easy deployment and CI/CD integration.
- **Modern UI/UX:** Responsive, fast, and accessible frontends built with modern React frameworks and Tailwind CSS.

## 📚 Documentation

For a deep dive into the architecture, deployment instructions, and API references, please review the **[Documentation Folder (`/docs`)](./docs)**.
- [System Architecture](./docs/architecture.md)
- [Deployment Guide](./docs/docker.md)
- [Environment Variables Config](./docs/environment.md)
- [Changelog](./docs/changelog.md)

## 🚀 Getting Started (Docker Compose)

The entire ecosystem is fully containerized. You can spin up the development or production environment with a single command.

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dangtienvn/e-cormmerce-platform.git
   cd creator-commerce-platform
   ```

2. **Environment Setup:**
   Duplicate the `.env.example` files in each application to `.env` and configure your database and third-party credentials.

3. **Spin up the Ecosystem:**
   Start all microservices, databases, and message queues simultaneously:
   ```bash
   docker-compose up -d --build
   ```

4. **Access the Applications:**
   - Storefront Web: `http://localhost:3002`
   - Creator Portal: `http://localhost:3001`
   - Backend API: `http://localhost:5000`

---

## 👨‍💻 Author & Contact

This project is actively developed and maintained as a demonstration of software engineering best practices, monorepo architecture, and modern web development.

- **Author:** Đặng Thanh Tiến (Thanh Tien Dang)
- **Email:** dangthanhtien.dev@gmail.com
- **Phone:** 0363226094
- **LinkedIn:** [Thanh Tien Dang](https://www.linkedin.com/in/thanh-tien-dang/)

---

<div align="center">
  <i>Built with passion and commitment to clean, scalable code.</i>
</div>

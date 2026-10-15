# Cosmetics-E-commerce

Cosmetics E-commerce

A responsive, full-stack e-commerce website for a cosmetics business. The platform enables customers to explore beauty products, view product details, and place orders through a simple and user-friendly shopping experience.

Project Objectives

Establish a professional online presence for the cosmetics brand.

Make products easy to discover and browse.

Provide a straightforward ordering experience.

Create a maintainable foundation for future business growth.

Key Features

Responsive homepage with featured products and categories.

Product catalogue and product detail pages.

Product search and category filtering.

Shopping cart and order submission.

Customer contact and order inquiry options.

Brand information, delivery details, and contact page.

Product and order management, where required.

Technology Stack

Frontend: React.js, TypeScript

Backend: Python, FastAPI

Database: Supabase PostgreSQL

Authentication: Supabase Auth, if required

Storage: Supabase Storage, if required

Containerization: Docker and Docker Compose

Architecture

The React frontend provides the customer interface. FastAPI handles custom business logic and backend endpoints. Supabase provides PostgreSQL database services and other required platform features. Docker supports consistent local development.

Getting Started

Prerequisites

Node.js and npm

Python 3

Docker and Docker Compose

A Supabase project

Environment Configuration

Create environment files based on .env.example.

Frontend environment variables:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Backend environment variables, where needed:

SUPABASE_URL

SUPABASE_SERVICE_ROLE_KEY — server-side only, if elevated access is required.

Never expose service-role keys or other secrets in frontend code or commit them to version control.

Development

Install frontend dependencies:

cd frontend
npm install
npm run dev

Set up the backend virtual environment and install dependencies according to the project's Python configuration. Start FastAPI using the configured application entry point.

To run the containerized application after Docker configuration is complete:

docker compose up --build

Initial Scope

The first release focuses on product discovery and a simple ordering flow. Online payments, advanced inventory management, shipping integrations, and customer accounts will be implemented only if included in the approved requirements.

Quality Assurance

Test responsive layouts, product browsing, cart behavior, order submission, validation, and error handling.

Project Status

In development.

License

To be determined by the project owner.

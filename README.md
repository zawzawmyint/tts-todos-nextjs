# TTS Todos

A modern, feature-rich Todo application built with the latest web technologies including Next.js 16 and React 19.

## Overview

TTS Todos is a streamlined task management application that helps users organize their daily activities. It features a clean, responsive interface and robust authentication, allowing users to securely manage their personal todo lists.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality powered by [Better Auth](https://www.better-auth.com/).
- **Todo Management**: Full CRUD (Create, Read, Update, Delete) operations for todos.
- **Categorization & Prioritization**: Organize todos with categories (e.g., WORK) and priority levels (LOW, MEDIUM, HIGH).
- **Task Status**: Easily mark items as complete or incomplete.
- **Modern UI**: Polished, responsive design using Tailwind CSS and Radix UI primitives.
- **Form Validation**: Robust input handling with Zod and React Hook Form.
- **Notifications**: Instant feedback with toast notifications.
- **User-Centric Design**: All data is scoped to the authenticated user.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI / Shadcn UI
- **Authentication**: Better Auth
- **Forms**: React Hook Form + Zod
- **State Management**: React Context
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Installation

Follow these steps to get the project running locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/zawzawmyint/tts-todos-nextjs.git
   cd tts-todos-nextjs
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**

   Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

4. **Run the development server**

   ```bash
   pnpm run dev
   ```

5. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Host on Vercel

[https://tts-todos-nextjs.vercel.app/](https://tts-todos-nextjs.vercel.app/)

_Note: Please be patient with the initial login - Express backend API is hosted on Render's free tier, so initial API responses might take a few seconds to load due to cold starts._

### Backend todos repository

[https://github.com/zawzawmyint/tts-todos-api](https://github.com/zawzawmyint/tts-todos-api)

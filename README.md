# Bug Tracker

This is a bug tracker project build in Next.js 14.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **ORM:** [Prisma](https://www.prisma.io/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Authentication:** [NextAuth.js](https://authjs.dev/)
- **Form:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Query:** [TanStack Query](https://tanstack.com/query)

## Running Locally

1. Clone the repository

   ```bash
   git clone https://github.com/fy51/bug-tracker.git

   ```

2. Install dependencies using npm

   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Push the database schema

   ```bash
   npx prisma db push
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

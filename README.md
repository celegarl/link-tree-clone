# Link-tree-clone

A Linktree clone featuring a user account system and authentication to showcase social links using React, NextJS, TailwindCSS, & Supabase.

## Features 
- Registration & User Account System for Personalized Pages.
- Email Verification for Secure Access.
- Functional Links to Enhance User Experience.
- Profile Picture to Personalize Your Page.
- 'Log Out' Button for Public View Testing.
- Theme Configuration for a Customized Look.

## About 

I developed this project with specific objectives in mind:
- Leveraging and gaining proficiency with Supabase.
- Creating a project using Next.JS and Tailwind.
- Implementing authentication via Supabase.
- Incorporating image uploading using the [`react-images-uploading`](https://www.npmjs.com/package/react-images-uploading) package.

## Installation 

1. Set up [`Tailwind CSS with Next.js`](https://tailwindcss.com/docs/guides/nextjs).

2. Register on [`Supabase`](https://supabase.com) and create a project.

3. In `.env.local`, configure 'NEXT_PUBLIC_SUPABASE_URL' (project-settings>api>project-url) and 'NEXT_PUBLIC_SUPABASE_ANON_KEY' (project-settings>api>project-api-keys) with values from your Supabase.

4. Install the Supabase JavaScript library:
   ```bash
   npm install @supabase/supabase-js
   ```
5. Create a new table in Supabase

6. Table: links

- Columns:
  - 'title' (varchar)
  - 'url' (varchar)
  - 'user_id' (varchar)
- Disable RLS (for testing)

7. Create an additional new table
  Table: users

- Columns:
  - 'profile_picture_url' (varchar)
  - 'username' (varchar)
- Disable RLS (for testing)

8. Create a 'public1' bucket in storage

Establish a policy for the bucket under 'Other policies under storage.objects'

- Name: 'All access for all users'
- Allowed operation: ALL
- USING and WITH CHECK expression: 'true' for both

9. Update in the file your-component.js

Locate the line:

```bash
router.push("/celegarl");
```

Replace it with your signup username.

## Getting Started

1. Initiate the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

2. Access http://localhost:3000 in your browser for a live demo.

3. Register and verify your email.

4. Log in, add links, and upload a profile picture.

5. Log out to showcase the public page.




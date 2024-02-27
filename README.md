
# Aim of this repository

Visualising whether refactoring a button containing client logic (i.e. `<button onClick={submitData}>Submit</button>`) into server componet and client component (indicated by the `use client` directive) provides significant performance gains.

# Approach

Two branches are created for comparison: 


 | (a) Only Client Component (`[/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main)` branch) | (b) Client & Server Component (`[feat/server_and_client_component](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/feat/server_and_client_component)` branch) |
|-----------------------|---------------------------|
|using only client component to render the button and its children  ![CleanShot 2024-02-28 at 01 32 21](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/3b5ef108-4553-4b60-a7cb-54e1c4ece290) | using client component to render the button tag, and server component to render its children ![CleanShot 2024-02-28 at 01 32 44](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/5502274f-9e08-4415-bec0-1c7fc56be114)|


# Visualising and comparing builds

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Navigate to the branch of your choice: (a) `/main` for (b) `feat/server_and_client_component`. (a) uses only the client component, while (b) uses a mix of client and server components and run 

```bash
npm run build
```
to see the file sizes. 


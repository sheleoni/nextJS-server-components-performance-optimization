
# Aim of this repository

Visualising whether refactoring a button containing client logic (i.e. `<button onClick={submitData}>Submit</button>`) into server componet and client component (indicated by the `use client` directive) provides significant performance gains.

# Why


# Visualising and comparing builds

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Navigate to the branch of your choice: (a) `/main` for (b) `feat/server_and_client_component`. (a) uses only the client component, while (b) uses a mix of client and server components and run 

```bash
npm run build
```
to see the file sizes. 

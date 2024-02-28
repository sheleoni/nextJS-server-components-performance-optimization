
# Aim of this repository

Visualising whether refactoring a button containing client logic (i.e. `<button onClick={submitData}>Submit</button>`) into server componet and client component (indicated by the `use client` directive) provides significant performance gains.

# Approach

Two branches are created for comparison: 

(a) Client component renders the entire button: [/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main)

(b) Render `<button onCLick={postData}>` on a client component and its children in a server component: [feat/server_and_client_component](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/feat/server_and_client_component), [code difference from (a)](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/1/files)

Both branches render a button that contains two `<Images>` and some text. Upon click, it will POST data to a dummy API.

![CleanShot 2024-02-28 at 01 55 05](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/57150e2d-e4e2-4c97-a7f1-4be0a357cca3)


Navigate to each branch and run

```bash
npm run build
```
to compare results.

# Results

## When two `<Image />`s are rendered within the `<button>` tags
| (a) Only Client Component ([/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main))| (b) Client & Server Component ([feat/server_and_client_component](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/feat/server_and_client_component)) |
|-----------------------|---------------------------|
|using only client component to render the button and its children  ![CleanShot 2024-02-28 at 01 32 21](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/3b5ef108-4553-4b60-a7cb-54e1c4ece290) | using client component to render the button tag, and server component to render its children ![CleanShot 2024-02-28 at 01 32 44](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/5502274f-9e08-4415-bec0-1c7fc56be114)|

## When there is no `<Images />` tag rendered within the `<button>` tags
// tbc

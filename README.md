<sup>Read the [Japanese](README_JP.md) version here. 日本語版は[こちら](README_JP.md)です。</sup>
# Aim of this repository

Visualising whether refactoring a button containing client logic (i.e. `<button onClick={submitData}>Submit</button>`) into server componet and client component (indicated by the `use client` directive) provides significant performance gains.

# Approach

Four branches are created for comparison: 

(a) Client component renders the entire button WITH the images: [/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main)
<details>
  <summary>Code
</summary>
  
```jsx
// /page.js
'use client'
import styles from "./page.module.css";
import UnicornImage from "./Uni-code_Unicorn_.png";
import UnicornInTheSunImage from "./Unicorn_In_The_Sun.png";
import Image from "next/image";
const postSomeData = async () => {
    const res = await fetch('/api/sendData/', {method: 'POST'});
    window.alert("Data posted!")
}

export default function Home() {
  return (
    <main className={styles.main}>
        <button onClick={postSomeData}>
            <Image src={UnicornImage} alt={"Image of a unicorn typing on a laptop."} width={150} height={150} />
            <p>
                <Image src={UnicornInTheSunImage} alt={"Image of a unicorn at the beach."} width={300} height={300} />
            </p>
            <p>
                Submit (POST data)
            </p>
        </button>
    </main>
  );
}

```
</details>


(b) Render `<button onClick={postData}>` on a client component and its children in a server component WITH the images: ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/1))
<details>
 <summary>
  Code
 </summary>
 
 ```jsx
 // page.js (server component)
 import styles from "./page.module.css";
import UnicornImage from "./Uni-code_Unicorn_.png";
import UnicornInTheSunImage from "./Unicorn_In_The_Sun.png";
import Image from "next/image";
import {ButtonContainer} from "@/app/components/ButtonContainer";


export default function Home() {
  return (
    <main className={styles.main}>
        <ButtonContainer>
            <Image src={UnicornImage} alt={"Image of a unicorn typing on a laptop."} width={150} height={150}/>
            <p>
                <Image src={UnicornInTheSunImage} alt={"Image of a unicorn at the beach."} width={300} height={300}/>
            </p>
            <p>
                Submit (POST data)
            </p>
        </ButtonContainer>
    </main>
  );
} 
 ```

```jsx
// ButtonContainer.jsx (Client component)
'use client'

export function ButtonContainer ({ children }) {

    const postSomeData = async () => {
        const res = await fetch('/api/sendData/', {method: 'POST'});
        window.alert("Data posted!")
    }

    return (
        <button onClick={postSomeData}>
            {children}
        </button>
    )

}
```
</details>

(c) Client component renders the entire button WITHOUT the images: ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/2))

<details>
 <summary>
  Code
 </summary>

```jsx
// /page.js (client component)
'use client'
import styles from "./page.module.css";
const postSomeData = async () => {
    const res = await fetch('/api/sendData/', {method: 'POST'});
    window.alert("Data posted!")
}

export default function Home() {
  return (
    <main className={styles.main}>
        <button onClick={postSomeData}>
            <p>
                Submit (POST data)
            </p>
        </button>
    </main>
  );
}
```
 
</details>

(d) Render `<button onCLick={postData}>` on a client component and its children in a server component WITHOUT the images: ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/3))

<details>
 <summary>
  Code
 </summary>

```jsx
// page.js (server component)
import styles from "./page.module.css";
import {ButtonContainer} from "@/app/components/ButtonContainer";


export default function Home() {
  return (
    <main className={styles.main}>
        <ButtonContainer>
            <p>
                Submit (POST data)
            </p>
        </ButtonContainer>
    </main>
  );
}
```

```jsx
// ButtonContainer.jsx (client component)
'use client'

export function ButtonContainer ({ children }) {

    const postSomeData = async () => {
        const res = await fetch('/api/sendData/', {method: 'POST'});
        window.alert("Data posted!")
    }

    return (
        <button onClick={postSomeData}>
            {children}
        </button>
    )

}
```
</details>

<p>Navigate to each branch and run</p>

```bash
npm run build
```
to compare results.

# Results

We are testing two scenarios: 
| Case (i) <br /> Two `<Image />`s are rendered within the `<button>` tags | Case (ii) <br /> No `<Images />` tag rendered within the `<button>` tags |
| ------ | ----- |
| <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/57150e2d-e4e2-4c97-a7f1-4be0a357cca3" height="400"> | <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/591f7d21-a360-480c-bfd2-15f57e0e345a" width="400"> |

### (i) When two `<Image />`s are rendered within the `<button>` tags
| (a) Only Client Component ([/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main))| (b) Client & Server Component ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/1)) |
|-----------------------|---------------------------|
|using only client component to render the button and its children ![CleanShot 2024-02-28 at 01 32 21](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/3b5ef108-4553-4b60-a7cb-54e1c4ece290) Size: 6.3 kB, First Load JS: 90.5 kB | using client component to render the button tag, and server component to render its children ![CleanShot 2024-02-28 at 01 32 44](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/5502274f-9e08-4415-bec0-1c7fc56be114) Size: 6.09 kB, First Load JS: 90.3 kB |

### (ii) When there are no `<Image />` tags rendered within the `<button>` tags

Alternatively, if we simply render a button without the `<Image />`s, the First Load JS becomes almost the same..
 
| (c) Only Client Component ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/2)) | (d) Client & Server Component ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/3)) |
|------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
|<img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/08ce9d73-3248-4f40-a479-1f8321928bbd"> Size: 401 B, First Load JS: 84.6 kB| <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/aa1bee1a-3df2-4259-be6d-bda85aa2e6c3"> Size: 377 B, First Load JS: 84.6 kB|

# Conclusion

Unless the `<button>` contains a lot of markup, rendering the entire button in a client component doesn't produce much difference in performance.
![RSC Optimisation](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/2d1e4b1e-9a9a-44d7-ba3e-cf1c6db7bc4e)

## Alternative: Handling POST logic on the server

Is there a way to handle the POST logic on solely with a server component then? It seems like [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) may offer a way to POST data on server components.  However, if we are POSTing to a third-party API, this may not apply - we probably still have to POST data from the client component, in which case this repository may serve as a reference in deciding whether rendering button content in a server component is necessary.  


## Credits

This stemmed from a discussion from with Josh and Bonnie on [Joy Of React's](https://www.joyofreact.com/) discord channel. Thank you [Josh](https://twitter.com/JoshWComeau) and [Bonnie](https://bonnie.dev/) for helping me understand this topic in more depth. ✨

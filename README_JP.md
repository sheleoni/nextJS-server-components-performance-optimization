
# 目的

POST送信できるボタン(例: `<button onClick={submitData}>Submit</button>`) をサーバ・コンポネントとクライアント・コンポネント(`'use client'`ディレクティブで示される)にリファクタリングすることで、パフォーマンスが大幅に向上するかどうかを可視化する。

# アプローチ

パフォーマンスを比較するため、以下のブランチを作成した：

(a) クライアント・コンポーネントは、画像とともにボタン全体をレンダリングする（[/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main)）

<details>
  <summary>コード
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

(b) `<button onCLick={postData}>`をクライアント・コンポーネントでレンダリングし、その子コンポーネントをサーバー・コンポーネントで画像とともにレンダリングする ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/1))

<details>
 <summary>
  コード
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

(c) クライアント・コンポーネントは画像なしでボタン全体をレンダリングする: ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/2))


<details>
 <summary>
  コード
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


(d) `<button onCLick={postData}>`をクライアント・コンポーネントに、その子コンポーネントをサーバー・コンポーネントに、画像なしでレンダリングする: ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/3))

<details>
 <summary>
  コード
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


<p>各ブランチに移動し、

```bash
npm run build
```
を実行して各自のファイルサイズを比較する。

# 結果

以下のシナリオを実装してみました：

| (i) <br /> `<button>` タグ内に `<Image />` が2つレンダリングされる場合                                                                                                       | (ii) <br /> `<button>` タグ内に `<Images />` タグがレンダリングされない場合                                                                                                   |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/57150e2d-e4e2-4c97-a7f1-4be0a357cca3" height="400"> | <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/591f7d21-a360-480c-bfd2-15f57e0e345a" width="400"> |


### (i) `<button>` タグ内に2つの `<Image />` がレンダリングされる場合
| (a) クライアント・コンポーネントのみ（[/main](https://github.com/sheleoni/nextJS-server-components-performance-optimization/tree/main)）                                                                                                                            | (b) クライアントとサーバー・コンポーネントを併用 ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/1)) |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| ボタンとそのchildrenのレンダリングにクライアント・コンポーネントだけを使う場合 ![CleanShot 2024-02-28 at 01 32 21](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/3b5ef108-4553-4b60-a7cb-54e1c4ece290) Size: 6.3 kB, First Load JS: 90.5 kB | クライアント・コンポーネントを使用してボタン・タグをレンダリングし、サーバー・コンポーネントを使用してそのchildrenをレンダリングする ![CleanShot 2024-02-28 at 01 32 44](https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/5502274f-9e08-4415-bec0-1c7fc56be114) Size: 6.09 kB, First Load JS: 90.3 kB |

### (ii) `<button>` タグ内に `<Images />` タグがない場合

また、`<Image />`を使わずに単純にボタンをレンダリングすると、First Load JSはほとんど同じになります。

| (c) クライアント・コンポーネントのみ ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/2))                                                                  | (d) クライアントとサーバー・コンポーネントを併用 ([PR](https://github.com/sheleoni/nextJS-server-components-performance-optimization/pull/3))                                                            |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/08ce9d73-3248-4f40-a479-1f8321928bbd"> Size: 401 B, First Load JS: 84.6 kB | <img src="https://github.com/sheleoni/nextJS-server-components-performance-optimization/assets/85994674/aa1bee1a-3df2-4259-be6d-bda85aa2e6c3"> Size: 377 B, First Load JS: 84.6 kB |

# 結論

`<button>`に多くのマークアップが含まれていない限り、ボタン全体をクライアントコンポーネントでレンダリングしても、パフォーマンスに大きな違いは生じません。

## サーバ・コンポーネントでデータをPOSTする

では、サーバーコンポーネントだけでPOSTロジックを処理する方法はあるのでしょうか？[Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)は、サーバーコンポーネント上でデータをPOSTする方法を提供しているようです。 しかし、サードパーティのAPIにPOSTするのであれば、これは適用されないかもしれません。おそらく、クライアント・コンポーネントからデータをPOSTしなければならないでしょう。

## 参考

本リポジトリは[Joy Of React](https://www.joyofreact.com/)のdiscordチャンネルで[Josh](https://twitter.com/JoshWComeau)さん（Joy Of Reactの作成者）と[Bonnie](https://bonnie.dev/)さんと議論したことがきっかけです。このトピックについてのより深い理解を助けていただいております。

'use client'
import styles from "./page.module.css";
const postSomeData = async () => {
    const res = await fetch('/api/sendData/', {method: 'POST'});
    // { method: 'POST'} is needed. Would error if not included.
    console.log(res, 'POST results')
}

export default function Home() {
  return (
    <main className={styles.main}>
        <button onClick={postSomeData}>
            POST some data
        </button>
    </main>
  );
}

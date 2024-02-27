'use client'
import styles from "./page.module.css";
const postSomeData = async () => {
    const res = await fetch('/api/sendData/', {method: 'POST'});
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

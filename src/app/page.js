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

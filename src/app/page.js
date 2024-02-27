'use client'
import styles from "./page.module.css";
import UnicornImage from "./Uni-code_Unicorn_.png"
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
                Submit (POST data)
            </p>
        </button>
    </main>
  );
}

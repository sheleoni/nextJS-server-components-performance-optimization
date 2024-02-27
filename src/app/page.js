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

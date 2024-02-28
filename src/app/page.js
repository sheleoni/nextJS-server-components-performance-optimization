import styles from "./page.module.css";
import UnicornImage from "./Uni-code_Unicorn_.png";
import UnicornInTheSunImage from "./Unicorn_In_The_Sun.png";
import Image from "next/image";
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

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

import styles from "./page.module.css";
import UnicornImage from "./Uni-code_Unicorn_.png"
import Image from "next/image";
import {ButtonContainer} from "@/app/components/ButtonContainer";


export default function Home() {
  return (
    <main className={styles.main}>
        <ButtonContainer>
            <Image src={UnicornImage} alt={"Image of a unicorn typing on a laptop."} width={150} height={150} />
            <p>
                Submit (POST data)
            </p>
        </ButtonContainer>
    </main>
  );
}

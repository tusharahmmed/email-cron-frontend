import styles from "@/styles/ui/footer.module.scss";
import Image from "next/image";
import linkedin from "@/assets/icons/linkedin.svg";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import instagram from "@/assets/icons/instagram.svg";
import tiktok from "@/assets/icons/tiktok.svg";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={styles.copyWright}>
        <p>Copyright© 4U Inc. 2023</p>
        <span>hey@4U.net</span>
      </div>
      <div className={styles.icons}>
        <div>
          <a href="">
            <Image src={linkedin} height={24} width={24} alt="linkedin" />
          </a>
          <a href="">
            <Image src={facebook} height={24} width={24} alt="facebook" />
          </a>
          <a href="">
            <Image src={twitter} height={24} width={24} alt="twitter" />
          </a>
          <a href="">
            <Image src={instagram} height={24} width={24} alt="instagram" />
          </a>
          <a href="">
            <Image src={tiktok} height={24} width={24} alt="tiktok" />
          </a>
        </div>
        <div>
          <a href="">Cookies</a>
          <a href="">Terms of Use</a>
          <a href="">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

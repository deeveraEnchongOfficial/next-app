import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2023 up_next. All rights reserved.</div>
      <div className={styles.social}>
        <Image src="/1.png" width={15} height={15} className={styles.icon} alt="UP_NEXT Facebook Account" />
        <Image src="/2.png" width={15} height={15} className={styles.icon} alt="UP_NEXT" />
        <Image src="/3.png" width={15} height={15} className={styles.icon} alt="UP_NEXT" />
        <Image src="/4.png" width={15} height={15} className={styles.icon} alt="UP_NEXT" />
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={100} height={100} />
      </Link>
      <div className={styles.menus}>
        <Link href="/short-links">
          <div className={styles.menu}>주소 줄이기</div>
        </Link>
        <Link href="/qrcodes">
          <div className={styles.menu}>qr코드 생성</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;

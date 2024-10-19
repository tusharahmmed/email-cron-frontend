import React, {useEffect, useState} from "react";
import styles from "@/styles/ui/navbar.module.scss";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import Link from "next/link";
import {isLoggedIn} from "@/services/auth.service";
import {Drawer, Space, Button} from "antd";
import {useRouter} from "next/router";

const Navbar = () => {
  const [hasUser, setHasUser] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = isLoggedIn();
    setHasUser(isUserLoggedIn);
  }, [hasUser]);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={`${styles.headerWrap} section_padding`}>
          <div className="logo">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                // layout="responsive"
                height={32}
                width={164}
              />
            </Link>
          </div>
          <div className={styles.nav}>
            <button onClick={() => setOpen(true)}>Menu</button>
            <ul>
              <li>
                <Link
                  className={router.pathname == "/work-with-us" ? "active" : ""}
                  href="work-with-us">
                  About us
                </Link>
              </li>
              <li>
                <Link
                  className={router.pathname == "/for-drivers" ? "active" : ""}
                  href="for-drivers">
                  For drivers
                </Link>
              </li>
              {/* <li>
            <a href="">Fleet</a>
          </li> */}
              <li>
                <Link
                  className={
                    router.pathname == "/request-a-quote" ? "active" : ""
                  }
                  href="request-a-quote">
                  Request a quote
                </Link>
              </li>
              <li>
                <Link
                  className={router.pathname == "/contact-us" ? "active" : ""}
                  href="contact-us">
                  Contact-us
                </Link>
              </li>
            </ul>
            <div className={styles.action}>
              {hasUser ? (
                <Link href="profile">
                  <button>Dashboard</button>
                </Link>
              ) : (
                <Link href="login">
                  <button>Login</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
      <Drawer
        classNames={{
          mask: styles.drawerMask,
          content: styles.drawerContent,
          header: styles.drawerHeader,
          body: styles.drawerBody,
        }}
        placement={"right"}
        width={320}
        onClose={onClose}
        open={open}
        extra={
          <Image
            src={logo}
            alt="logo"
            // layout="responsive"
            height={32}
            width={164}
          />
        }>
        <Space>
          <ul>
            <li>
              <Link
                className={router.pathname == "/" ? "active" : ""}
                onClick={() => setOpen(false)}
                href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname == "/work-with-us" ? "active" : ""}
                onClick={() => setOpen(false)}
                href="work-with-us">
                About us
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname == "/for-drivers" ? "active" : ""}
                onClick={() => setOpen(false)}
                href="for-drivers">
                For drivers
              </Link>
            </li>
            <li>
              <Link
                className={
                  router.pathname == "/request-a-quote" ? "active" : ""
                }
                onClick={() => setOpen(false)}
                href="request-a-quote">
                Request a quote
              </Link>
            </li>
            <li>
              <Link
                className={router.pathname == "/contact-us" ? "active" : ""}
                onClick={() => setOpen(false)}
                href="contact-us">
                Contact-us
              </Link>
            </li>
            <li>
              <div className={styles.action}>
                {hasUser ? (
                  <Link href="profile">
                    <button>Dashboard</button>
                  </Link>
                ) : (
                  <Link href="login">
                    <button>Login</button>
                  </Link>
                )}
              </div>
            </li>
          </ul>
        </Space>
      </Drawer>
    </>
  );
};

export default Navbar;

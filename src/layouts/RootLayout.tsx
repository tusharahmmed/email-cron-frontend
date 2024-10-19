import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import React from "react";

interface ILayout {
  children: React.ReactElement;
}

const RootLayout = ({children}: ILayout) => {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default RootLayout;

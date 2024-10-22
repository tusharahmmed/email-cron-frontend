"use client";
import RootLayout from "@/layouts/RootLayout";

import {useRouter} from "next/router";
import React, {useEffect} from "react";

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin");
  }, []);
};

export default HomePage;

HomePage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

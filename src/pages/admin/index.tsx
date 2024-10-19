import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const DashboardPage = () => {
  return <div>Wellcome to dashboard</div>;
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

import RootLayout from "@/layouts/RootLayout";

export default function Home() {
  return <>Homepage</>;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

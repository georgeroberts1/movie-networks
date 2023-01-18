import styles from "../styles/index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Header from "../components/organisms/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Movie Networks</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header headerContent={""} boldHeaderContent={"Home"} href={"/"} />
    </>
  );
};

export default Home;

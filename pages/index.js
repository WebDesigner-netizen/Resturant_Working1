import axios from "axios";
import Head from 'next/head'
import Image from 'next/image'
import { useState } from "react";
import { Inter } from 'next/font/google'
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from '@/components/Featured'
import PizzaList from '@/components/PizzaList'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in New York</title>
        <meta name="description" content="Best Pizza Shop In Town" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList = {pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      admin,
    },
  };
};
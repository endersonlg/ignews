import {GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'
import {SubcribeButton} from '../components/SubscribeButton'

import avatar from '../../public/images/avatar.svg'
import { stripe } from '../services/stripe'

interface HomeProps {
  product:{
    priceId:string,
    amount:string
  }
}


export default function Home({product}:HomeProps) {
  console.log(typeof product.amount)
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
        <SubcribeButton priceId={product.priceId}/>
        </section>
        <Image src={avatar} alt="Girl coding"/>;
      </main>
    </>
  );
}


export const getStaticProps:GetStaticProps = async()=>{
  const price = await stripe.prices.retrieve('price_1JNTeCBQuz6Ak0ozqtHHjLmk')

  const product = {
    priceId:price.id,
    amount: new Intl.NumberFormat('en-US',{
      style:'currency',
      currency: 'USD'
    }).format(price.unit_amount /100)
  }

  return {
    props:{
      product
    },
    revalidate:60*60*24 //24 hours
  }
}
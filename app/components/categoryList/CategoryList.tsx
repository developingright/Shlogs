import React from 'react'
import styles from './categoryList.module.css';
import Image from 'next/image';
import Link from 'next/link';

const getData = async () =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`,{
    cache:"no-store",
  });

  if(!res.ok){
    throw new Error("failed") 
  }

  return res.json();
}; 


const Category = async () => {

  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
          {data?.map((item: any) =>(
            <Link href={`/blog?cat=${item.slug}`} className={`${styles.category} ${styles[item.slug]}` } key={item.id}>
              <Image src={item.img} alt='' width={32} height={32} className={styles.image}/>
              {item.title}
            </Link>
          )) }
      </div>
    </div>
  )
}

export default Category

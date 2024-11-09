import styles from './featured.module.css';
import Image from 'next/image'
const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>Hey, Welcome to Shlogs</b>, write your blogs and share your content at ease.</h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image}/>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Lorem ipsum dolor, sit amet </h1>
          <p className={styles.postDec}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, laboriosam ipsum aut quod consequatur ut </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  )
}

export default Featured
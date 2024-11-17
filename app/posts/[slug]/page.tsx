import Comments from '../..//components/comments/Comments'
import Menu from '../../components/Menu/Menu'
import styles from './singlePage.module.css'
import Image from 'next/image'
const getData = async (slug : String) =>{
    try{
  
      const res = await fetch(`https://shlogs.vercel.app/api/posts/${slug}`,{
        cache:"no-store",
      });
      
      if(!res.ok){
        throw new Error("failed") 
      }
      
      return res.json();
    }catch(error){
      return {posts:[],count:0};
    }
  }; 
const SinglePage = async ({params} :{params: any}) => { 
    const data = await getData(params.slug);
  return (
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.user}>
                    {data?.user?.image && (<div className={styles.userImageContainer}>
                        <Image src={data.user.image} alt="" fill className={styles.avatar}/>
                    </div>)}
                    <div className={styles.userTextContainer}>
                        <span className={styles.username}>{data?.user.username}</span>
                        <span className={styles.date}>01.01.2024</span>
                    </div>
                </div>
            </div>
            {data?.img && (
                <div className={styles.imageContainer}>
                    <Image src={data.img} alt="" fill className={styles.image}/>
                </div>
            )}
        </div>
        <div className={styles.content}>
            <div className={styles.post}>
                <div className={styles.desc} dangerouslySetInnerHTML={{__html: data?.desc}}/>
                <div className={styles.comment}>
                    <Comments postSlug={params.slug}/>
                </div>
            </div>
            <Menu/>
        </div>
    </div>
  )
}

export default SinglePage

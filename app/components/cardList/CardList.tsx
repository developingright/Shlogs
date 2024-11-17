import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
//ts-ignore 
const getData = async (page:Number,cat:String) =>{
  try{

    const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,{
      cache:"no-store",
    });
    
    if(!res.ok){
      throw new Error("failed") 
    }
    
    return res.json();
  }catch(error){
    console.log(error);
    return {posts:[],count:0};
  }
}; 

const CardList = async ({page, cat}: {page: number, cat: string}) => {
  const {posts,count} = await getData(page,cat);
  const POST_PER_PAGE = 2;
  
  const hasPrev  = (POST_PER_PAGE * (page-1)) > 0;
  console.log(hasPrev);
  const hasNext = POST_PER_PAGE * (page-1) + POST_PER_PAGE < count;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item :any)=>(
          <Card key={item._id || item.slug} item={item} />
        ))}
      </div>
      <Pagination page={page} hasNext={hasNext} hasPrev={hasPrev}/>
    </div>
  )
}

export default CardList

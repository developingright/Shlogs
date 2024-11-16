import Image from "next/image";
import Link from "next/link";
import styles from './home.module.css';   
import Featured from './components/featured/Featured';
import CategoryList from './components/categoryList/CategoryList';
import CardList from './components/cardList/CardList';
import Menu from "./components/Menu/Menu";

interface SearchParams {
  page?: string;
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const page = parseInt(searchParams?.page || "1");
  return (
    <div className={styles.container}>
      <Featured/>
      <CategoryList/>
      <div className={styles.content}>
        <CardList page={page}/>
        <Menu/>
      </div>
    </div>
  );
}

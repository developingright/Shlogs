"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";

const fetcher = async (url: string | URL | Request) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

const Comments = ({ postSlug } : {postSlug:any}) => {
  const { status } = useSession();
  const { data, mutate,isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate();
    setDesc("");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment.. "
            className={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className={styles.button} onClick={handleSubmit}>Send</button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      {isLoading
        ? "loading.."
        : data?.map((item: any) => (
            <div className={styles.comments} key={item.id}>
              <div className={styles.comment}>
                <div className={styles.user}>
                  {item.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.iamge}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>{item.createdAt}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;

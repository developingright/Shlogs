"use client"
import { useRouter } from 'next/navigation';
import styles from './loginPage.module.css'
import { signIn,useSession } from "next-auth/react";
import { useEffect } from 'react';
const LoginPage = () => {
    const { data: session,status } = useSession();

    const router = useRouter();
    useEffect(() => {
        if (status === "authenticated") {
          router.push("/");
        }
      }, [status, router]);
    
      if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <button type="button" onClick={()=>signIn("google")} className={styles.socialButton}>
                Sign in with Google
            </button>
            <div className={styles.socialButton}>
                Sign in with Github
            </div>
            <div className={styles.socialButton}>
                Sign in with Facebook
            </div>
        </div>
    </div>
  )
}

export default LoginPage

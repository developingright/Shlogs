"use client";
import { use, useState } from "react";
import styles from "./write.module.css";
import Image from "next/image";

// Dynamically import ReactQuill without SSR
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "../uploadthing";
const WritePage = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [title, setTitle] = useState(""); 
  const [catSlug, setCatSlug] = useState("style");
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const { startUpload } = useUploadThing("videoAndImage", {
    onBeforeUploadBegin: (files) => {
      // console.log("Uploading", files.length, "files");
      return files;
    },
    onUploadBegin: (name) => {
      // console.log("Beginning upload of", name);
    },
    onClientUploadComplete: (res) => {
      // console.log("Upload Completed.", res.length, "files uploaded");
      setFileUrl(res[0].url);
    },
    onUploadProgress(p) {
      // console.log("onUploadProgress", p);
    },
  });

  const slugify = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  const handleSubmit = async () => {  
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {  
        method: "POST",
        body: JSON.stringify({ title: title,desc: value, img: fileUrl , slug: slugify(title),catSlug: catSlug}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    }catch(error){
      console.log(error);
    }finally{
      router.push("/posts/"+slugify(title));
    }
   
  }

  return (<>{
    status === "loading" ? (
      <div>Loading...</div>
    ) : (
    <div className={styles.container}>
      <input type="text" placeholder="Title" className={styles.input} onChange={(e)=> setTitle(e.target.value)}/>
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
          <option value="style">style</option>
          <option value="fashion">fashion</option>
          <option value="food">food</option>
          <option value="culture">culture</option>
          <option value="travel">travel</option>
          <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
              <input type="file" onChange={async (e) => {const files = Array.from(e.target.files ?? []);await startUpload(files);}} 
                id="image"
                style={{ display: "none" }}
              />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story"
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
    )}
    </>
  );
};

export default WritePage;

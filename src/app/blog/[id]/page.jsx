"use client";
import React from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const BlogPost = ({ params }) => {
  const { data: session } = useSession(); // Use useSession hook here
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    session ? `/api/posts/${params?.id}` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingContainer}>
          <div className={styles.wrapper}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.shadow}></div>
            <div className={styles.shadow}></div>
            <div className={styles.shadow}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    // Redirect to login page if user is not authenticated
    router.push("/login");
  }

  if (error) {
    // Handle fetch error
    console.error("Failed to fetch blog post:", error);
    return <div>Error loading blog post. Please try again later.</div>;
  }

  return (
    <div className={styles.container}>
      {data ? (
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.desc}>{data.desc}</p>
            <div className={styles.author}>
              <img
                src={data.img}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className={styles.avatar}
              />
              <span className={styles.username}>{data.username}</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={data.img} alt="" style={{ width: '100%', height: '100%' }} fill={true} className={styles.image} />
          </div>
        </div>
      ) : (
        <div>Loading blog post...</div>
      )}
      {data && (
        <div className={styles.content}>
          <p className={styles.text}>{data.content}</p>
        </div>
      )}
    </div>
  );
};

export default BlogPost;

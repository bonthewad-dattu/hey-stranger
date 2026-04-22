import React, { useEffect, useState } from 'react';
import { getMyPosts } from '../services/posts';
import styles from './Dashboard.module.css';

const Articles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyPosts();
        setPosts(res?.data || []);
      } catch (err) {
        console.error("Articles error:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div>Loading articles...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>My Articles</h2>

        {posts?.map((p) => (
          <div key={p._id}>
            <p>{p?.text}</p>
          </div>
        ))}

        {posts?.length === 0 && <p>No articles yet</p>}
      </div>
    </div>
  );
};

export default Articles;
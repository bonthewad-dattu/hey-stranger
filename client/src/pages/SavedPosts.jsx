import React, { useEffect, useState } from 'react';
import { getSavedPosts, unsavePost } from '../services/saved';
import styles from './Dashboard.module.css';

const SavedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSavedPosts();
        setPosts(res?.data || []);
      } catch (err) {
        console.error("Saved error:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleUnsave = async (id) => {
    try {
      await unsavePost(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Unsave error:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>Saved Posts</h2>

        {posts?.map((p) => (
          <div key={p._id}>
            <p>{p?.text}</p>
            <button onClick={() => handleUnsave(p._id)}>Unsave</button>
          </div>
        ))}

        {posts?.length === 0 && <p>No saved posts</p>}
      </div>
    </div>
  );
};

export default SavedPosts;
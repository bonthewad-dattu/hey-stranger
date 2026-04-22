import React, { useEffect, useMemo, useState } from 'react';
import { getMyMemories } from '../services/memories';
import { createPost } from '../services/posts';
import { deletePost } from '../services/postActions';
import { useToast } from '../components/ToastContext.jsx';
import styles from './Dashboard.module.css';

const Memories = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { showToast } = useToast?.() || { showToast: () => {} };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMyMemories();
        setPosts(res?.data || []);
      } catch (err) {
        console.error("Memories error:", err);
        setPosts([]);
        showToast("Failed to load memories", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const now = Date.now();
    const isStoryType = (p) => ['Image', 'Video', 'Profile Picture'].includes(p?.type);
    const isOlderThan24h = (p) => new Date(p?.createdAt).getTime() <= now - 24 * 60 * 60 * 1000;
    const isOlderThan30d = (p) => new Date(p?.createdAt).getTime() <= now - 30 * 24 * 60 * 60 * 1000;

    if (filter === 'stories') {
      return posts.filter((p) => isStoryType(p) && isOlderThan24h(p));
    }
    if (filter === 'older') {
      return posts.filter((p) => isOlderThan30d(p));
    }
    return posts;
  }, [posts, filter]);

  const isVideoUrl = (url) => {
    if (!url) return false;
    return url.startsWith('data:video') || /(mp4|webm|ogg)$/i.test(url);
  };

  if (loading) return <div>Loading your memories...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.feedColumn}>
        <div className={styles.card}>
          <span className={styles.cardTitle}>Memories</span>

          {filtered?.map((p) => (
            <div key={p._id} className={styles.updateItem}>
              <div className={styles.updateBody}>
                <strong>You</strong> shared a {p?.type?.toLowerCase()} post

                {p?.text && <div>{p.text}</div>}

                {p?.mediaUrl && (
                  isVideoUrl(p.mediaUrl)
                    ? <video src={p.mediaUrl} muted />
                    : <img src={p.mediaUrl} alt="media" />
                )}
              </div>
            </div>
          ))}

          {filtered?.length === 0 && (
            <div>No memories yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Memories;
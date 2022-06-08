import { useEffect, useRef, useState } from 'react';

import { useQuery } from 'react-query';
import { fetchData } from 'service/imageDataApi';

import styles from './styles.module.scss';

function List() {
  const [imageData, setImageData] = useState<Photo[]>([]);
  const [page, setPage] = useState(0);
  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const observeTargetRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading } = useQuery(
    ['images', page],
    () => fetchData({ page, per_page: 30 }),
    {
      staleTime: Infinity,
      refetchOnWindowFocus: true,
    }
  );

  console.log(imageData);

  useEffect(() => {
    if (!data) return;
    setImageData((prev) => [...prev, ...data.photos]);
  }, [data]);

  useEffect(() => {
    const options = {
      root: imageBoxRef.current,
      rootMargin: '0px',
      threshold: 0.3,
    };
    const observer = new IntersectionObserver(([entry]) => {
      const target = entry;
      if (target.isIntersecting && !isLoading) {
        setPage((prev) => prev + 1);
      }
    }, options);
    if (observeTargetRef?.current) observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [data, isLoading]);

  const imageList = imageData.map((content, idx) => {
    const key = `content-${idx + 1}`;
    return (
      <li key={key} className={styles.imageItem}>
        <button className={styles.imageButton} type="button">
          <figure>
            <img
              className={styles.image}
              src={`${content.src.tiny}`}
              alt={`${content.alt}`}
            />
            <figcaption>{content.alt}</figcaption>
          </figure>
        </button>
      </li>
    );
  });

  return (
    <section className={styles.listSection} ref={imageBoxRef}>
      <ul className={styles.listBox}>
        {imageList}
        <div className={styles.observeTarget} ref={observeTargetRef}>
          loading
        </div>
      </ul>
    </section>
  );
}

export default List;

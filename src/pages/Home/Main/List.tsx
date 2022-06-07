import { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import { fetchData } from 'service/imageDataApi';

import styles from './styles.module.scss';

function List() {
  const [imageData, setImageData] = useState<Photo[]>([]);

  console.log(imageData);

  const { data, isLoading } = useQuery(['images'], () => fetchData(), {
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (!data) return;
    setImageData((prev) => [...prev, ...data.photos]);
  }, [data]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

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
    <section className={styles.listSection}>
      <ul className={styles.listBox}>{imageList}</ul>
    </section>
  );
}

export default List;

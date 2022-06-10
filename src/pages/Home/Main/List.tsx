import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterState, imageDataRes, pageState, searchResult } from 'store/atom';

import { fetchData } from 'service/imageDataApi';

import styles from './styles.module.scss';

function List() {
  const [imageData, setImageData] = useRecoilState(imageDataRes);
  const searchValue = useRecoilValue(searchResult);
  const isFiltering = useRecoilValue(filterState);
  const [page, setPage] = useRecoilState(pageState);

  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const observeTargetRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const getImageData = async () => {
      const data = await fetchData({ page, per_page: 30 });
      setImageData((prev) => [...prev, ...data.photos]);
    };
    getImageData();
  }, [page, setImageData]);

  useEffect(() => {
    const options = {
      root: imageBoxRef.current,
      rootMargin: '0px 0px 40px 0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry], observer) => {
      const target = entry;
      if (target.isIntersecting && imageData.length > 0) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);
      }
    }, options);
    if (observeTargetRef?.current) observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [imageData, setPage]);

  const resultData = imageData.filter((img) => {
    const filterOption = img.alt.toUpperCase().replace(/ /g, '');
    const filterData = isFiltering
      ? filterOption.length > 0 &&
        filterOption.includes(searchValue.toUpperCase().trim())
      : true;
    return filterData;
  });

  console.log(imageData);
  console.log(resultData);

  const imageList = resultData.map((content, idx) => {
    const key = `content-${idx}`;
    return (
      <li key={key} className={styles.imageItem} data-id={idx}>
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
        <li className={styles.observeTarget} ref={observeTargetRef} />
      </ul>
    </section>
  );
}

export default List;

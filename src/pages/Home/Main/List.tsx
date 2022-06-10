import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filtedData, imageDataRes, searchResult } from 'store/atom';
import { useQuery } from 'react-query';

import { fetchData } from 'service/imageDataApi';

import styles from './styles.module.scss';

function List() {
  const [imageData, setImageData] = useRecoilState(imageDataRes);
  const filtedImageData = useRecoilValue(filtedData);
  const searchValue = useRecoilValue(searchResult);
  const [page, setPage] = useState(1);

  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const observeTargetRef = useRef<HTMLLIElement | null>(null);

  console.log(imageData);
  console.log(page);

  // useQuery 사용 X
  useEffect(() => {
    const getImageData = async () => {
      const data = await fetchData({ page, per_page: 30 });
      setImageData((prev) => [...prev, ...data.photos]);
    };
    getImageData();
  }, [page, setImageData]);

  // const { data, isLoading } = useQuery(
  //   ['images', page],
  //   () => fetchData({ page, per_page: 30 }),
  //   {
  //     staleTime: Infinity,
  //   }
  // );

  // useEffect(() => {
  //   if (!data) return;
  //   setImageData((prev) => [...prev, ...data.photos]);
  // }, [data, setImageData]);

  useEffect(() => {
    const options = {
      root: imageBoxRef.current,
      rootMargin: '0px 0px 40px 0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry], observer) => {
      const target = entry;

      // if (target.isIntersecting && !isLoading && data?.next_page) {
      if (target.isIntersecting && imageData.length > 0) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);
      }
    }, options);
    if (observeTargetRef?.current) observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
    // }, [data, isLoading]);
  }, [imageData]);

  // 페이지를 전역상태화

  // 버튼클릭시 필터링

  // 필터 아이템 갯수 부족시 페이지 증가

  // const resultData = imageData.filter(()=>{
  //   return isFilter ? 필터조건 === true인 배열 : true;
  // })

  const imageList = imageData.map((content, idx) => {
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

import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filterData,
  filterState,
  imageDataRes,
  pageState,
  perPageState,
  searchResult,
} from 'store/atom';

import { fetchData } from 'service/imageDataApi';

import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';
import styles from './styles.module.scss';

function List() {
  const [imageData, setImageData] = useRecoilState(imageDataRes);
  const [page, setPage] = useRecoilState(pageState);
  const perPage = useRecoilValue(perPageState);
  const searchState = useRecoilValue(searchResult);
  const [filtedImageData, setFiltedImageData] = useRecoilState(filterData);
  const isFiltering = useRecoilValue(filterState);
  const [onModal, setOnModal] = useState(false);

  const imageBoxRef = useRef<HTMLDivElement | null>(null);
  const observeTargetRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (!isFiltering) {
      const getImageData = async () => {
        const data = await fetchData({ page, per_page: perPage });
        setImageData((prev) => [...prev, ...data.photos]);
        setFiltedImageData([]);
      };
      getImageData();
    } else {
      const getImageData = async () => {
        const data = await fetchData({ page, per_page: perPage });
        const filterDataList = data.photos.filter((img) => {
          const filterOption = img.alt.toUpperCase().replace(/ /g, '');
          return filterOption.includes(searchState.toUpperCase().trim());
        });
        setFiltedImageData((prev) => [...prev, ...filterDataList]);
        setImageData([]);
      };
      getImageData();
    }
  }, [
    page,
    setPage,
    perPage,
    setImageData,
    setFiltedImageData,
    isFiltering,
    searchState,
  ]);

  const resultData = !isFiltering ? imageData : filtedImageData;

  useEffect(() => {
    const options = {
      root: imageBoxRef.current,
      rootMargin: '0px 0px 40px 0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry], observer) => {
      const target = entry;
      if (target.isIntersecting && resultData.length > 0) {
        setPage((prev) => prev + 1);
        observer.unobserve(entry.target);
      }
    }, options);
    if (observeTargetRef?.current) observer.observe(observeTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [resultData, setPage]);

  const handleModal = () => {
    setOnModal(!onModal);
  };
  const imageList = resultData.map((content, idx) => {
    const key = `content-${idx}`;
    return (
      <li
        role="presentation"
        key={key}
        className={styles.imageItem}
        data-id={idx}
        onClick={handleModal}
      >
        <button className={styles.imageButton} type="submit">
          <figure>
            <img
              className={styles.image}
              src={`${content.src.tiny}`}
              alt={`${content.alt}`}
              data-id={idx}
              data-src={`${content.src.original}`}
            />
            <figcaption>{content.alt}</figcaption>
          </figure>
        </button>
      </li>
    );
  });

  return (
    <>
      <section className={styles.listSection} ref={imageBoxRef}>
        <ul className={styles.listBox}>
          {imageList}
          <li className={styles.observeTarget} ref={observeTargetRef} />
        </ul>
      </section>
      <Portal>{onModal && <Modal onClose={handleModal}>모달</Modal>}</Portal>
    </>
  );
}

export default List;

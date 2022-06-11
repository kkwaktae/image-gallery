import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filterData,
  filterState,
  imageDataRes,
  modalState,
  pageState,
  perPageState,
  searchResult,
} from 'store/atom';

import { fetchData } from 'service/imageDataApi';

import Portal from 'components/common/Portal';
import Modal from 'components/common/Modal';
import {
  CircleDownIcon,
  FavoriteAfterIcon,
  FavoriteBeforeIcon,
  PendingIcon,
} from 'assets/svgs';
import styles from './styles.module.scss';

function List() {
  const [imageData, setImageData] = useRecoilState(imageDataRes);
  const [page, setPage] = useRecoilState(pageState);
  const [filtedImageData, setFiltedImageData] = useRecoilState(filterData);

  const perPage = useRecoilValue(perPageState);
  const searchState = useRecoilValue(searchResult);
  const isFiltering = useRecoilValue(filterState);

  const [selectedSrc, setSelectedSrc] = useState('');
  const [selectedAlt, setSelectedAlt] = useState('');
  const [onModal, setOnModal] = useRecoilState(modalState);

  const [showInfoIcon, setShowInfoIcon] = useState(false);
  const [showFavoriteIcon, setShowFavoriteIcon] = useState(false);

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

  const onClickImage = (e: MouseEvent<HTMLLIElement>) => {
    const dataSrc = e.currentTarget.dataset.src as string;
    const dataAlt = e.currentTarget.dataset.alt as string;

    setOnModal(!onModal);
    setSelectedSrc(dataSrc);
    setSelectedAlt(dataAlt);
  };

  const handleModal = () => {
    setOnModal(!onModal);
  };

  const onClickInfoIcon = () => {
    setShowInfoIcon(!showInfoIcon);
  };

  const onClickFavoriteIcon = () => {
    setShowFavoriteIcon(!showFavoriteIcon);
  };

  const imageList = resultData.map((content, idx) => {
    const key = `content-${idx}`;
    return (
      <li
        role="presentation"
        key={key}
        className={styles.imageItem}
        data-id={idx}
        onClick={onClickImage}
        data-src={`${content.src.medium}`}
        data-alt={`${content.alt}`}
      >
        <button className={styles.imageButton} type="submit">
          <figure>
            <img
              className={styles.image}
              src={`${content.src.tiny}`}
              alt={`${content.alt}`}
              data-id={idx}
              draggable="false"
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
      <Portal>
        {onModal && (
          <Modal onClose={handleModal}>
            <div
              className={styles.modalContent}
              style={{ backgroundImage: `url(${selectedSrc})` }}
            >
              <div className={styles.modalGradient} />
              <button
                type="button"
                className={styles.imageInfo}
                aria-label="image-information-open-button"
                onClick={onClickInfoIcon}
              >
                {showInfoIcon ? (
                  <CircleDownIcon className={styles.foldIcon} />
                ) : (
                  <PendingIcon className={styles.infoIcon} />
                )}
              </button>
              <button
                type="button"
                className={styles.favorite}
                aria-label="favorite-button"
                onClick={onClickFavoriteIcon}
              >
                {showFavoriteIcon ? (
                  <FavoriteAfterIcon className={styles.favoriteAfter} />
                ) : (
                  <FavoriteBeforeIcon className={styles.favoriteBefore} />
                )}
              </button>
            </div>
          </Modal>
        )}
      </Portal>
    </>
  );
}

export default List;

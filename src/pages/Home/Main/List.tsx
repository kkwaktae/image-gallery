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
  selectedDataAlt,
  selectedDataPhotographer,
  selectedDataPhotographerUrl,
  selectedDataSrc,
  selectedDataUrl,
} from 'store/atom';
import { fetchData } from 'service/imageDataApi';

import cx from 'classnames';

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

  const [onModal, setOnModal] = useRecoilState(modalState);

  const [selectedSrc, setSelectedSrc] = useRecoilState(selectedDataSrc);
  const [selectedAlt, setSelectedAlt] = useRecoilState(selectedDataAlt);
  const [selectedUrl, setSelectedUrl] = useRecoilState(selectedDataUrl);
  const [selectedPhotographer, setSelectedPhotographer] = useRecoilState(
    selectedDataPhotographer
  );
  const [selectedPhotographerUrl, setSelectedPhotographerUrl] = useRecoilState(
    selectedDataPhotographerUrl
  );

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
    const dataSrc = e.currentTarget.dataset.src;
    const dataAlt = e.currentTarget.dataset.alt;
    const dataUrl = e.currentTarget.dataset.url;
    const dataPhotographer = e.currentTarget.dataset.photographer;
    const dataPhotographerUrl = e.currentTarget.dataset.photographerurl;

    setOnModal(!onModal);
    setSelectedSrc(dataSrc);
    setSelectedAlt(dataAlt);
    setSelectedUrl(dataUrl);
    setSelectedPhotographer(dataPhotographer);
    setSelectedPhotographerUrl(dataPhotographerUrl);
  };

  const handleModal = () => {
    setOnModal(!onModal);
  };

  useEffect(() => {
    if (!onModal) setShowInfoIcon(false);
  }, [onModal]);

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
        data-like={`${content.liked}`}
        data-src={`${content.src.medium}`}
        data-alt={`${content.alt}`}
        data-url={`${content.url}`}
        data-photographer={`${content.photographer}`}
        data-photographerurl={`${content.photographer_url}`}
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
              <dl
                className={cx(styles.modalImageContainer, {
                  [styles.isShow]: showInfoIcon,
                })}
              >
                <div className={styles.imageUrl}>
                  <dt>Image URL</dt>
                  <dd>
                    <a href={`${selectedUrl}`} target="_blank" rel="noreferrer">
                      {selectedUrl}
                    </a>
                  </dd>
                </div>
                <div className={styles.photographerName}>
                  <dt>Photographer</dt>
                  <dd>{selectedPhotographer}</dd>
                </div>
                <div className={styles.photographerUrl}>
                  <dt>Photographer&#39;s URL</dt>
                  <dd>
                    <a
                      href={`${selectedPhotographerUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {selectedPhotographerUrl}
                    </a>
                  </dd>
                </div>
              </dl>
              <button
                type="button"
                className={styles.imageInfoButton}
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
                className={styles.favoriteButton}
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

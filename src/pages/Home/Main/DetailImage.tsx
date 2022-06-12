import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { favoriteData, favoriteDataList, modalState } from 'store/atom';

import cx from 'classnames';

import Modal from 'components/common/Modal';
import Portal from 'components/common/Portal';
import {
  CircleDownIcon,
  FavoriteAfterIcon,
  FavoriteBeforeIcon,
  PendingIcon,
} from 'assets/svgs';
import styles from './styles.module.scss';

function DetailImage() {
  const [onModal, setOnModal] = useRecoilState(modalState);
  const [favoriteImage, setFavoriteImage] = useRecoilState(favoriteData);
  const [favoriteImageList, setFavoriteImageList] =
    useRecoilState(favoriteDataList);
  const [showInfoIcon, setShowInfoIcon] = useState(false);

  const { src, url, photographer, liked, id } = favoriteImage;
  const photographerURL = favoriteImage.photographer_url;

  useEffect(() => {
    if (!onModal) setShowInfoIcon(false);
  }, [onModal]);

  const handleModal = () => {
    setOnModal(!onModal);
  };

  const onClickInfoIcon = () => {
    setShowInfoIcon(!showInfoIcon);
  };

  const onClickFavoriteIcon = () => {
    setFavoriteImage((prev) => ({
      ...prev,
      liked: !liked,
    }));

    const targetIndex = favoriteImageList.findIndex(
      (target) => target.id === id
    );
    console.log(targetIndex);

    if (targetIndex === -1) {
      setFavoriteImageList((prev) => [
        { ...favoriteImage, liked: !liked },
        ...prev,
      ]);
    } else if (targetIndex !== -1) {
      setFavoriteImageList((prev) => [...prev].splice(targetIndex, 1));
      // favoriteImageList.splice(targetIndex, 1);
    }
  };
  console.log(favoriteImageList);

  return (
    <Portal>
      {onModal && (
        <Modal onClose={handleModal}>
          <div
            className={styles.modalContent}
            style={{ backgroundImage: `url(${src.large})` }}
          >
            <dl
              className={cx(styles.modalImageContainer, {
                [styles.isShow]: showInfoIcon,
              })}
            >
              <div className={styles.imageUrl}>
                <dt>Image URL</dt>
                <dd>
                  <a href={`${url}`} target="_blank" rel="noreferrer">
                    {url}
                  </a>
                </dd>
              </div>
              <div className={styles.photographerName}>
                <dt>Photographer</dt>
                <dd>{photographer}</dd>
              </div>
              <div className={styles.photographerUrl}>
                <dt>Photographer&#39;s URL</dt>
                <dd>
                  <a
                    href={`${photographerURL}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {photographerURL}
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
              {liked ? (
                <FavoriteAfterIcon className={styles.favoriteAfter} />
              ) : (
                <FavoriteBeforeIcon className={styles.favoriteBefore} />
              )}
            </button>
          </div>
        </Modal>
      )}
    </Portal>
  );
}

export default DetailImage;

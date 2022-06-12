import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { favoriteDataList, modalState, selectedData } from 'store/atom';

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
  const [selectedImage, setSelectedImage] = useRecoilState(selectedData);
  const [favoriteImageList, setFavoriteImageList] =
    useRecoilState(favoriteDataList);
  const [showInfoIcon, setShowInfoIcon] = useState(false);
  const [showLikeIcon, setShowLikeIcon] = useState(false);

  const { src, url, photographer, liked, id } = selectedImage;
  const photographerURL = selectedImage.photographer_url;

  useEffect(() => {
    if (!onModal) setShowInfoIcon(false);
    const activeFavoriteIcon = favoriteImageList.find((img) => {
      return img.id === selectedImage.id;
    });

    if (activeFavoriteIcon?.liked) setShowLikeIcon(true);
    else setShowLikeIcon(false);
  }, [onModal, selectedImage, favoriteImageList, setShowLikeIcon]);

  const handleModal = () => {
    setOnModal(!onModal);
  };

  const onClickInfoIcon = () => {
    setShowInfoIcon(!showInfoIcon);
  };

  const onClickFavoriteIcon = () => {
    setSelectedImage((prev) => ({
      ...prev,
      liked: !liked,
    }));

    const targetIndex = favoriteImageList.findIndex(
      (target) => target.id === id
    );

    if (targetIndex === -1) {
      setFavoriteImageList((prev) => [
        { ...selectedImage, liked: !liked },
        ...prev,
      ]);
    } else if (targetIndex !== -1) {
      setFavoriteImageList((prev) => {
        return [...prev].filter((img) => img.id !== id);
      });
    }
  };
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
              {showLikeIcon ? (
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

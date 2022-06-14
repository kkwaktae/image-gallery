import styles from './styles.module.scss';

function FavoriteList() {
  const getFavorite = JSON.parse(localStorage.getItem('favorite') || '{}');
  const savedFavoriteList: Photo[] = getFavorite;

  const favorites = savedFavoriteList.map((content: Photo, idx) => {
    const key = `favorite-content-${idx}`;

    return (
      <li
        role="presentation"
        key={key}
        className={styles.favoriteImageItem}
        data-id={idx}
        // onClick={onClickFavoriteImage}
      >
        <button className={styles.favoriteImageButton} type="button">
          <figure>
            <img
              className={styles.favoriteImage}
              src={`${content.src.large}`}
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
    <section className={styles.favoriteListWrapper}>
      <header className={styles.favoriteListTitle}>
        <h2>Favorite List .</h2>
      </header>
      <ul className={styles.cardBox}>{favorites}</ul>
    </section>
  );
}

export default FavoriteList;

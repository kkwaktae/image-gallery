import FavoriteList from './FavoriteList';

import styles from './styles.module.scss';

function FavoriteMain() {
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <FavoriteList />
      </div>
    </main>
  );
}

export default FavoriteMain;

import { Link, Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

function Favorite() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/favorite">Favorite</Link>
      </nav>
      <main className={styles.favoriteWrapper}>
        <h2>즐겨찾기</h2>
        <Outlet />
      </main>
    </>
  );
}

export default Favorite;

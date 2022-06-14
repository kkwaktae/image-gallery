import Nav from 'components/common/Nav';
import FavoriteMain from './FavoriteMain';

import styles from './styles.module.scss';

function Favorite() {
  return (
    <div className={styles.favoriteWrapper}>
      <Nav />
      <FavoriteMain />
    </div>
  );
}

export default Favorite;

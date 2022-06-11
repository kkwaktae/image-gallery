import Nav from 'components/common/Nav';
import Main from 'pages/Home/Main';

import styles from './styles.module.scss';

function Favorite() {
  return (
    <div className={styles.favoriteWrapper}>
      <Nav />
      <Main />
    </div>
  );
}

export default Favorite;

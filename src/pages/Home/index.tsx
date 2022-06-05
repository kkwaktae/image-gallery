import Nav from 'components/common/Nav';
import Main from './Main';

import styles from './styles.module.scss';

function Home() {
  return (
    <div className={styles.wrapper}>
      <Nav />
      <Main />
    </div>
  );
}

export default Home;

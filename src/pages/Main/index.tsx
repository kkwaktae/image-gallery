import { LogoIcon } from 'assets/svgs';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

function Main() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.globalNav}>
        <ul className={styles.navList}>
          <li className={styles.logoLink}>
            <a
              className={styles.toProvider}
              href="https://www.pexels.com"
              target="_blank"
              rel="noreferrer"
            >
              <LogoIcon />
            </a>
          </li>
          <li className={styles.routerLink}>
            <Link to="/">Main</Link>
          </li>
          <li className={styles.routerLink}>
            <Link to="/favorite">favorite</Link>
          </li>
        </ul>
      </nav>
      <main className={styles.mainWrapper}>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search" />
        </div>
        <ul className={styles.listBox}>
          <li className={styles.content1}>img1</li>
          <li className={styles.content2}>img2</li>
          <li className={styles.content3}>img3</li>
        </ul>
      </main>
    </div>
  );
}

export default Main;

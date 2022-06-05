import { LogoIcon } from 'assets/svgs';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

function Nav() {
  return (
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
  );
}

export default Nav;

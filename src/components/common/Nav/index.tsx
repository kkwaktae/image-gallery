import { LogoIcon } from 'assets/svgs';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

function Nav() {
  const navList = [
    {
      id: 1,
      path: '/',
      title: 'Main',
    },
    {
      id: 2,
      path: '/favorite',
      title: 'Favorite',
    },
  ];

  const navMenu = navList.map((navItem) => {
    const key = `nav-${navItem.id}`;
    return (
      <NavLink
        key={key}
        to={navItem.path}
        className={({ isActive }) => (isActive ? `${styles.selected}` : '')}
      >
        {navItem.title}
      </NavLink>
    );
  });

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
        <li className={styles.routerLink}>{navMenu}</li>
      </ul>
    </nav>
  );
}

export default Nav;

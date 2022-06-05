import List from './List';
import Search from './Search';
import styles from './styles.module.scss';

function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.mainWrapper}>
        <Search />
        <List />
      </div>
    </main>
  );
}

export default Main;

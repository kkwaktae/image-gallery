import { FormEvent } from 'react';

import { SearchIcon } from 'assets/svgs';
import styles from './styles.module.scss';

function Search() {
  const onsubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className={styles.searchSection}>
      <header className={styles.searchTitle}>
        <h2>We can search here .</h2>
      </header>
      <form className={styles.searchBox} onSubmit={onsubmitSearch}>
        <SearchIcon className={styles.searchIcon} />
        <input
          className={styles.searchBar}
          type="text"
          placeholder="What image do you want?"
        />
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

export default Search;

import { ChangeEvent, FormEvent } from 'react';
import { useRecoilState } from 'recoil';
import { searchResult } from 'store/atom';

import { SearchIcon } from 'assets/svgs';
import styles from './styles.module.scss';

function Search() {
  const [searchState, setSearchState] = useRecoilState(searchResult);

  const onsubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchState(value);
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
          onChange={onChangeSearch}
        />
        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>
    </section>
  );
}

export default Search;

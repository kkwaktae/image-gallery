import { ChangeEvent, FormEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { filterState, pageState, searchResult } from 'store/atom';

import { SearchIcon } from 'assets/svgs';
import styles from './styles.module.scss';

function Search() {
  const [searchState, setSearchState] = useRecoilState(searchResult);
  const setIsFiltering = useSetRecoilState(filterState);
  const setPage = useSetRecoilState(pageState);

  const onsubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchState.trim().length > 0) setIsFiltering(true);
    if (searchState.trim() === '') setIsFiltering(false);
    setPage(1);
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

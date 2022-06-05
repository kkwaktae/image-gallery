import { fetchImageData } from 'service/imageDataApi';

import cx from 'classnames';

import styles from './styles.module.scss';

function List() {
  const getImageData = async () => {
    const { data } = await fetchImageData('curated', { page: 1 });
    console.log(data);
    console.log('test');
  };
  console.log('aaa');

  // getImageData();

  const imageData = [
    { id: '1', image: 'aa' },
    { id: '2', image: 'bb' },
    { id: '3', image: 'cc' },
  ];
  const imageList = imageData.map((content) => {
    const key = `content-${content.id}`;
    return (
      <li key={key} className={styles.imageItem}>
        {content.image}
      </li>
    );
  });

  const gridArr = [
    { id: 1, line: 'column1' },
    { id: 2, line: 'column2' },
  ];

  const gridLine = gridArr.map((grid) => {
    const key = `grid-${grid.id}`;
    return (
      <ul key={key} className={cx(styles.listBox, styles[grid.line])}>
        {imageList}
      </ul>
    );
  });

  return <section className={styles.listSection}>{gridLine}</section>;
}

export default List;

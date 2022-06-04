import { Routes, Route } from 'react-router-dom';

import Main from './Main';
import Favorite from './Favorite';
import NotFound from './NotFound';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="favorite" element={<Favorite />}>
          <Route index element={<Favorite />} />
          <Route path="list" element={<Favorite />} />
          <Route path="chart" element={<Favorite />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

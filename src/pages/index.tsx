import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Favorite from './Favorite';
import NotFound from './NotFound';
import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

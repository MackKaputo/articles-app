import { BrowserRouter, Routes, Route} from "react-router-dom"
import { LandingPage } from './pages'

import { Nav } from './components'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

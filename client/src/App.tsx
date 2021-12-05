import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Articles, LandingPage, ArticlesPlan } from './pages'
import { ProtectedRoute } from "./routes/ProtectedRoute"
import { Nav } from './components'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} ></Route>
        <Route path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} ></Route>
        </Route>
        <Route path="/article-plans" element={<ProtectedRoute />}>
          <Route path="/article-plans" element={<ArticlesPlan />} ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

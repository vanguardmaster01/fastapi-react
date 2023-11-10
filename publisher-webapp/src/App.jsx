import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ArticleList from './pages/articleList'
import RealTime from './pages/realtime'
import LoginPage from './pages/login'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/article-list' element={<ArticleList />} />
                <Route path='/' element={<LoginPage />} />
                <Route path='/realtime' element={<RealTime />} />
            </Routes>
        </Router>
    )
}

export default App

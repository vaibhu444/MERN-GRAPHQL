import { Route, Routes } from "react-router-dom"
import HomePage from '../src/pages/HomePage';
import LogInPage from './pages/LoginPage';
import SignUpPage from '../src/pages/SignUpPage';
import NotFoundPage from './pages/NotFound';
import TransactionPage from '../src/pages/TransactionPage';
import Header from "./components/ui/Header";

function App() {
  const authUser=false;

  return (
    <>
      { authUser && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<TransactionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App

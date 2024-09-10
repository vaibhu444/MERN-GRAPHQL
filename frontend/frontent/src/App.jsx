import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from '../src/pages/HomePage';
import LogInPage from './pages/LoginPage';
import SignUpPage from '../src/pages/SignUpPage';
import NotFoundPage from './pages/NotFound';
import TransactionPage from '../src/pages/TransactionPage';
import Header from "./components/ui/Header";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { Toaster } from "react-hot-toast";

function App() {

  const {data, loading, error} = useQuery(GET_AUTHENTICATED_USER)
  if (loading) return null;

  return (
    <>
      { data?.authUser && <Header />}
      <Routes>
        <Route path="/" element={data.authUser ? <HomePage />: <Navigate to="/login" />} />
        <Route path="/login" element={!data.authUser ? <LogInPage />: <Navigate to="/" />} />
        <Route path="/signup" element={!data.authUser ? <SignUpPage />: <Navigate to="/" />} />
        <Route path="/transaction/:id" element={data.authUser ? <TransactionPage />: <Navigate to="/login" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App

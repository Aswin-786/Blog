import Layout from "./pages/Layout";
import { Route, Routes } from "react-router-dom";
import IndexPages from "./pages/IndexPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { lazy, Suspense } from 'react';
import UserDetails from "./pages/UserDetails";
import Loading from "./components/Loading";
import { RecoilRoot } from "recoil";
import InitUser from "./components/InitUser";
const EditPage = lazy(() => import('./pages/EditPage'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
const PostPage = lazy(() => import('./pages/PostPage'))

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<Loading />}>
        <InitUser />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPages />} />
            <Route path={"/login"} element={<LoginPage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/create"} element={<CreatePost />} />
            <Route path={"/post/:id"} element={<PostPage />} />
            <Route path={"/edit/:id"} element={<EditPage />} />
            <Route path={"/user/:userId"} element={<UserDetails />} />
          </Route>
        </Routes>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;

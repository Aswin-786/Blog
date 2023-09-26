import Layout from "./Layout";
import { Route, Routes } from "react-router-dom";
import IndexPages from "./pages/IndexPages";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./context/userContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { lazy, Suspense } from 'react';
// import CreatePost from "./pages/CreatePost";
// import PostPage from "./pages/PostPage";
// import EditPage from "./pages/EditPage";
const EditPage = lazy(() => import('./pages/EditPage'))
const CreatePost = lazy(() => import('./pages/CreatePost'))
const PostPage = lazy(() => import('./pages/PostPage'))

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <Suspense fallback={<div className="container">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPages />} />
              <Route path={"/login"} element={<LoginPage />} />
              <Route path={"/register"} element={<RegisterPage />} />
              <Route path={"/create"} element={<CreatePost />} />
              <Route path={"/post/:id"} element={<PostPage />} />
              <Route path={"/edit/:id"} element={<EditPage />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;

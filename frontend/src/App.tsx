import Layout from './components/UI/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Login from './feathers/users/Login.tsx';
import Register from './feathers/users/Register.tsx';
import NotFound from './components/UI/Not-Found/NotFound.tsx';
import PostsPage from './feathers/posts/PostsPage.tsx';
import PostPage from './feathers/posts/PostPage.tsx';


const App = () => {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={(<PostsPage/>)}/>
          <Route path="/login" element={(<Login/>)}/>
          <Route path="/register" element={(<Register/>)}/>
          <Route path="/post/:id" element={(<PostPage/>)}/>
          <Route path="*" element={(<NotFound/>)}/>
        </Routes>
      </Layout>
    </>
  );
};

export default App;

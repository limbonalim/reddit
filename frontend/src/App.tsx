import Layout from "./components/UI/Layout/Layout.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./feathers/users/Login.tsx";
import Register from "./feathers/users/Register.tsx";
import NotFound from "./components/UI/Not-Found/NotFound.tsx";


const App = () => {

  return (
    <>
     <Layout>
       <Routes>
         <Route path='/login' element={(<Login/>)}/>
         <Route path='/register' element={(<Register/>)}/>
         <Route path='*' element={(<NotFound/>)}/>
       </Routes>
     </Layout>
    </>
  )
};

export default App

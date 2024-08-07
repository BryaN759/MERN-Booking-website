import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';

const App = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <p>Home page</p>
                        </Layout>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <Layout>
                            <p>Search page</p>
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <Layout>
                            <SignIn />
                        </Layout>
                    }
                />
                {isLoggedIn && (
                    <>
                        <Route
                            path="/add-hotel"
                            element={
                                <Layout>
                                    <AddHotel />
                                </Layout>
                            }
                        />
                        <Route
                            path="/my-hotels"
                            element={
                                <Layout>
                                    <MyHotels />
                                </Layout>
                            }
                        />
                    </>
                )}
                <Route path="/*" element={<p>Page not found</p>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

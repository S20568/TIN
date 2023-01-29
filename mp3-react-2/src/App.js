import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import Footer from "./components/fragments/Footer";
import { Routes, Route } from 'react-router-dom';
import CustomerList from "./components/customer/CustomerList";
import CustomerDetails from "./components/customer/CustomerDetails";
import CustomerForm from "./components/customer/CustomerForm";
import OrderList from "./components/order/OrderList";
import OrderDetails from "./components/order/OrderDetails";
import OrderForm from "./components/order/OrderForm";
import ModelList from "./components/model/ModelList";
import ModelDetails from "./components/model/ModelDetails";
import ModelForm from "./components/model/ModelForm";
import {useState} from "react";
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from "./components/other/ProtectedRoute";

function App() {

    const [user, setUser] = useState();

    const handleLogin = (user) => {
        localStorage.setItem('user', user)
        setUser(user)
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser(undefined)
    }

    return (
        <>
            <Header />
            <Navigation handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<MainContent />}/>
                <Route path="customers">
                    <Route index={true} element={
                        <ProtectedRoute>
                            <CustomerList />
                        </ProtectedRoute>
                    } />
                    <Route path="details/:customerId" element={<CustomerDetails />} />
                    <Route path="add" element={
                        <ProtectedRoute>
                            <CustomerForm />
                        </ProtectedRoute>
                    } />
                    <Route path="edit/:customerId" element={<CustomerForm />} />
                </Route>
                <Route path="models">
                    <Route index={true} element={<ModelList /> } />
                    <Route path="details/:modelId" element={<ModelDetails />} />
                    <Route path="add" element={<ProtectedRoute>
                        <ModelForm />
                    </ProtectedRoute>} />
                    <Route path="edit/:modelId" element={<ModelForm />} />
                </Route>
                <Route path="orders">
                    <Route index={true} element={<OrderList />} />
                    <Route path="details/:orderId" element={<OrderDetails />} />
                    <Route path="add" element={<ProtectedRoute>
                        <OrderForm />
                    </ProtectedRoute>} />
                    <Route path="edit/:orderId" element={<OrderForm />} />
                </Route>
                <Route path="/login" element={<LoginForm handleLogin={handleLogin} />} />
            </Routes>
            <Footer />
        </>
    );
}
export default App;
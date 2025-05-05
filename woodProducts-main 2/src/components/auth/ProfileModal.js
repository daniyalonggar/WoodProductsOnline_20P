import React, {useContext, useEffect, useState, useRef} from 'react';
import {AppContext} from '../../contexts/context';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../redux/userSlice';
import {getCartAPI, getOrdersAPI, getWishlistAPI} from '../../api';
import {LogOut, X, ShoppingBag, Heart, User} from 'lucide-react';

const ProfileModal = () => {
    const {isProfileModalOpen, closeProfileModal, showAlert} = useContext(AppContext);
    const token = useSelector((state) => state.user.token);
    const profileData = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [orders, setOrders] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('orders');

    const dataFetchedRef = useRef(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isProfileModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isProfileModalOpen]);

    useEffect(() => {
        if (isProfileModalOpen && token && !dataFetchedRef.current) {
            dataFetchedRef.current = true;

            Promise.allSettled([
                getOrdersAPI(token),
                getWishlistAPI(token),
                getCartAPI(token),
            ])
                .then((results) => {
                    const [ordersResult, wishlistResult, cartResult] = results;

                    if (ordersResult.status === 'fulfilled') {
                        setOrders(ordersResult.value.results || []);
                    }
                    if (wishlistResult.status === 'fulfilled') {
                        setWishlist(wishlistResult.value.results || []);
                    }
                    if (cartResult.status === 'fulfilled') {
                        setCart(cartResult.value.results || []);
                    }
                })
                .catch(() => {
                    setError('Ошибка при загрузке данных');
                    showAlert('Произошла ошибка при загрузке данных!', 'error');
                });
        }
    }, [isProfileModalOpen, token]);

    const handleLogout = () => {
        dispatch(logout());
        closeProfileModal();
        showAlert('Вы успешно вышли из аккаунта!', 'success');
    };

    if (!isProfileModalOpen) return null;

    const getOrderStatusColor = (status) => {
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'completed': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return statusColors[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
    };

    const TabContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <div className="space-y-4">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id}
                                     className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                        <div className="space-y-2 w-full">
                      <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                                            <p className="text-sm text-gray-600">
                                                {new Date(order.created_at).toLocaleDateString('ru-RU', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <p className="font-bold text-lg">{order.total_price}₸</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2 break-words">{order.shipping_address}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-3"/>
                                <p>У вас пока нет заказов</p>
                            </div>
                        )}
                    </div>
                );
            case 'wishlist':
                return (
                    <div className="relative">
                        {wishlist.length > 0 ? (
                            <ul
                                className={`space-y-4 overflow-y-auto ${wishlist.length > 2 ? 'h-96' : ''}`}
                            >
                                {wishlist.map((item) => (
                                    <li
                                        key={item.id}
                                        className="group flex items-center bg-white rounded-lg shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md cursor-pointer"
                                        onClick={() => window.location.href = `/products/${item.product.id}`}
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="h-16 w-16 rounded-lg object-cover mr-4"
                                        />
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">{item.product.name}</h4>
                                            <p className="text-amber-600 font-bold">{item.product.price}₸</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                <Heart className="mx-auto h-12 w-12 text-gray-400 mb-3"/>
                                <p>Ваш список желаний пуст</p>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-0 sm:p-4">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                     onClick={closeProfileModal}/>

                <div
                    className="relative transform overflow-hidden bg-white w-full h-full sm:h-auto sm:rounded-lg sm:max-w-3xl">
                    <div className="h-full overflow-y-auto bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="absolute right-4 top-4">
                            <button
                                onClick={closeProfileModal}
                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors"
                            >
                                <X className="h-5 w-5"/>
                            </button>
                        </div>

                        {error && (
                            <div className="mb-4 rounded-md bg-red-50 p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {profileData ? (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                        <div className="relative">
                                            <img
                                                src={`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`}
                                                alt="Profile"
                                                className="h-16 w-16 rounded-full object-cover ring-2 ring-white"
                                            />
                                            <span
                                                className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"/>
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-lg font-semibold text-gray-900">{profileData.username}</h3>
                                            <p className="text-sm text-gray-500">{profileData.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                                    >
                                        <LogOut className="mr-2 h-4 w-4"/>
                                        Выйти
                                    </button>
                                </div>

                                <div className="border-b border-gray-200">
                                    <nav className="-mb-px flex space-x-8">
                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className={`flex items-center px-1 py-4 text-sm font-medium ${
                                                activeTab === 'orders'
                                                    ? 'border-b-2 border-amber-500 text-amber-600'
                                                    : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }`}
                                        >
                                            <ShoppingBag className="mr-2 h-5 w-5"/>
                                            <span className="hidden sm:inline">Заказы</span>
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('wishlist')}
                                            className={`flex items-center px-1 py-4 text-sm font-medium ${
                                                activeTab === 'wishlist'
                                                    ? 'border-b-2 border-amber-500 text-amber-600'
                                                    : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                            }`}
                                        >
                                            <Heart className="mr-2 h-5 w-5"/>
                                            <span className="hidden sm:inline">Список желаний</span>
                                        </button>
                                    </nav>
                                </div>

                                <div className="mt-6">
                                    <TabContent/>
                                </div>
                            </div>
                        ) : (
                            !error && (
                                <div className="flex items-center justify-center py-12">
                                    <div className="flex flex-col items-center space-y-4">
                                        <User className="h-12 w-12 text-gray-400 animate-pulse"/>
                                        <p className="text-gray-500">Загрузка профиля...</p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
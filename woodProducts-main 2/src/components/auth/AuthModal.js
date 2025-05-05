import React, {useContext, useState} from 'react';
import {AppContext} from '../../contexts/context';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../redux/userSlice';
import {getMeProfileAPI, loginAPI, registerAPI} from "../../api";

const AuthModal = () => {
    const {isAuthModalOpen, closeAuthModal, showAlert} = useContext(AppContext);
    const [isSignIn, setIsSignIn] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            let data;
            if (isSignIn) {
                data = await loginAPI(username, password);
                showAlert('Успешный вход!', 'success');
            } else {
                data = await registerAPI(username, password, email);
                showAlert('Регистрация прошла успешно!', 'success');
            }
            const user = await getMeProfileAPI(data.access || data.access_token)
            dispatch(setUserData({
                accessToken: data.access || data.access_token,
                refreshToken: data.refresh || data.refreshToken,
                user: user
            }));
            closeAuthModal();
        } catch (err) {
            setError('Неверные данные. Попробуйте еще раз.');
            showAlert('Ошибка входа/регистрации!', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
            <div className="w-full max-w-md transform transition-all">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Header with Tabs */}
                    <div className="p-6 pb-0">
                        <div className="flex space-x-4 border-b">
                            <button
                                className={`pb-4 px-4 transition-colors relative ${
                                    isSignIn
                                        ? 'text-blue-600 font-medium'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setIsSignIn(true)}
                            >
                                Войти
                                {isSignIn && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"/>
                                )}
                            </button>
                            <button
                                className={`pb-4 px-4 transition-colors relative ${
                                    !isSignIn
                                        ? 'text-blue-600 font-medium'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setIsSignIn(false)}
                            >
                                Регистрация
                                {!isSignIn && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"/>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="Имя пользователя"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {!isSignIn && (
                                <div>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            )}

                            <div>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="Пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors
                                    ${isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4" fill="none"/>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Подождите...
                                    </div>
                                ) : (
                                    isSignIn ? 'Войти' : 'Зарегистрироваться'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="p-6 pt-0">
                        <button
                            className={`w-full py-2 px-4 border border-gray-300 rounded-lg font-medium transition-colors
                                ${isLoading
                                ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                            onClick={closeAuthModal}
                            disabled={isLoading}
                        >
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegistering) {
        // Проверка совпадения паролей при регистрации
        if (password !== confirmPassword) {
          setError('Пароли не совпадают');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      let errorMessage = 'Произошла ошибка при авторизации';
      
      // Обработка типичных ошибок Firebase Auth
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Некорректный адрес электронной почты';
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Неверный email или пароль';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Этот email уже используется';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Пароль должен содержать не менее 6 символов';
      }
      
      setError(errorMessage);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        {/* Верхний декоративный элемент */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-4xl">✓</span>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
          <h2 className="text-3xl font-bold mb-6 text-center text-pink-600">
            {isRegistering ? 'Создать аккаунт' : 'Добро пожаловать!'}
          </h2>
          
          <p className="text-gray-500 text-center mb-8">
            {isRegistering 
              ? 'Зарегистрируйтесь, чтобы отслеживать ваши задачи'
              : 'Войдите, чтобы продолжить работу с вашими задачами'}
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100">
              {error}
            </div>
          )}
          
          <form onSubmit={handleAuth}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder={isRegistering ? "Минимум 6 символов" : "Введите пароль"}
                required
              />
            </div>
            
            {isRegistering && (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
                  Подтвердите пароль
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Повторите пароль"
                  required
                />
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl hover:from-pink-600 hover:to-pink-700 transition-colors font-medium text-lg shadow-md"
            >
              {isRegistering ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-pink-600 hover:text-pink-800 transition-colors font-medium"
            >
              {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Создать'}
            </button>
          </div>
        </div>
        
        {/* Нижний декоративный элемент */}
        <div className="flex justify-center mt-8">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Habit Tracker App. Все права защищены.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
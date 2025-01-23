import React, { useState } from 'react';
import { Home, User, Lock, Mail, UserCog } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login logic
      if (username === 'Mugil' && password === '123456') {
        onLogin({
          name: 'Mugil',
          email: 'mugil9451@email.com', // Add email if available
          role: 'Admin'
        });
      } else {
        setError('Invalid username or password');
      }
    } else {
      // Registration logic
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Simulate registration with role
      console.log('Registration successful', { 
        username, 
        email, 
        role 
      });

      // You would typically call an API here to register the user
      onLogin({
        name: username,
        email: email,
        role: role
      });

      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center justify-center space-x-2">
          <Home color="#3B82F6" size={32} />
          <span className="text-2xl text-center font-semibold text-gray-800">
            {isLogin ? 'Login' : 'Register'}
          </span>
        </div>

        {/* Toggle Switch */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 rounded-full p-1 flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                isLogin ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                !isLogin ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 text-red-700 bg-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label 
                  htmlFor="email" 
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="role" 
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Select Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCog className="text-gray-400" size={20} />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="editor">Employee</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div>
            <label 
              htmlFor="username" 
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-gray-400" size={20} />
              </div>
              <input 
                type="text" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          
          <div>
            <label 
              htmlFor="password" 
              className="block mb-2 text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-gray-400" size={20} />
              </div>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label 
                htmlFor="confirm-password" 
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input 
                  type="password" 
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full py-2 text-white text-center transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        {isLogin && (
          <div className="text-center">
            <a 
              href="#" 
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
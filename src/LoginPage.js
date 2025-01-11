import React, { useState } from 'react';
import { Lock, User } from 'lucide-react'; // Use Lock and User icons instead of LockClosedIcon and UserIcon Import useNavigate
import './index.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('mugil9451@gmail.com');
  const [password, setPassword] = useState('mugil123');
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    // Assuming successful login, you can call onLogin() from props
    if (onLogin) {
      onLogin();
      // Redirect to the main app page after successful login
      navigate('/dashboard');
    }
  };

  const handleSocialLogin = (platform) => {
    // Handle social login logic here (e.g., Google/Facebook)
    console.log(`Logging in with ${platform}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
        <div className="flex">
          {/* Left blue section with diagonal pattern */}
          <div className="w-1/3 bg-gradient-to-br from-blue-400 to-blue-500 p-8">
            <div className="h-full flex flex-col justify-start">
              <h2 className="text-white text-2xl font-bold">LOGIN</h2>
              <p className="text-white mt-2">SIGN IN</p>
            </div>
          </div>

          {/* Right login form section */}
          <div className="w-2/3 bg-white p-8">
            <div className="mb-6 flex justify-center">
              <div className="text-blue-500 text-3xl font-bold">LOGIN</div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Email"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-blue-500 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-32 bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                LOGIN
              </button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or Login with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5 mr-2"
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                    />
                    Google
                  </button>
                  <button
                    onClick={() => handleSocialLogin('Facebook')}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <img
                      className="h-5 w-5 mr-2"
                      src="https://www.facebook.com/favicon.ico"
                      alt="Facebook"
                    />
                    Facebook
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

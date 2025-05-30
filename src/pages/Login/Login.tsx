import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePhoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const charCode = e.charCode || e.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      console.log('Login attempted with:', { phone, password });
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Back to Home</span>
        </motion.button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 mt-10">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <PhoneIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <motion.input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyPress={handlePhoneKeyPress}
              pattern="[0-9]*"
              placeholder="Phone Number"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
              variants={inputVariants}
              whileFocus="focus"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
            <motion.input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
              variants={inputVariants}
              whileFocus="focus"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2 right-2 p-1"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Signing In...
                </motion.span>
              ) : (
                <motion.span
                  key="signin"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Sign In
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <a href="/forgot" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
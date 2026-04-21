import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/images/church-logo.png';
import Button from '../../../components/UI/Button';
import Input from '../../../components/UI/Input';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setLoginError('');
    setErrors({});

    try {
      await login(email, password);
      toast.success('Login successful! Welcome to the admin panel.');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.message || error.error || 'Login failed. Please try again.';
      setLoginError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <motion.div className='text-center mb-10'>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className='inline-block mb-6'
          >
            <div className='relative'>
              <img
                src={logo}
                alt='Church Logo'
                className='w-24 h-24 object-contain'
              />
            </div>
          </motion.div>

          <motion.h1 className='text-4xl font-bold text-gray-900 mb-2'>
            Admin <span className='text-blue-600'>Panel</span>
          </motion.h1>
          <motion.p className='text-gray-600 text-lg'>
            Sign in with your admin credentials to continue.
          </motion.p>
        </motion.div>

        <motion.form
          onSubmit={handleLogin}
          className='bg-white border border-gray-200 rounded-3xl p-8 shadow-lg'
        >
          <div className='space-y-6'>
            {/* <div className='rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800'>
              <div className='flex items-center gap-2'>
                <AlertCircle size={16} />
                <span className='font-medium'>Demo Credentials:</span>
              </div>
              <div className='mt-2 text-xs'>
                Email: admin@realtemple.com<br />
                Password: real@Temple26
              </div>
            </div> */}

            <Input
              label='Email Address'
              type='email'
              placeholder='admin@realtemple.com'
              icon={Mail}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: null });
                setLoginError('');
              }}
              error={errors.email}
              required
              disabled={isLoading}
            />

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Password <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
                <motion.input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                    setLoginError('');
                  }}
                  placeholder='Enter your password'
                  className='w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  whileFocus={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)' }}
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50'
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>
              {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
            </div>

            {loginError && (
              <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
                <div className='flex items-center gap-2'>
                  <AlertCircle size={16} className='text-red-500' />
                  <p className='text-sm text-red-700'>{loginError}</p>
                </div>
              </div>
            )}

            <div className='flex items-center justify-between text-sm text-gray-600'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                  disabled={isLoading}
                />
                Remember me
              </label>
              <a
                href='#'
                className='text-blue-600 hover:text-blue-700 transition-colors disabled:opacity-50'
                onClick={(e) => e.preventDefault()}
              >
                Forgot password?
              </a>
            </div>

            <Button
              type='submit'
              variant='primary'
              size='lg'
              className='w-full'
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
              {!isLoading && (
                <motion.span className='inline-block ml-2' whileHover={{ x: 5 }}>
                  <LogIn size={20} />
                </motion.span>
              )}
            </Button>
          </div>
        </motion.form>

        <motion.p className='text-center text-gray-500 text-sm mt-6'>
          For security reasons, please use your authorized credentials only.
        </motion.p>
      </div>
    </div>
  );
};

export default LoginScreen;

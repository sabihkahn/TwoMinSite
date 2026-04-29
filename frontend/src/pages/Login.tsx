import React, { useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Command, ArrowRight, BookXIcon, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore'
import apiClient from '../api/axiosapiinstance'
import axios from 'axios';
import toast from 'react-hot-toast';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser, User } = useAuthStore()
  const navigate = useNavigate();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    try {

      await apiClient.post(`/auth/user/login`, {
        email,
        password
      })
        .then((res) => {

          toast.success(res.data.message || 'Login Successful!');


          setUser(res.data.user);

        })
        .catch((err) => {

          const errorMsg = err.response?.data?.message || "Login failed. Please try again.";

          toast.error(errorMsg, {
            duration: 4000,
            style: {
              background: '#1c1c1c',
              color: '#fff',
              border: '1px solid #ef4444' // Red border for error
            }
          });
        })
        .finally(() => {
          setLoading(false);
        });

      let userdata = await apiClient.get('/auth/user/check').then((userdata) => {
        setUser(userdata.data.user)
      })
      navigate('/dashboard');

      console.log(User)

    } catch (error) {
      console.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-6">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[400px] z-10"
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white p-2 rounded-lg mb-4">
            <Command size={28} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium uppercase tracking-wider text-gray-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full bg-black border border-white/10 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-700"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[12px] font-medium uppercase tracking-wider text-gray-500">
                  Password
                </label>
                <a href="#" className="text-[11px] text-yellow-400 hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-white/10 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-2.5 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
            <div className="relative flex justify-center text-[11px] uppercase tracking-widest text-gray-500">
              {/* <span className="bg-black px-2">Or continue with</span> */}
            </div>
          </div>

          {/* Social Login */}
          {/* <button className="w-full border border-white/10 py-2.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
            <BookXIcon size={18} />
            GitHub
          </button> */}
        </div>

        {/* Footer Link */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-white font-semibold hover:text-yellow-400 transition">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/api';
import { setToken } from '../../lib/auth';
import { Check, AlertCircle } from 'lucide-react';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const data = await api(endpoint, 'POST', { username, password });

            if (isLogin) {
                setToken(data.access_token);
                setSuccess(true);
                setTimeout(() => router.push('/translate'), 1000);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    setIsLogin(true);
                    setSuccess(false);
                    setUsername('');
                    setPassword('');
                }, 2000);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 relative overflow-hidden">
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Card */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-gray-400">
                            {isLogin ? 'Sign in to continue translating' : 'Join 3ssila in breaking language barriers'}
                        </p>
                    </motion.div>

                    {/* Tab switcher */}
                    <div className="flex mb-6 bg-slate-800/50 rounded-lg p-1">
                        <button
                            onClick={() => {
                                setIsLogin(true);
                                setError(null);
                                setSuccess(false);
                            }}
                            className={`flex-1 py-2 px-4 rounded-md transition-all relative ${
                                isLogin ? 'text-white' : 'text-gray-400'
                            }`}
                        >
                            {isLogin && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">Login</span>
                        </button>
                        <button
                            onClick={() => {
                                setIsLogin(false);
                                setError(null);
                                setSuccess(false);
                            }}
                            className={`flex-1 py-2 px-4 rounded-md transition-all relative ${
                                !isLogin ? 'text-white' : 'text-gray-400'
                            }`}
                        >
                            {!isLogin && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">Register</span>
                        </button>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400"
                            >
                                <motion.div
                                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <AlertCircle size={20} />
                                </motion.div>
                                <span className="text-sm">{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Success message */}
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-400"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                >
                                    <Check size={20} />
                                </motion.div>
                                <span className="text-sm">
                                    {isLogin ? 'Login successful!' : 'Registration successful! Please login.'}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username field */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                placeholder="Enter your username"
                            />
                        </motion.div>

                        {/* Password field */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                placeholder="Enter your password"
                            />
                        </motion.div>

                        {/* Submit button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                                />
                            ) : (
                                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

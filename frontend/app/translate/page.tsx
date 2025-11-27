'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../lib/api';
import { getToken } from '../../lib/auth';
import TalaMascot from '../../components/TalaMascot';
import { ArrowRight, Languages, LogOut } from 'lucide-react';

type MascotState = 'neutral' | 'thinking' | 'happy' | 'error';

export default function TranslatePage() {
    const [text, setText] = useState('');
    const [direction, setDirection] = useState('fr-en');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mascotState, setMascotState] = useState<MascotState>('neutral');
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/auth');
        }
    }, [router]);

    const handleTranslate = async () => {
        setError(null);
        setLoading(true);
        setMascotState('thinking');
        
        try {
            const data = await api('/translate', 'POST', { text, direction });
            setTranslatedText(data.translated_text);
            setMascotState('happy');
            
            // Reset to neutral after celebration
            setTimeout(() => setMascotState('neutral'), 3000);
        } catch (err: any) {
            setError(err.message || 'Translation failed');
            setMascotState('error');
            
            // Reset to neutral after error
            setTimeout(() => setMascotState('neutral'), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 relative overflow-hidden">
            {/* Background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
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

            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 border-b border-cyan-500/20 backdrop-blur-sm"
            >
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Languages className="text-cyan-400" size={28} />
                        <h1 className="text-2xl font-bold text-white">3ssila</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    </div>
                </div>
            </motion.header>

            {/* Main content */}
            <div className="container mx-auto px-6 py-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Title */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Translation</span>
                        </h2>
                        <p className="text-xl text-gray-400">
                            Break language barriers with 3ssila's neural translation model
                        </p>
                    </div>

                    {/* Translation card */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
                        {/* Direction selector */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mb-6"
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Translation Direction
                            </label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDirection('fr-en')}
                                    className={`flex-1 py-3 px-4 rounded-lg transition-all relative ${
                                        direction === 'fr-en'
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                            : 'bg-slate-800/50 text-gray-400 hover:text-white border border-cyan-500/20'
                                    }`}
                                >
                                    French → English
                                </button>
                                <button
                                    onClick={() => setDirection('en-fr')}
                                    className={`flex-1 py-3 px-4 rounded-lg transition-all relative ${
                                        direction === 'en-fr'
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                                            : 'bg-slate-800/50 text-gray-400 hover:text-white border border-cyan-500/20'
                                    }`}
                                >
                                    English → French
                                </button>
                            </div>
                        </motion.div>

                        {/* Input textarea */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-6"
                        >
                            <label className="block text-sm font-medium text-gray-300 mb-3">
                                Text to Translate
                            </label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                                placeholder="Enter text to translate..."
                            />
                        </motion.div>

                        {/* Translate button */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleTranslate}
                            disabled={loading || !text.trim()}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                <>
                                    <span>Translate</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                        </motion.button>

                        {/* Error message */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400"
                                >
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Translation result */}
                        <AnimatePresence>
                            {translatedText && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="mt-6"
                                >
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Translation Result
                                    </label>
                                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg">
                                        <p className="text-white text-lg leading-relaxed">{translatedText}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            
            <TalaMascot state={mascotState} />
        </div>
    );
}

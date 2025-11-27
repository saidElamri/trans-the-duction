'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TranslationSection() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-4xl text-center"
            >
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-12"
                >
                    The First <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Translation</span>
                </motion.h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    {/* Source text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 min-w-[200px]"
                    >
                        <div className="text-sm text-gray-400 mb-2">English</div>
                        <div className="text-2xl text-white font-semibold">Hello</div>
                    </motion.div>

                    {/* Arrow */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="text-4xl text-cyan-400"
                    >
                        →
                    </motion.div>

                    {/* Translated text */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-slate-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 min-w-[200px]"
                    >
                        <div className="text-sm text-gray-400 mb-2">French</div>
                        <div className="text-2xl text-white font-semibold">Bonjour</div>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-xl text-gray-300 mb-8 leading-relaxed"
                >
                    Success! 3ssila now connects people across languages, breaking down barriers one translation at a time.
                </motion.p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'].map((lang, i) => (
                        <motion.div
                            key={lang}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-slate-800/50 p-3 rounded-lg text-center text-cyan-400 border border-cyan-500/20 cursor-default"
                        >
                            {lang}
                        </motion.div>
                    ))}
                </div>

                {/* 3ssila Success */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative"
                >
                    <div className="relative w-64 h-64 mx-auto">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
                        <Image
                            src="/tala-happy.png"
                            alt="3ssila Success"
                            fill
                            sizes="256px"
                            className="object-contain drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

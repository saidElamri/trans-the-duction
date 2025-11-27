'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import ScrambleText from '../animations/ScrambleText';

export default function TranslationSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <motion.div style={{ scale, opacity }} className="max-w-4xl text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">
                    The First <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Translation</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                    {/* Source text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 min-w-[200px]"
                    >
                        <div className="text-sm text-gray-400 mb-2">English</div>
                        <div className="text-2xl text-white font-semibold">
                            <ScrambleText text="Hello" delay={300} scrambleDuration={600} />
                        </div>
                    </motion.div>

                    {/* Arrow */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="text-4xl text-cyan-400"
                    >
                        →
                    </motion.div>

                    {/* Translated text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-slate-800/50 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 min-w-[200px]"
                    >
                        <div className="text-sm text-gray-400 mb-2">French</div>
                        <div className="text-2xl text-white font-semibold">
                            <ScrambleText 
                                text="Bonjour" 
                                delay={800} 
                                scrambleDuration={800}
                                scrambleChars="àâäæçéèêëïîôùûüÿœÀÂÄÆÇÉÈÊËÏÎÔÙÛÜŸŒ"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
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
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-800/50 p-3 rounded-lg text-center text-cyan-400 border border-cyan-500/20"
                        >
                            {lang}
                        </motion.div>
                    ))}
                </div>

                {/* 3ssila Success */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
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

                {/* Success particles */}
                <div className="relative mt-8">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 0 }}
                            whileInView={{ opacity: [0, 1, 0], y: -50 }}
                            transition={{
                                duration: 2,
                                delay: 1 + i * 0.1,
                                repeat: Infinity,
                                repeatDelay: 2,
                            }}
                            className="absolute w-2 h-2 bg-green-400 rounded-full"
                            style={{
                                left: `${50 + (i - 4) * 8}%`,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

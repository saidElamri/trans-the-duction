'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center px-8 max-w-5xl"
            >
                {/* 3ssila Hologram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                        <Image
                            src="/tala-pro-neutral.png"
                            alt="3ssila AI Assistant"
                            fill
                            priority
                            sizes="(max-width: 768px) 192px, 256px"
                            className="object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]"
                            style={{ filter: 'brightness(1.2) contrast(1.1)' }}
                        />
                    </div>
                </motion.div>

                {/* Hero Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">3ssila</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8"
                >
                    The Fearless AI Who Broke Language Barriers
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-gray-400 text-lg"
                >
                    Scroll to discover the journey
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                        opacity: 1,
                        y: [0, 10, 0]
                    }}
                    transition={{ 
                        opacity: { delay: 1, duration: 0.6 },
                        y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

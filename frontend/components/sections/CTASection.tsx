'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    const router = useRouter();

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <div className="max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                        Your Turn to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Translate</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
                        Join 3ssila in breaking down language barriers. Experience the power of AI-driven translation.
                    </p>

                    <motion.button
                        onClick={() => router.push('/translate')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-5 rounded-full text-lg font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all"
                    >
                        <span>Start Translating</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                        
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                    </motion.button>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-500 text-sm mt-8"
                    >
                        Powered by advanced neural networks
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}

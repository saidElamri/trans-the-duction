'use client';

import { motion } from 'framer-motion';

export default function ChallengeSection() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-4xl text-center"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12"
                >
                    <div className="text-8xl mb-8">🌍</div>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-8"
                >
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Challenge</span>
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-2xl md:text-3xl text-gray-300 leading-relaxed"
                >
                    3ssila once struggled with <span className="text-blue-400 font-semibold">French</span> and <span className="text-blue-400 font-semibold">English</span>.
                </motion.p>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-xl text-gray-400 mt-6"
                >
                    But the journey wasn't easy. 3ssila faced complex algorithms and data structures that seemed impossible to decipher.
                </motion.p>
            </motion.div>
        </section>
    );
}

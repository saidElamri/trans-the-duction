'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ChallengeSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <motion.div style={{ y, opacity }} className="max-w-4xl text-center">
                <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="text-8xl mb-8">🌍</div>
                </motion.div>

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Challenge</span>
                </h2>

                <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
                    3ssila once struggled with <span className="text-blue-400 font-semibold">French</span> and <span className="text-blue-400 font-semibold">English</span>.
                </p>
                <p className="text-xl text-gray-400 mt-6">
                    But the journey wasn't easy. 3ssila faced complex algorithms and data structures that seemed impossible to decipher.
                </p>
            </motion.div>
        </section>
    );
}

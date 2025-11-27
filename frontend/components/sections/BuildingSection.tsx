'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function BuildingSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const [drops, setDrops] = useState<{ left: string; duration: number; delay: number; content: string }[]>([]);

    useEffect(() => {
        setDrops(
            [...Array(10)].map(() => ({
                left: `${Math.random() * 100}%`,
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
                content: Math.random() > 0.5 ? '1' : '0'
            }))
        );
    }, []);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20 relative overflow-hidden">
            {/* Code rain effect */}
            <div className="absolute inset-0 opacity-10">
                {drops.map((drop, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-cyan-500/20 font-mono text-xs"
                        style={{
                            left: drop.left,
                            top: -20,
                        }}
                        animate={{
                            y: ['0vh', '100vh'],
                        }}
                        transition={{
                            duration: drop.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: drop.delay,
                        }}
                    >
                        {drop.content}
                    </motion.div>
                ))}
            </div>

            <motion.div style={{ y, opacity }} className="max-w-5xl relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">Model</span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                            3ssila worked tirelessly, training a neural network to understand the nuances of language.
                        </p>

                        <div className="space-y-4">
                            {['Data Processing', 'Neural Training', 'Model Optimization'].map((step, i) => (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                                    <span className="text-gray-400">{step}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Tala as assistant */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative w-48 h-48 mx-auto">
                            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-2xl" />
                            <Image
                                src="/tala-pro-thinking.png"
                                alt="3ssila Building"
                                fill
                                sizes="192px"
                                className="object-contain drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                            />
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-4">3ssila observing the training process</p>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

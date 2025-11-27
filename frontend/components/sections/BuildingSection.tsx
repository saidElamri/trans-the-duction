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

    const [dropsLayer1, setDropsLayer1] = useState<{ left: string; duration: number; delay: number; content: string }[]>([]);
    const [dropsLayer2, setDropsLayer2] = useState<{ left: string; duration: number; delay: number; content: string }[]>([]);
    const [dropsLayer3, setDropsLayer3] = useState<{ left: string; duration: number; delay: number; content: string }[]>([]);

    useEffect(() => {
        // Far background layer (slowest)
        setDropsLayer1(
            [...Array(4)].map(() => ({
                left: `${Math.random() * 100}%`,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                content: Math.random() > 0.5 ? '1' : '0'
            }))
        );
        
        // Mid-ground layer
        setDropsLayer2(
            [...Array(4)].map(() => ({
                left: `${Math.random() * 100}%`,
                duration: 2.5 + Math.random() * 1.5,
                delay: Math.random() * 2,
                content: Math.random() > 0.5 ? '1' : '0'
            }))
        );
        
        // Foreground layer (fastest)
        setDropsLayer3(
            [...Array(4)].map(() => ({
                left: `${Math.random() * 100}%`,
                duration: 2 + Math.random() * 1,
                delay: Math.random() * 2,
                content: Math.random() > 0.5 ? '1' : '0'
            }))
        );
    }, []);

    // Different parallax speeds for code rain layers
    const yRainLayer1 = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"]);
    const yRainLayer2 = useTransform(scrollYProgress, [0, 1], ["35px", "-35px"]);
    const yRainLayer3 = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

    return (
        <section ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20 relative overflow-hidden">
            {/* Code rain effect - Layer 1 (far background) */}
            <motion.div style={{ y: yRainLayer1 }} className="absolute inset-0 opacity-5">
                {dropsLayer1.map((drop, i) => (
                    <motion.div
                        key={`layer1-${i}`}
                        className="absolute text-cyan-500/20 font-mono text-xs"
                        style={{
                            left: drop.left,
                            top: -20,
                            filter: 'blur(2px)',
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
            </motion.div>

            {/* Code rain effect - Layer 2 (mid-ground) */}
            <motion.div style={{ y: yRainLayer2 }} className="absolute inset-0 opacity-8">
                {dropsLayer2.map((drop, i) => (
                    <motion.div
                        key={`layer2-${i}`}
                        className="absolute text-cyan-500/30 font-mono text-sm"
                        style={{
                            left: drop.left,
                            top: -20,
                            filter: 'blur(1px)',
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
            </motion.div>

            {/* Code rain effect - Layer 3 (foreground) */}
            <motion.div style={{ y: yRainLayer3 }} className="absolute inset-0 opacity-10">
                {dropsLayer3.map((drop, i) => (
                    <motion.div
                        key={`layer3-${i}`}
                        className="absolute text-cyan-500/40 font-mono text-base"
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
            </motion.div>

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

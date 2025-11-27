'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function BreakthroughSection() {
    const [nodes, setNodes] = useState<{ top: string; left: string }[]>([]);

    useEffect(() => {
        setNodes(
            [...Array(6)].map((_, i) => ({
                top: `${50 + 40 * Math.sin((i * Math.PI) / 3)}%`,
                left: `${50 + 40 * Math.cos((i * Math.PI) / 3)}%`,
            }))
        );
    }, []);

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl text-center"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 relative"
                >
                    {/* AI Network Visualization */}
                    <div className="relative w-64 h-64 mx-auto">
                        {/* Central node - Pulse animation (lightweight) */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-500 rounded-full blur-xl"
                        />
                        
                        {/* Orbiting nodes - Simplified rotation */}
                        {nodes.map((node, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                animate={{ rotate: 360 }}
                                className="absolute top-1/2 left-1/2 w-full h-full"
                                style={{
                                    transition: 'transform 20s linear infinite', // CSS animation for better performance
                                    animation: `spin 20s linear infinite`,
                                    animationDelay: `-${i * 2}s`
                                }}
                            >
                                <div
                                    className="absolute w-4 h-4 bg-blue-400 rounded-full"
                                    style={{
                                        top: node.top,
                                        left: node.left,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-8"
                >
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Breakthrough</span>
                </motion.h2>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl md:text-3xl text-gray-300 leading-relaxed"
                >
                    One night, 3ssila discovered the power of <span className="text-cyan-400 font-semibold">Artificial Intelligence</span>
                </motion.p>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-xl text-gray-400 mt-6"
                >
                    Machine learning opened a new world of possibilities...
                </motion.p>
            </motion.div>
            <style jsx global>{`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </section>
    );
}

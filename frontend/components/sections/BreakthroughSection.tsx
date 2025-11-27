'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function BreakthroughSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
        <section ref={ref} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 px-8 py-20">
            <motion.div style={{ scale, opacity }} className="max-w-5xl text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 1 }}
                    className="mb-12 relative"
                >
                    {/* AI Network Visualization */}
                    <div className="relative w-64 h-64 mx-auto">
                        {/* Central node */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-500 rounded-full blur-xl"
                        />
                        
                        {/* Orbiting nodes */}
                        {nodes.map((node, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 0.5,
                                }}
                                className="absolute top-1/2 left-1/2 w-full h-full"
                                style={{
                                    transformOrigin: 'center',
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

                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Breakthrough</span>
                </h2>

                <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed">
                    One night, 3ssila discovered the power of <span className="text-cyan-400 font-semibold">Artificial Intelligence</span>
                </p>

                <p className="text-xl text-gray-400 mt-6">
                    Machine learning opened a new world of possibilities...
                </p>
            </motion.div>
        </section>
    );
}

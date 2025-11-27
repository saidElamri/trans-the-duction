'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import ScrambleText from '../animations/ScrambleText';

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

    // Three depth layers for parallax
    const [particlesLayer1, setParticlesLayer1] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);
    const [particlesLayer2, setParticlesLayer2] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);
    const [particlesLayer3, setParticlesLayer3] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);

    useEffect(() => {
        // Far background layer (slowest, most blurred)
        setParticlesLayer1(
            [...Array(5)].map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 4 + Math.random() * 3,
                delay: Math.random() * 2,
            }))
        );
        
        // Mid-ground layer
        setParticlesLayer2(
            [...Array(5)].map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
            }))
        );
        
        // Foreground layer (fastest, sharpest)
        setParticlesLayer3(
            [...Array(5)].map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                duration: 2 + Math.random() * 1.5,
                delay: Math.random() * 2,
            }))
        );
    }, []);

    // Different parallax speeds for each layer
    const yLayer1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);  // Slowest
    const yLayer2 = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);  // Medium
    const yLayer3 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);  // Fastest

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900">
            {/* Layer 1: Far background particles (slowest, most blurred) */}
            <motion.div style={{ y: yLayer1 }} className="absolute inset-0 overflow-hidden">
                {particlesLayer1.map((particle, i) => (
                    <motion.div
                        key={`layer1-${i}`}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            filter: 'blur(2px)',
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </motion.div>

            {/* Layer 2: Mid-ground particles */}
            <motion.div style={{ y: yLayer2 }} className="absolute inset-0 overflow-hidden">
                {particlesLayer2.map((particle, i) => (
                    <motion.div
                        key={`layer2-${i}`}
                        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        style={{
                            left: particle.left,
                            top: particle.top,
                            filter: 'blur(1px)',
                            opacity: 0.6,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </motion.div>

            {/* Layer 3: Foreground particles (fastest, sharpest) */}
            <motion.div style={{ y: yLayer3 }} className="absolute inset-0 overflow-hidden">
                {particlesLayer3.map((particle, i) => (
                    <motion.div
                        key={`layer3-${i}`}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        style={{
                            left: particle.left,
                            top: particle.top,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </motion.div>

            <motion.div style={{ opacity }} className="relative z-10 text-center px-8 max-w-5xl">
                {/* 3ssila Hologram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
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
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                >
                    Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        <ScrambleText text="3ssila" delay={800} scrambleDuration={1200} />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-2xl md:text-3xl text-gray-300 mb-8"
                >
                    <ScrambleText 
                        text="The Fearless AI Who Broke Language Barriers" 
                        delay={1200} 
                        scrambleDuration={1500}
                    />
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="text-gray-400 text-lg"
                >
                    Scroll to discover the journey
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
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

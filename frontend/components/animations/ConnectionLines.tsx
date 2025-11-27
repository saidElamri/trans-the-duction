'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export default function ConnectionLines() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, []);

    // Animate stroke-dashoffset based on scroll
    const strokeDashoffset = useTransform(
        scrollYProgress,
        [0, 1],
        [pathLength, 0]
    );

    // Create curved path connecting sections
    // Sections are roughly at: 0vh, 100vh, 200vh, 300vh, 400vh, 500vh
    const pathData = `
        M 50 10
        Q 30 50, 50 100
        Q 70 150, 50 200
        Q 30 250, 50 300
        Q 70 350, 50 400
        Q 30 450, 50 500
        Q 70 550, 50 600
    `;

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
            <svg
                className="w-full h-full"
                viewBox="0 0 100 700"
                preserveAspectRatio="none"
                style={{ position: 'absolute', top: 0, left: 0 }}
            >
                {/* Glow effect */}
                <defs>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8"/>
                        <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6"/>
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4"/>
                    </linearGradient>
                </defs>

                {/* Background path (static) */}
                <path
                    d={pathData}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.3"
                    opacity="0.2"
                />

                {/* Animated path */}
                <motion.path
                    ref={pathRef}
                    d={pathData}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset: strokeDashoffset,
                    }}
                />

                {/* Connection nodes at section intersections */}
                {[10, 100, 200, 300, 400, 500].map((y, i) => (
                    <motion.circle
                        key={i}
                        cx="50"
                        cy={y}
                        r="1.5"
                        fill="#06b6d4"
                        filter="url(#glow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 0.8]
                        }}
                        transition={{
                            duration: 0.8,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 5,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

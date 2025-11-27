'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type MascotState = 'neutral' | 'thinking' | 'happy' | 'error';

interface TalaMascotProps {
    state: MascotState;
}

const mascotImages: Record<MascotState, string> = {
    neutral: '/tala-pro-neutral.png',
    thinking: '/tala-pro-thinking.png',
    happy: '/tala-pro-neutral.png', // Using neutral with green glow
    error: '/tala-neutral.png' // Fallback to original
};

const glowColors: Record<MascotState, string> = {
    neutral: 'rgba(6, 182, 212, 0.3)', // Cyan
    thinking: 'rgba(59, 130, 246, 0.4)', // Blue
    happy: 'rgba(34, 197, 94, 0.4)', // Green
    error: 'rgba(239, 68, 68, 0.4)' // Red
};

const mascotAnimations: Record<MascotState, any> = {
    neutral: {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    },
    thinking: {
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    },
    happy: {
        scale: [1, 1.15, 1],
        y: [0, -10, 0],
        transition: {
            duration: 0.6,
            repeat: 3,
            ease: 'easeOut'
        }
    },
    error: {
        x: [-3, 3, -3, 3, 0],
        rotate: [-5, 5, -5, 5, 0],
        transition: {
            duration: 0.5,
            repeat: 2
        }
    }
};

export default function TalaMascot({ state }: TalaMascotProps) {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence mode="wait">
                <motion.div
                    key={state}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        ...mascotAnimations[state]
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="relative w-20 h-20 md:w-24 md:h-24"
                >
                    {/* Holographic glow effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="absolute inset-0 rounded-full blur-2xl"
                        style={{
                            backgroundColor: glowColors[state],
                        }}
                    />

                    {/* Mascot image */}
                    <div className="relative w-full h-full">
                        <Image
                            src={mascotImages[state]}
                            alt={`Tala ${state}`}
                            fill
                            className="object-contain"
                            style={{
                                filter: `drop-shadow(0 0 15px ${glowColors[state]}) brightness(1.1)`,
                            }}
                        />
                    </div>

                    {/* Rotating ring for thinking state */}
                    {state === 'thinking' && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 border-2 border-blue-400/30 rounded-full"
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface StorySlideProps {
    title: string;
    description: string;
    slideNumber: number;
    totalSlides: number;
    onNext: () => void;
    isLast: boolean;
    emoji?: string;
}

export default function StorySlide({
    title,
    description,
    slideNumber,
    totalSlides,
    onNext,
    isLast,
    emoji = '🦡'
}: StorySlideProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full text-center text-white"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="text-8xl mb-8"
                >
                    {emoji}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl md:text-2xl mb-12 opacity-90"
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    <button
                        onClick={onNext}
                        className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        {isLast ? 'Start Translating' : 'Next'}
                        <ArrowRight size={20} />
                    </button>

                    <div className="flex gap-2">
                        {Array.from({ length: totalSlides }).map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all ${
                                    idx === slideNumber - 1
                                        ? 'w-8 bg-white'
                                        : 'w-2 bg-white bg-opacity-40'
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

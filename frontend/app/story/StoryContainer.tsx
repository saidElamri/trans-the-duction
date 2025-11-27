'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import StorySlide from './StorySlide';

const slides = [
    {
        title: "Meet 3ssila the Honey Badger",
        description: "3ssila struggled with French and English... Words felt like puzzles he couldn't solve.",
        emoji: "🦡"
    },
    {
        title: "3ssila Discovers AI",
        description: "One night, 3ssila discovered the power of artificial intelligence and machine learning!",
        emoji: "💡"
    },
    {
        title: "Training the Model",
        description: "3ssila worked tirelessly, training his own translation model with neural networks.",
        emoji: "🧠"
    },
    {
        title: "First Success!",
        description: "His first translation worked! 'Hello' became 'Bonjour' in an instant.",
        emoji: "✨"
    },
    {
        title: "Deploying to the World",
        description: "3ssila deployed his model to help everyone translate between French and English.",
        emoji: "🌍"
    },
    {
        title: "Your Turn!",
        description: "Now it's your turn to translate with 3ssila. Let's break down language barriers together!",
        emoji: "🚀"
    }
];

export default function StoryContainer() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();

    const handleNext = () => {
        if (currentSlide === slides.length - 1) {
            // Last slide - redirect to translate page
            router.push('/translate');
        } else {
            setCurrentSlide(prev => prev + 1);
        }
    };

    return (
        <AnimatePresence mode="wait">
            <StorySlide
                key={currentSlide}
                title={slides[currentSlide].title}
                description={slides[currentSlide].description}
                emoji={slides[currentSlide].emoji}
                slideNumber={currentSlide + 1}
                totalSlides={slides.length}
                onNext={handleNext}
                isLast={currentSlide === slides.length - 1}
            />
        </AnimatePresence>
    );
}

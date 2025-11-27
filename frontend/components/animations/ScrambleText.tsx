'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
    text: string;
    className?: string;
    scrambleChars?: string;
    scrambleDuration?: number;
    delay?: number;
    trigger?: boolean;
}

export default function ScrambleText({
    text,
    className = '',
    scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`',
    scrambleDuration = 1000,
    delay = 0,
    trigger = true,
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!trigger) return;

        const startScramble = () => {
            setIsScrambling(true);
            const chars = text.split('');
            const scrambleInterval = 50; // Update every 50ms
            const iterations = scrambleDuration / scrambleInterval;
            let currentIteration = 0;

            intervalRef.current = setInterval(() => {
                if (currentIteration >= iterations) {
                    setDisplayText(text);
                    setIsScrambling(false);
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return;
                }

                // Calculate how many characters should be resolved
                const resolvedCount = Math.floor((currentIteration / iterations) * chars.length);

                const newText = chars
                    .map((char, index) => {
                        // Skip spaces
                        if (char === ' ') return ' ';
                        
                        // Resolve characters from left to right
                        if (index < resolvedCount) {
                            return char;
                        }
                        
                        // Scramble remaining characters
                        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    })
                    .join('');

                setDisplayText(newText);
                currentIteration++;
            }, scrambleInterval);
        };

        const timer = setTimeout(startScramble, delay);

        return () => {
            clearTimeout(timer);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, scrambleChars, scrambleDuration, delay, trigger]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {displayText}
        </motion.span>
    );
}

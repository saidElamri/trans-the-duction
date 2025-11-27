'use client';

import HeroSection from './sections/HeroSection';
import ChallengeSection from './sections/ChallengeSection';
import BreakthroughSection from './sections/BreakthroughSection';
import BuildingSection from './sections/BuildingSection';
import TranslationSection from './sections/TranslationSection';
import CTASection from './sections/CTASection';
import ConnectionLines from './animations/ConnectionLines';

export default function ScrollNarrative() {
    return (
        <div className="relative">
            <ConnectionLines />
            <HeroSection />
            <ChallengeSection />
            <BreakthroughSection />
            <BuildingSection />
            <TranslationSection />
            <CTASection />
        </div>
    );
}

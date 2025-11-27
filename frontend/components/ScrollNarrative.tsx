'use client';

import HeroSection from './sections/HeroSection';
import ChallengeSection from './sections/ChallengeSection';
import BreakthroughSection from './sections/BreakthroughSection';
import BuildingSection from './sections/BuildingSection';
import TranslationSection from './sections/TranslationSection';
import CTASection from './sections/CTASection';

export default function ScrollNarrative() {
    return (
        <div className="relative">
            <HeroSection />
            <ChallengeSection />
            <BreakthroughSection />
            <BuildingSection />
            <TranslationSection />
            <CTASection />
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { getToken } from '../../lib/auth';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
import ErrorBanner from '../../components/ErrorBanner';

export default function TranslatePage() {
    const [text, setText] = useState('');
    const [direction, setDirection] = useState('fr-en');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/auth');
        }
    }, [router]);

    const handleTranslate = async () => {
        setError(null);
        setLoading(true);
        try {
            const data = await api('/translate', 'POST', { text, direction });
            setTranslatedText(data.translated_text);
        } catch (err: any) {
            setError(err.message || 'Translation failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-8">
                <div className="bg-white p-6 rounded shadow-md max-w-2xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Translate</h1>
                    <ErrorBanner message={error} />

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Direction</label>
                        <select
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={direction}
                            onChange={(e) => setDirection(e.target.value)}
                        >
                            <option value="fr-en">French to English</option>
                            <option value="en-fr">English to French</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Text to Translate</label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleTranslate} loading={loading} className="mb-6">
                        Translate
                    </Button>

                    {translatedText && (
                        <div className="bg-green-50 border border-green-200 p-4 rounded">
                            <h3 className="font-bold text-green-800 mb-2">Result:</h3>
                            <p className="text-gray-800">{translatedText}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

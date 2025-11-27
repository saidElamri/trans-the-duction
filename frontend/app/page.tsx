'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to auth page on load
        router.push('/auth');
    }, [router]);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>TalAIt</h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>Translation App</p>
                <p style={{ marginTop: '2rem', opacity: 0.7 }}>Redirecting...</p>
            </div>
        </div>
    );
}

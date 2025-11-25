'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { setToken } from '../../lib/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorBanner from '../../components/ErrorBanner';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const data = await api(endpoint, 'POST', { username, password });

            if (isLogin) {
                setToken(data.access_token);
                router.push('/translate');
            } else {
                setIsLogin(true); // Switch to login after successful register
                alert('Registration successful! Please login.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Register'}</h2>

                <div className="flex mb-4">
                    <button
                        className={`flex-1 py-2 ${isLogin ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 ${!isLogin ? 'border-b-2 border-blue-500 font-bold' : 'text-gray-500'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                <ErrorBanner message={error} />

                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full" loading={loading}>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

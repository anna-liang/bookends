import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { getUser } from '../api/authService';
import { SocialButton } from '@/components/base/buttons/social-button';
import SearchBar from './search/searchBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Spine',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {user ? (
          children
        ) : (
          <div className="flex min-h-screen items-center justify-center flex-col">
            <a href={`${process.env.NEXT_PUBLIC_DEV_API_URL}/auth/google`}>
              <SocialButton social="google" theme="brand">
                Sign in with Google
              </SocialButton>
            </a>
            <SearchBar />
          </div>
        )}
      </body>
    </html>
  );
}

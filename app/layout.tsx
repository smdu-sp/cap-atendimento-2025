/** @format */

import type { Metadata } from 'next';
import { Sora } from 'next/font/google';
import './globals.css';

import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

const sora = Sora({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
	display: 'swap',
	adjustFontFallback: false,
});

export const metadata: Metadata = {
	title: 'Atendimento',
	description: 'CAP - Atendimento',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='pt-BR'
			suppressHydrationWarning>
			<body className={`${sora.className} antialised `}>
				<AuthProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange>
						{children}
						<Toaster richColors />
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

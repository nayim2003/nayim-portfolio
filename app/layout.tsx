import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import ToastProvider from '@/components/ui/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Md. Nayim Howlader | Data Science Portfolio',
  description: 'Statistics professional and Data Analyst specializing in Python, SQL, statistical analysis, machine learning, and data-driven solutions.',
  authors: [{ name: 'Md. Nayim Howlader' }],
  keywords: ['Data Analyst', 'Machine Learning', 'Python', 'SQL', 'Statistics', 'Bangladesh'],
  openGraph: {
    type: 'website',
    title: 'Md. Nayim Howlader | Data Science Portfolio',
    description: 'Statistics professional and Data Analyst.',
    images: ['/assets/profile.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`
        }} />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}

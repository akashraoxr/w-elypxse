import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://elypxse.space'), // Replace with your actual domain once deployed
  title: {
    default: "ELYPXSE DEVELOPMENTS | Stealth Mode",
    template: "%s | ELYPXSE"
  },
  description: "Elypxse Developments is redefining digital experiences. Currently operating in stealth mode. Discover the extraordinary digital landscape being crafted.",
  keywords: ["Elypxse", "Elypxse Developments", "Digital Experiences", "Creative Agency", "Stealth Mode", "Web Development", "Next.js", "3D Web Design"],
  authors: [{ name: "Elypxse" }],
  creator: "Elypxse Developments",
  publisher: "Elypxse Developments",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ELYPXSE DEVELOPMENTS",
    description: "Redefining digital experiences. Elypxse Developments is currently operating in stealth mode. Stay tuned for the unveiling.",
    url: "https://elypxse.space",
    siteName: "ELYPXSE",
    images: [
      {
        url: "/icon.png", 
        width: 1200,
        height: 630,
        alt: "Elypxse Developments Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELYPXSE DEVELOPMENTS",
    description: "Redefining digital experiences. Operating in stealth mode.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.target && mutation.target.hasAttribute && mutation.target.hasAttribute('bis_skin_checked')) {
                      mutation.target.removeAttribute('bis_skin_checked');
                    }
                  });
                });
                observer.observe(document.documentElement, {
                  attributes: true,
                  subtree: true,
                  attributeFilter: ['bis_skin_checked']
                });
              }
            `
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

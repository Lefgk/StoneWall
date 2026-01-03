import './globals.css'

export const metadata = {
  metadataBase: new URL('https://stonewall.vercel.app'),
  title: {
    default: 'Stonewall | Web3 Security',
    template: '%s | Stonewall'
  },
  description: 'Immovable Web3 security. Smart contract audits that stand unbreakable. Protecting DeFi protocols from vulnerabilities.',
  keywords: ['web3 security', 'smart contract audit', 'blockchain security', 'defi audit', 'solidity audit', 'stonewall'],
  authors: [{ name: 'Stonewall' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Stonewall | Web3 Security',
    description: 'Immovable Web3 security. Smart contract audits that stand unbreakable.',
    url: 'https://stonewall.vercel.app',
    siteName: 'Stonewall',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stonewall | Web3 Security',
    description: 'Immovable Web3 security. Smart contract audits that stand unbreakable.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}

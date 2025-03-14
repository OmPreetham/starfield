import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Starfield',
  description: 'An interactive starfield animation with customizable stars',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

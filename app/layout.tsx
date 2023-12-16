import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import ToasterProvider from '@/providers/ToasterProvider'
import Provider from '@/providers/AuthProvider'
import CampaignModal from './components/campaign-modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pinned Ads',
  description: 'Pinned Ads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider session={undefined}>
      <ToasterProvider/>
      <CampaignModal/>
        {children}
       </Provider>
        </body>
    </html>
  )
}

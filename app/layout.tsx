import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import ToasterProvider from '@/providers/ToasterProvider'
import Provider from '@/providers/AuthProvider'
import CampaignModal from './components/campaign-modal'
import getCurrentUser from '@/actions/get-current-user'
import FacebookSDK from './components/FacebookSDK'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pinned Ads',
  description: 'Pinned Ads',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
      <Provider session={undefined}>
      <ToasterProvider/>
      <CampaignModal currentUser={currentUser}/>
        {children}
       </Provider>
        </body>
    </html>
  )
}

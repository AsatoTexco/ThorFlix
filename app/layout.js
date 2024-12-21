 
import { Inter } from "next/font/google";
import "./globals.css"; 
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { getServerSession } from "next-auth";
import SessionProvider from '../components/SessionProvider'

const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "ThorFlix, um projeto sensacional!",
  description: "Projeto criado por Arthur Simões :)",
};

export default async function RootLayout({ children }) { 

  const session = await getServerSession()
  return ( 
      <html lang="pt">
        <body className={inter.className}>
          <SessionProvider session={session}>
            {children}
            <Analytics />
            <SpeedInsights />
          </SessionProvider>
        </body>
      </html>
    
  );
} 
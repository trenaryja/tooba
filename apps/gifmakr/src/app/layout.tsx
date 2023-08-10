import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gif Makr',
  description: 'Convert videos to gifs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`grid my-5 gap-5 place-items-center grid-cols-[1fr_min(80ch,_100%)_1fr] [&>*]:col-start-2 [&>*]:col-end-2`}
      >
        {children}
      </body>
    </html>
  )
}

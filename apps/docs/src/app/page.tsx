import { Metadata } from 'next'
import { Button } from 'ui'

export const metadata: Metadata = {
  title: 'Docs - Turborepo Example',
}

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <main className='w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8'>
        <Button />
      </main>
    </div>
  )
}

'use client'

import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { useEffect, useRef, useState } from 'react'
import { Button, FileUpload, Spinner } from '../components'

const ffmpeg = new FFmpeg()

const fileFormats = {
  mp4: {
    extension: 'mp4',
    mimeType: 'video/mp4',
  },
  webm: {
    extension: 'webm',
    mimeType: 'video/webm',
  },
  gif: {
    extension: 'gif',
    mimeType: 'image/gif',
  },
  mkv: {
    extension: 'mkv',
    mimeType: 'video/x-matroska',
  },
} as const

export default function Home() {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const [inputFile, setInputFile] = useState<File>()
  const [output, setOutput] = useState<string>()

  const video = useRef<HTMLVideoElement>(null)
  const storyboard = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = async () => {
      await ffmpeg.load()
      setReady(true)
    }
    load()
  }, [])

  const convert = async () => {
    try {
      setLoading(true)
      await ffmpeg.writeFile('test.mp4', await fetchFile(inputFile))
      await ffmpeg.exec(['-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', `out.gif`])
      const data = await ffmpeg.readFile(`out.gif`)
      const url = URL.createObjectURL(new Blob([data], { type: 'image/gif' }))
      setOutput(url)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const capture = () => {
    if (!inputFile || !video.current) return
    const canvas = document.createElement('canvas')
    canvas.width = video.current?.videoWidth ?? 0
    canvas.height = video.current?.videoHeight ?? 0
    canvas.getContext('2d')?.drawImage(video.current, 0, 0, video.current.videoWidth, video.current.videoHeight)
    canvas.toBlob((blob: any) => {
      const img = new Image()
      const url = URL.createObjectURL(blob)
      img.onload = () => {
        URL.revokeObjectURL(url)
      }
      img.src = url
      storyboard.current?.appendChild(img)
    })
  }

  if (!ready) return <Spinner />

  return (
    <>
      <FileUpload onChange={(files) => setInputFile(files?.item(0) ?? undefined)} />

      {inputFile && (
        <>
          <video onPause={() => capture()} ref={video} className='full-bleed' controls>
            <source src={URL.createObjectURL(inputFile)} />
          </video>

          <div ref={storyboard} className='grid grid-flow-col' />

          <Button onClick={() => convert()}>Convert</Button>
        </>
      )}

      {loading && <Spinner />}

      {output && <img src={output} />}
    </>
  )
}

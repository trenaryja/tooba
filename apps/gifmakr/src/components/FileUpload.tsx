import { ChangeEvent, DragEvent, useRef, useState } from 'react'

const CloudUploadIcon = () => (
  <svg
    className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 20 16'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
    />
  </svg>
)

type FileUploadProps = {
  onChange?: (files: FileList | null) => void
}

export const FileUpload = ({ onChange }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
      return
    }

    if (e.type === 'dragleave') {
      setDragActive(false)
      return
    }

    if (e.type === 'drop') {
      setDragActive(false)
      onChange?.(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.files)

  return (
    <div className='relative flex items-center justify-center w-full' onDragEnter={(e) => handleDragDrop(e)}>
      <label
        htmlFor='dropzone-file'
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
          dragActive ? 'border-blue-500 dark:border-blue-400 dark:hover:border-blue-300 dark:hover:bg-blue-400' : ''
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
          <CloudUploadIcon />
          <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
            <span className='font-semibold'>Click to upload</span> or drag and drop
          </p>
        </div>
        <input ref={inputRef} type='file' className='hidden' onChange={handleFileChange} />
      </label>
      {dragActive && (
        <div
          className='absolute inset-0 w-full h-full bg-blue-500 rounded-lg bg-opacity-10 dark:bg-blue-400 dark:bg-opacity-10'
          onDrag={handleDragDrop}
          onDragLeave={handleDragDrop}
          onDragOver={handleDragDrop}
          onDrop={handleDragDrop}
        ></div>
      )}
    </div>
  )
}

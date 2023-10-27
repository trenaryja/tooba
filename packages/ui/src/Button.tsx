export const Button = () => {
  return (
    <div className='rounded-md '>
      <a href='https://turbo.build/repo/docs'>
        <div className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-black no-underline bg-white border border-transparent rounded-md hover:bg-gray-300 md:py-3 md:px-10 md:text-lg md:leading-6'>
          Read the docs
          <span className='ml-2'>→</span>
        </div>
      </a>
    </div>
  )
}

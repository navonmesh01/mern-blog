import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about Javascript
            </h2>
            <p className='text-gray-500 my-2'>
                Check out these resources with blah blah
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none '><a href="https://github.com/navonmesh01" target='_blank' rel='noopener noreferrer'>LEARN MORE</a></Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://img.freepik.com/free-photo/toy-bricks-table-with-word-blog_144627-47465.jpg" alt="" />
        </div>
    </div>
  )
}

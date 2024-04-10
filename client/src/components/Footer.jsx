import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsMeta, BsInstagram, BsTwitterX, BsGithub, BsDribbble } from 'react-icons/bs';
export default function FooterCom() {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className="w-full max-w-7xl mx-auto ">
                <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                    <div className="mt-5">
                        <Link to="/" className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Navam's</span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col >
                                <Footer.Link href='https://nexusacadbud.tech/' target='_blank' rel='noopener noreferrer' className='hover:text-sky-700'>
                                    Nexus
                                </Footer.Link>
                                <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'className='hover:text-sky-700'>
                                    Navam's Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow Us' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://github.com/navonmesh01' target='_blank' rel='noopener noreferrer'className='hover:text-sky-700'>
                                    GitHub
                                </Footer.Link>
                                <Footer.Link href='#' className='hover:text-sky-700'>
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='#' className='hover:text-sky-700'>
                                    Privacy Policy
                                </Footer.Link>
                                <Footer.Link href='#' className='hover:text-sky-700'>
                                    Terms & condition
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by="Navam's Blog" year={new Date().getFullYear()} />
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsMeta} className='hover:text-sky-700' />
                        <Footer.Icon href='#' icon={BsTwitterX} className='hover:text-black' />
                        <Footer.Icon href='https://www.instagram.com/navonmesh1103' target='_blank' icon={BsInstagram} className='hover:text-pink-700' />
                        <Footer.Icon href='https://www.github.com/navonmesh01' target='_blank' icon={BsGithub} className='hover:text-black' />
                        <Footer.Icon href='#' icon={BsDribbble} className='hover:text-pink-700' />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

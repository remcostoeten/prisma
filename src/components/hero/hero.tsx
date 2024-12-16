"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { EvervaultCard, Icon } from './matrix'

const AuthShowcaseSection: React.FC = () => {
	return (
		<section className="w-full bg-[#0d0c0c] flex flex-col justify-center items-center py-20 md:py-40 px-4 md:px-10 relative overflow-hidden">
			<div className="w-full max-w-[1440px] flex flex-col md:flex-row items-start relative">
				<div className="w-full md:w-[30%] lg:w-[25%] flex flex-col justify-between self-start md:sticky top-0 pt-[40px] md:pt-[106px] pb-10">
					<h2 className="text-[#f2f0ed] text-3xl md:text-4xl font-normal leading-tight mb-8 md:mb-[400px] lg:mb-[579px]">
						Roll your own authentication in Next.js
					</h2>
					<p className="text-[#8c877d] text-lg md:text-xl leading-snug">
						A comprehensive showcase of implementing secure, scalable authentication in Next.js applications.
					</p>
				</div>
				<div className="w-full md:w-[70%] lg:w-[75%] relative">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 relative">
						{/* Main Feature Card */}
						<Link href="/auth-overview" className="col-span-1 md:col-span-3 flex flex-col justify-between items-stretch min-h-[269px] text-[#f2f0ed] text-[22px] leading-[1.1em] p-8 pt-10 pb-[30px] mt-[-3px] relative z-[3]">
							<div className="flex flex-col justify-between text-[#8c877d] text-lg relative z-[2]">
								<div className="flex flex-col">
									<div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 mb-3">
										<h3 className="text-[#f2f0ed] uppercase text-lg leading-[1.24em] m-0">Authentication Overview</h3>
										<span className="bg-[#ff4800] text-[#0d0c0c] uppercase text-xs leading-[1.4em] tracking-[0.02em] rounded-full px-2.5 py-1">Core</span>
									</div>
									<div>
										Understand the fundamentals of authentication in Next.js applications.
									</div>
								</div>
							</div>
							<div className="absolute inset-0 border border-dashed border-[#8c877d] border-b-0 z-[1]"></div>
							<motion.div
								className="absolute inset-[-1.5px] bg-[#0d0c0c] border border-solid border-[#0d0c0c] z-[2] opacity-0 hover:opacity-100 transition-opacity duration-200"
								initial={{ opacity: 0 }}
								whileHover={{ opacity: 1 }}
								transition={{ duration: 0.2 }}
							>
								<div className="absolute inset-0 border border-dotted border-[#f2f0ed]"></div>
							</motion.div>
							<div className="absolute inset-[-0.5px] top-0.5 border-2 border-solid border-[#ff4800] opacity-0 transition-opacity duration-200 z-[2]"></div>
						</Link>

						{[
							{ title: 'JWT Implementation', desc: 'Learn how to implement JWT-based authentication.' },
							{ title: 'OAuth Integration', desc: 'Integrate OAuth providers for social login capabilities.' },
							{ title: 'Passwordless Auth', desc: 'Implement secure passwordless authentication flows.' },
							{ title: 'Role-Based Access', desc: 'Set up role-based access control for your app.' },
							{ title: 'Security Best Practices', desc: 'Explore best practices for secure authentication.' }
						].map((item, index) => (
							<Link key={item.title} href={`/${item.title.toLowerCase().replace(' ', '-')}`} className="flex flex-col justify-between items-stretch min-h-[269px] text-[#f2f0ed] text-[22px] leading-[1.1em] p-8 relative">
								<div className="flex flex-col justify-between text-[#8c877d] text-lg relative z-[2]">
									<div className="flex flex-col">
										<div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 mb-3">
											<h3 className="text-[#f2f0ed] uppercase text-lg leading-[1.24em] m-0">{item.title}</h3>
										</div>
										<div className="mb-8">{item.desc}</div>
									</div>
									<div className="tool-link-arrow">
										<ArrowUpRight className="w-5 h-5" />
									</div>
								</div>
								<div className={`absolute inset-0 border border-dashed border-[#8c877d] ${index >= 3 ? 'border-b-[1px]' : 'border-b-0'} z-[1]`}></div>
								<motion.div
									className="absolute inset-[-1.5px] bg-[#0d0c0c] border border-solid border-[#0d0c0c] z-[2] opacity-0 hover:opacity-100 transition-opacity duration-200"
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 1 }}
									transition={{ duration: 0.2 }}
								>
									<div className="absolute inset-0 border border-dotted border-[#f2f0ed]"></div>
								</motion.div>
								<div className={`absolute inset-[-0.5px] border-2 border-solid border-[#ff4800] opacity-0 transition-opacity duration-200 z-[2] ${index === 5 ? 'border-b-2' : ''}`}></div>
							</Link>
						))}

						{/* Coming Soon Card */}
						<div className="flex flex-col justify-between items-stretch min-h-[269px] text-[#f2f0ed] text-[22px] leading-[1.1em] p-8 relative opacity-50">
							<div className="flex flex-col justify-between text-[#8c877d] text-lg relative z-[2]">
								<div className="flex flex-col">
									<div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 mb-3">
										<h3 className="text-[#f2f0ed] uppercase text-lg leading-[1.24em] m-0">Advanced Topics</h3>
										<span className="text-[#45403d] text-[9px] leading-[1.4em] tracking-[0.02em] uppercase border border-[#45403d] rounded-full px-[7px] py-[2px]">Soon</span>
									</div>
									<div className="mb-8">Explore advanced authentication patterns and techniques.</div>
								</div>
							</div>
							<div className="absolute inset-0 border border-dashed border-[#8c877d] opacity-50 z-[1]"></div>
						</div>
					</div>
				</div>
			</div>

		</section>
	)
}

export default AuthShowcaseSection


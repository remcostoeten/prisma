'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { siteConfig } from '@/core/config/site'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/shared/components/ui/tooltip'

export default function AuthQuote() {
	return (
		<motion.div
			className="border-l border-neutral-800 box-shadow-lg hidden lg:flex bg-[#0f0f0f] relative overflow-hidden"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.7, delay: 0.5 }}
		>
			<div className="relative flex items-center w-full">
				<motion.div
					className="relative px-12 py-24"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.8 }}
				>
					<figure className="space-y-6 max-w-lg">
						<div className="absolute left-0 top-0 text-4xl text-white opacity-50">
							&ldquo;
						</div>
						<div className="absolute right-0 bottom-0 text-4xl text-white opacity-50">
							&rdquo;
						</div>
						<motion.blockquote
							className="text-1xl text-white/90 border-l-4 border-b-4 border-white pl-4 pb-4 bg-black"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.7, delay: 1 }}
						>
							<p>
								Finally, an authentication solution that works
								seamlessly, free from library deprecations,{' '}
								<Tooltip>
									<TooltipTrigger className="border-b border-dashed border-neutral-600">
										useless documentation
									</TooltipTrigger>
									<TooltipContent className="border-b border-dashed border-neutral-600">
										Many libraries suffer from unclear,
										outdated, or incomplete docs. We solve
										that with well-maintained and clear
										documentation.
									</TooltipContent>
								</Tooltip>
								,{' '}
								<Tooltip>
									<TooltipTrigger className="border-b border-dashed border-red-600">
										endless patching
									</TooltipTrigger>
									<TooltipContent className="border-b border-dashed border-neutral-600">
										Stop spending hours fixing breaking
										changes. Our solution prioritizes
										stability and long-term support.
									</TooltipContent>
								</Tooltip>
								, and giving you full{' '}
								<Tooltip>
									<TooltipTrigger className="border-b border-dashed border-red-600">
										ownership of your data
									</TooltipTrigger>
									<TooltipContent className="border-b border-dashed border-neutral-600">
										Keep control of your data without
										relying on third-party services. Your
										data, your rules.
									</TooltipContent>
								</Tooltip>
								!
							</p>
						</motion.blockquote>
						<motion.figcaption
							className="flex items-center gap-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.7, delay: 1.2 }}
						>
							<Image
								src="/remco.jpeg"
								alt="@JP_Gallegos"
								width={48}
								height={48}
								className="rounded-full"
							/>
							<div className="flex flex-col gap-">
								<cite className="text-white/90 font-medium not-italic">
									{siteConfig.quote.name}
								</cite>
								<span className="text-sm text-white/50 hover:text-white/70 text-[16px] transition-colors">
									Definitely not the author
								</span>
							</div>
						</motion.figcaption>
					</figure>
				</motion.div>
			</div>
		</motion.div>
	)
}

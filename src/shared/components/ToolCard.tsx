'use client'

import { MouseEvent, ElementType, forwardRef } from 'react'

type ToolCardProps = {
	title: string
	description: string
	isNew?: boolean
	isComingSoon?: boolean
	href?: string
	image?: string
}

const ToolCard = forwardRef<HTMLElement, ToolCardProps>(
	({ title, description, isNew, isComingSoon, href }, ref) => {
		const Component = href ? 'a' : ('div' as ElementType)
		const cardProps = href
			? { href, target: '_blank', rel: 'noopener noreferrer' }
			: { className: 'cursor-not-allowed' }

		const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
			if (!ref || !('current' in ref) || !ref.current) return

			const box = ref.current
			const rect = box.getBoundingClientRect()

			const x = e.clientX - rect.left
			const y = e.clientY - rect.top

			const centerX = rect.width / 2
			const centerY = rect.height / 2
			const radius = Math.max(rect.width, rect.height) * 0.7

			const normalizedX = ((x - centerX) / radius) * 100
			const normalizedY = ((y - centerY) / radius) * 100
			console.log(normalizedX, normalizedY)
		}

		const handleMouseLeave = () => {
			if (!ref || !('current' in ref) || !ref.current) return
		}

		return (
			<Component
				{...cardProps}
				ref={ref}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className={`max-w-full inline-block w-full min-h-[269px] text-[rgb(242,240,237)] tracking-[0px] flex-col flex-1 justify-between items-stretch text-[22px] leading-[1.1em] relative bg-transparent font-normal no-underline box-border pt-[32px] pb-[24px] px-[24px] focus:outline-offset-0 hover:outline-offset-1 hover:outline-1 hover:outline-[rgb(242,240,237)] xl:inline xl:min-h-[314px] xl:pt-[40px] xl:pb-[30px] xl:px-[36px] ${
					title === 'Platform'
						? 'z-[3] mt-[-3px] xl:pt-[107px] xl:pb-0'
						: ''
				} transition-all duration-300 ease-in-out hover:bg-[rgba(255,72,0,0.1)] group`}
			>
				<div className="z-[2] w-full text-[rgb(140,135,125)] flex-col flex-1 justify-between text-[18px] flex relative box-border h-full">
					<div className="flex-col justify-start items-start flex relative box-border">
						<div className="gap-[8px_14px] flex-wrap items-center flex box-border mb-[12px]">
							<h3 className="text-[rgb(242,240,237)] tracking-[0px] uppercase text-[24px] leading-[1.24em] font-bold box-border mt-[20px] mb-0 xl:text-[19px]">
								{title}
							</h3>
							{isNew && (
								<div className="text-[rgb(13,12,12)] tracking-[0.02em] uppercase bg-[rgb(255,72,0)] text-[12px] leading-[1.4em] box-border px-[10px] py-[4px] rounded-[26px]">
									New
								</div>
							)}
							{isComingSoon && (
								<div className="text-[rgb(69,64,61)] bg-[rgba(255,255,255,0)] border text-[9px] tracking-[0.02em] uppercase leading-[1.4em] box-border px-[7px] py-[2px] rounded-[26px] border-solid border-[rgb(69,64,61)]">
									SOON
								</div>
							)}
						</div>
						<div className="box-border mb-[32px]">
							{description}
						</div>
					</div>
					{href && (
						<div className="w-full flex justify-end items-end mt-auto">
							<div className="w-[20px] h-[20px] text-[rgb(140,135,125)] transition-all duration-300 ease-in-out hover:text-[rgb(255,72,0)]">
								<svg
									width="100%"
									height="100%"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="overflow-hidden box-border"
								>
									<path
										d="M1.05713 1.01123V12.8699H18.2679"
										stroke="CurrentColor"
										strokeLinecap="square"
										strokeLinejoin="bevel"
										className="box-border"
									/>
									<path
										d="M13.467 7.35416L18.9826 12.8699"
										stroke="CurrentColor"
										strokeLinecap="square"
										strokeLinejoin="bevel"
										className="box-border"
									/>
									<path
										d="M18.9825 12.8701L13.467 18.3856"
										stroke="CurrentColor"
										strokeLinecap="square"
										strokeLinejoin="bevel"
										className="box-border"
									/>
								</svg>
							</div>
						</div>
					)}
				</div>
			</Component>
		)
	}
)

ToolCard.displayName = 'ToolCard'

export default ToolCard

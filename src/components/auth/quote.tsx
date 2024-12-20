'use client'

import Image from 'next/image'
import { Tooltip } from '@/shared/components/custom'

type TooltipItemProps = {
	trigger: string
	content: string
	style?: string
}

const authSatire = [
	{
		name: "useless docs",
		description: "😮‍💨😮‍💨 nextauth, not everyone has a phd in cryptography"
	},
	{
		name: "broken adapters",
		description: "authjs? or is that the same as nextauth? 😮‍💨😮‍💨"
	},
	{
		name: "vendor lock-in",
		description: "e-penor shrinks. Auth services are like an adult cycling with training wheels"
	},
	{
		name: "absurd pricing",
		description: "Not that we will go beyond 1 user and 20 test accounts but whatever."
	},
	{
		name: "feature bloat",
		description: "have you seen google their maze.. i mean dashboard?"
	},
	{
		name: "deprecation",
		description: "All around me are familiar faces.... RiP lucia"
	}
] as const

function TooltipItem({ trigger, content, style = '' }: TooltipItemProps) {
	const tooltipClasses = [
		'max-w-sm bg-[var(--background-secondary)] text-xs p-2 rounded-md',
		'border border-[var(--input-border)] shadow-xl',
		'after:content-[\'\'] after:absolute after:top-full',
		'after:left-1/2 after:-ml-1 after:border-4',
		'after:border-transparent after:border-t-[var(--background-secondary)]'
	].join(' ')

	return (
		<Tooltip
			content={content}
			theme="dark"
			placement="top"
			className={tooltipClasses}
			animate={true}
			showDelay={100}
			dashedBorderBottom={true}
		>
			<button className={`${style} hover:text-[var(--accent-blue)] relative`}>
				{trigger}
				<span className="absolute bottom-0 left-0 w-full border-b border-dashed border-current opacity-60"></span>
			</button>
		</Tooltip>
	)
}

export default function Quote() {
	return (
		<aside className="!bg-bg border-border border-l hidden xl:flex flex-[1_1_40%] flex-col items-center justify-center">
			<div className="relative flex flex-col gap-6 max-w-2xl">
				<div className="select-none absolute -left-11 -top-2">
					<span className="text-[66px] text-balance leading-none text-[var(--accent-green)]/20" aria-hidden="true">
						&ldquo;
					</span>
				</div>
				<blockquote className="z-10 text-3xl leading-relaxed tracking-tight text-[var(--text-primary)]">
					Finally! An auth that has NO{' '}
					{authSatire.map((point, index) => (
						<span key={point.name}>
							<TooltipItem
								trigger={point.name}
								content={point.description}
								style="px-1 py-0 h-auto text-[var(--accent-green)] hover:text-[var(--accent-green)]/80"
							/>
							{index < authSatire.length - 1 && (
								<span className="text-[var(--text-secondary)] mx-2">or</span>
							)}
						</span>
					))}
				</blockquote>
				<a
					href="https://twitter.com/yowremco"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity"
				>
					<Image
						src="/remco.jpeg"
						alt="Avatar"
						width={40}
						height={40}
						className="rounded-full"
					/>
					<div className="flex flex-col gap-">
						<cite className="text-[var(--text-primary)]/90 font-medium not-italic">
							@remcostoeten
						</cite>
						<span className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]/70 text-[16px] transition-colors">
							Definitely not the author
						</span>
					</div>
				</a>
			</div>
		</aside>
	)
}

	
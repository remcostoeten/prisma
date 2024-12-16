import Hero from '@/components/hero/hero'
import { EvervaultCard, Icon } from '@/components/hero/matrix'
import ToolGrid from '@/shared/components/ToolGrid'

export default function Home() {
	return (
		<div className="bg-neutral-900">
			<div className="text-[rgb(51,51,51)] bg-[rgba(13,12,12,0)] z-[2] relative w-full flex-col justify-center items-center flex box-border px-[40px] py-[156px]">
				<Hero />
				<div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] mt-20 overflow-hidden">
					<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
					<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
					<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
					<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

					<EvervaultCard text="hover" />

					<h2 className="dark:text-white text-black mt-4 text-sm font-light">
						Hover over this card to reveal an awesome effect. Running out of copy
						here.
					</h2>
					<p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
						Watch me hover
					</p>
				</div>				<ToolGrid />
			</div>
		</div>
	)
}

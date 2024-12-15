import Hero from '@/components/hero/hero'
import ToolGrid from '@/shared/components/ToolGrid'

export default function Home() {
	return (
		<div className="bg-neutral-900">
			<div className="text-[rgb(51,51,51)] bg-[rgba(13,12,12,0)] z-[2] relative w-full flex-col justify-center items-center flex box-border px-[40px] py-[156px]">
				<Hero />
				<ToolGrid />
			</div>
		</div>
	)
}

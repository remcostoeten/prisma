import { toolData } from '../../../docs/data/toolData'
import ToolCard from './ToolCard'

export default function ToolGrid() {
	return (
		<div className="z-[2] w-full relative overflow-hidden box-border pb-[2px]">
			<div className="z-[2] w-full gap-0 grid-rows-[auto] grid-cols-[1fr_1fr_1fr] auto-cols-[1fr] grid relative box-border pl-[2px] pb-[2px] border-l-0 border-l-[rgb(140,135,125)] border-t-[rgb(140,135,125)] border-b-[rgb(13,12,12)] border-y-0 border-dashed left-[2px]">
				{toolData.map((tool, index) => (
					<ToolCard key={index} {...tool} />
				))}
			</div>
			<div className="h-px absolute box-border border-t-[rgb(140,135,125)] border-t border-dashed bottom-[3.5px] inset-x-[10px]" />
			<div className="w-[200px] h-[20px] bg-[linear-gradient(90deg,rgb(13,12,12),rgba(13,12,12,0))] inset-[-5px_0px_-5px_5px] z-[5] absolute box-border" />
			<div className="w-full h-[10px] bg-[rgb(13,12,12)] absolute bottom-[-5px] box-border left-0" />
		</div>
	)
}

import { Image } from "lucide-react";

const Quote = () => {
	return (
		<aside className="bg-[rgb(15,15,15)] hidden flex-[1_1_25%] flex-col items-center justify-center box-border xl:flex">
			<div className="relative flex flex-col gap-6 box-border">
				<div className="absolute select-none box-border -left-11 -top-12">
					<span className="text-[160px] leading-none box-border">“</span>
				</div>
				<blockquote className="z-10 max-w-lg text-3xl leading-9 box-border m-0">
					It’s fun, feels lightweight, and really quick to spin up user auth and a
					few tables. Almost too easy! Highly recommend.
				</blockquote>
				<a href="https://twitter.com/nerdburn/status/1356857261495214085" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 box-border">
					<Image srcSet="/remco.jpeg" alt="Remco" className="w-10 h-10 rounded-full" />
					<div className="flex flex-col box-border">
						<cite className="whitespace-nowrap font-medium box-border">@nerdburn</cite>
					</div>
				</a>
	</div>
  </aside>
  
)}
export default Quote;
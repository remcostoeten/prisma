'use client'

export default function Hero() {
	return (
		<div className="items-start flex z-[1] max-w-[1440px] gap-[16px] grid-rows-[auto] grid-cols-[1fr_1fr_1fr_1fr_1fr] auto-cols-[1fr] relative w-full box-border">
			<div className="max-w-[35vw] flex-col justify-between self-start flex sticky box-border pt-[106px] pb-[30px] top-0">
				<h2 className="text-[rgb(242,240,237)] tracking-[-0.02em] text-[40px] font-normal leading-[1.05em] box-border mt-[20px] mb-[400px] xl:mb-[500px]">
					Developer tools that bring web3 to Bitcoin.
				</h2>
				<p className="text-[rgb(140,135,125)] tracking-[0.02em] text-[20px] leading-[1.2em] font-normal box-border my-0 xl:top-[209px]">
					Powered by
					<a
						href="https://web.archive.org/web/20230902145259/http://stacks.co/"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-transparent text-[rgb(255,72,0)] flex-row justify-center items-center font-normal no-underline box-border focus:outline-offset-0 xl:inline"
					>
						<span className="text-[rgb(207,201,194)] box-border">
							Stacks
						</span>
					</a>
					, Bitcoin&apos;s L2 for fully expressive smart contracts.
				</p>
			</div>
		</div>
	)
}

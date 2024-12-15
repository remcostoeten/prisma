'use client'

export default function Hero() {
	return (
		<div className="relative z-[2] flex w-full flex-col items-center justify-center bg-[rgba(13,12,12,0)] px-[40px] py-[156px] text-[rgb(51,51,51)]">
			<div className="relative z-[1] flex w-full max-w-[1440px] auto-cols-[1fr] grid-cols-[1fr_1fr_1fr_1fr_1fr] grid-rows-[auto] items-start gap-[16px]">
				<div className="sticky top-0 flex max-w-[35vw] flex-col justify-between self-start pb-[30px] pt-[106px]">
					<h2 className="mb-[400px] mt-[20px] box-border text-[40px] font-normal leading-[1.05em] tracking-[-0.02em] text-[rgb(242,240,237)] xl:mb-[500px]">
						Build something great
					</h2>
				</div>
			</div>
		</div>
	)
}

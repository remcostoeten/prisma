    /**
     * @title Landing Hero Section: Bento-Inspired Grid of Cards
     * 
     * @note Acknowledgment for the static (non-hover) design grid goes to https://hiro.so. The design is deprecated but they had a similar design concept. 
     * 
     * @author Accent Color Picker Team (accent-color-picker.tsx)
     */
    "use client"

    import { CARD_ITEMS } from "../../../../../constants/defaults"
    import { AuthCard } from "./auth-card"
    import { CardItem } from "./card-item"

    export default function AuthShowcaseSection() {
        return (
            <section className="w-full bg-[#0d0c0c] flex flex-col justify-center items-center py-20 md:py-40 px-4 md:px-10 relative overflow-hidden">
                <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-start relative">
                    <div className="w-full md:w-[30%] lg:w-[25%] flex flex-col justify-between self-start md:sticky top-0 pt-[40px] md:pt-[106px] pb-10">
                        <h2 className="text-[#f2f0ed] text-3xl md:text-4xl font-normal leading-tight mb-8 md:mb-[400px] lg:mb-[579px]">
                            Implementing Authentication in Next.js
                        </h2>
                        <p className="text-[#8c877d] text-lg md:text-xl leading-snug">
                            A comprehensive showcase of implementing secure, scalable authentication in Next.js applications.
                        </p>
                    </div>
                    <div className="w-full md:w-[70%] lg:w-[75%] relative">
                        <div className="grid grid-cols-1 md:grid-cols-3 relative">
                            <AuthCard
                                href="/auth-overview"
                                className="col-span-1 md:col-span-3 pt-10 pb-[30px] relative z-[3]"
                                color={{ from: "#4f46e5", to: "#7c3aed" }}
                                strength={0.2}
                                size={400}
                                updateSpeed={40}
                                borders={{ top: true, right: true, bottom: true, left: true }}
                            >
                                <div className="flex flex-col justify-between h-full text-[#8c877d] text-lg relative z-[2]">
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
                            </AuthCard>
                            <div className="col-span-full grid grid-cols-1 md:grid-cols-3">
                                {CARD_ITEMS.map((item, index) => (
                                    <CardItem
                                        key={item.title}
                                        {...item}
                                        index={index}
                                        isLast={index === CARD_ITEMS.length - 1}
                                        borders={{
                                            top: true,
                                            right: index % 3 !== 2,
                                            bottom: index < CARD_ITEMS.length - 3,
                                            left: index % 3 === 0
                                        }}
                                    />
                                ))}

                                    <AuthCard
                                    className="opacity-50"
                                    color="#374151"
                                    strength={0.1}
                                    size={200}
                                    updateSpeed={60}
                                    borders={{
                                        top: true,
                                        right: true,
                                        bottom: true,
                                        left: true
                                    }}
                                >
                                    <div className="flex flex-col justify-between h-full text-[#8c877d] text-lg relative z-[2]">
                                        <div className="flex flex-col">
                                            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 mb-3">
                                                <h3 className="text-[#f2f0ed] uppercase text-lg leading-[1.24em] m-0">Advanced Topics</h3>
                                                <span className="text-[#45403d] text-[9px] leading-[1.4em] tracking-[0.02em] uppercase border border-[#45403d] rounded-full px-[7px] py-[2px]">Soon</span>
                                            </div>
                                            <div className="mb-8">Explore advanced authentication patterns and techniques.</div>
                                        </div>
                                    </div>
                                </AuthCard>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

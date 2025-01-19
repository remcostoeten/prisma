import React from 'react'
import AuthHeader from '@/features/dashboard/components/layout/header/swapping-words-logo'
import Image from 'next/image'

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <AuthHeader />
      <div className="flex min-h-screen">
        <LeftSideAuthForm title="Welcome back" subtitle="Sign in to your account">
            {children}
        </LeftSideAuthForm>
        {RightSideQuote()}  
      </div>
    </div>
  )
}

function RightSideQuote() {
  return (
    <div className="hidden lg:flex flex-1 bg-black items-center justify-center p-20">
        <div className="max-w-md space-y-6">
            <blockquote className="text-xl leading-relaxed">
                What an application this is. Beautiful, performant, actually useful, and a beautiful SOLID-like architecture, and thankfully, no AI. 👽 ⚡️
            </blockquote>
            <div className="flex items-center gap-3">
                <Image
                    src="/remco.jpeg"
                    alt="Remco Stoeten"
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                />
                <div>
                    <div className="font-medium">@remcostoeten</div>
                    <div className="text-sm text-neutral-400">definitely not the author</div>
                </div>
            </div>
        </div>
    </div>
  )
}

function LeftSideAuthForm({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
    return (
        <div className="w-full lg:w-[45%] flex items-center justify-center px-6 pt-16">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="space-y-2">
                    <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
                    <p className="text-sm text-neutral-400">{subtitle}</p>
                </div>
                {children}
            </div>
        </div>
    )
}
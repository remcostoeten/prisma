
/**
 * @author Remco Stoeten
 * @description Component for swapping words logo with documentation link
 * @description This component displays a logo with a text loop effect and a documentation link
 */

import { Logo } from '@/components/theme/logo'
import TextLoop from '@/shared/components/effects/swapping-words'
import { FileText } from 'lucide-react'
import React from 'react'

function SwappingWordsLogo() {
  return (
    <div className="flex items-center gap-3">
      <Logo hasLink className="h-6 w-6" />
      <div className="flex flex-col gap-0">
        <span className="text-sm font-medium">All in one panel</span>
        <span className="text-xs text-neutral-400">
          Organize your{' '}
          <TextLoop>
            <span>chaos</span>
            <span>mind</span>
            <span>life</span>
            <span>work</span>
          </TextLoop>
        </span>
      </div>
    </div>
  )
}

export const DocumentationLink = () => (
  <div className="fixed top-4 right-6">
    <a 
        href="/docs"
        className="inline-flex items-center px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
    >
        <FileText className="w-4 h-4 mr-2" />
        Documentation
    </a>
  </div>
)

export default function AuthHeader() {
  return (
    <header className="flex fixed items-center justify-between px-6 py-4 bg-[#1A1A1A] z-50">
      <SwappingWordsLogo />
      <DocumentationLink />
    </header>
  )
}

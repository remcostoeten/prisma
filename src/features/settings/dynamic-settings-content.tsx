'use client'

import { useState, useEffect, useRef } from 'react'
import { SidebarLayout } from '../layout/sidebar-layout'
import { SettingsForm } from './settings-form'

const allSettingsTabs = [
	{ href: '#profile', label: 'Profile' },
	{ href: '#account', label: 'Account' },
	{ href: '#notifications', label: 'Notifications' },
	{ href: '#password', label: 'Password' },
	{ href: '#2fa', label: 'Two-Factor Auth' }
]

interface DynamicSettingsContentProps {
	config: any
	onBreadcrumbChange: (
		breadcrumbs: Array<{ href: string; label: string }>
	) => void
}

export function DynamicSettingsContent({
	config,
	onBreadcrumbChange
}: DynamicSettingsContentProps) {
	const [activeSection, setActiveSection] = useState('#profile')
	const [existingSections, setExistingSections] = useState<Set<string>>(
		new Set()
	)
	const contentRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (!contentRef.current) return

			const sections = contentRef.current.querySelectorAll('section')
			let currentActiveSection = '#profile'

			sections.forEach((section) => {
				const rect = section.getBoundingClientRect()
				if (rect.top <= 100 && rect.bottom > 100) {
					currentActiveSection = `#${section.id}`
				}
			})

			setActiveSection(currentActiveSection)
			updateBreadcrumbs(currentActiveSection)
		}

		const checkExistingSections = () => {
			if (!contentRef.current) return

			const sections = contentRef.current.querySelectorAll('section')
			const sectionIds = new Set(
				Array.from(sections).map((section) => `#${section.id}`)
			)
			setExistingSections(sectionIds)
		}

		const content = contentRef.current
		if (content) {
			content.addEventListener('scroll', handleScroll)
		}
		checkExistingSections() // Check on mount
		return () => {
			if (content) {
				content.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])

	const updateBreadcrumbs = (currentSection: string) => {
		const currentTab = allSettingsTabs.find(
			(tab) => tab.href === currentSection
		)
		if (currentTab) {
			onBreadcrumbChange([
				{ href: '/projects', label: 'Projects' },
				{ href: '/settings', label: 'Settings' },
				{ href: currentTab.href, label: currentTab.label }
			])
		}
	}

	const scrollToSection = (sectionId: string) => {
		const section = contentRef.current?.querySelector(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<SidebarLayout
			config={config}
			activeSection={activeSection}
			existingSections={existingSections}
			onSectionClick={scrollToSection}
		>
			<div ref={contentRef} className="h-full overflow-y-auto">
				<div className="p-6 space-y-6">
					<h1 className="text-2xl font-bold text-white">Settings</h1>
					<SettingsForm />
				</div>
			</div>
		</SidebarLayout>
	)
}

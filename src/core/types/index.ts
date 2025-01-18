import type { ReactNode, FC, HTMLAttributes, ButtonHTMLAttributes } from 'react'
import './framer'

export type { ReactNode, FC, HTMLAttributes, ButtonHTMLAttributes }

declare global {
	// Utility types
	type DeepPartial<T> = {
		[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
	}

	type ValueOf<T> = T[keyof T]

	type Prettify<T> = {
		[K in keyof T]: T[K]
	} & {}

	type RequireAtLeastOne<T> = {
		[K in keyof T]-?: Required<Pick<T, K>> &
			Partial<Pick<T, Exclude<keyof T, K>>>
	}[keyof T]
}

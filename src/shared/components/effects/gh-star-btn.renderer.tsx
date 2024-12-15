'use client'

import { GithubStarsButton } from '@/shared/components/effects/github-star-btn'
import { sleep } from '@/shared/lib/sleep'

import { useEffect, useState } from 'react'

export default function PreviewGithubStars() {
	const [stars, setStars] = useState(0)

	useEffect(() => {
		sleep(1000).then(() => {
			setStars(1024)
		})
	}, [])

	return (
		<GithubStarsButton
			href="https://github.com/damien-schneider/cuicui"
			starNumber={stars}
		>
			Star Cuicui on GitHub
		</GithubStarsButton>
	)
}
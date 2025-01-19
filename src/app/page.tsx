/**
 * @description This is the landing page of the application
 */

import { Flex } from "@/shared/components/defaults"

import GithubStats from "@/features/landing/components/github-stats/components/stats"
import MatrixGrid from "@/features/landing/components/matrix-grid/components/matrix-grid"

export default function Home() {
  return (
    <Flex col>
      <hr className='my-10'/>
      <MatrixGrid />
      <GithubStats/>
    </Flex>
  )
}

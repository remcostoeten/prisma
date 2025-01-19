import { ReactNode } from 'react'
import styles from '../styles/matrix-grid-layout.module.css'

type MatrixGridLayoutProps = {
  children: ReactNode
}

export default function MatrixGridLayout({ children }: MatrixGridLayoutProps) {
  return (
    <div className={styles.layout}>
      {children}
    </div>
  )
}


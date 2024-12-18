export interface BorderConfig {
  top?: boolean
  right?: boolean
  bottom?: boolean
  left?: boolean
}

export interface SpotlightProps {
  size?: number
  strength?: number
  color?: string | { from: string; to: string }
  characters?: string
  updateSpeed?: number
  textColor?: string
  textSize?: string
}

export type CardPatternProps = SpotlightProps & {
  mouseX: number;
  mouseY: number;
  randomString: string;
};

export interface AuthCardProps extends SpotlightProps {
  children: React.ReactNode
  className?: string
  href?: string
  borders?: BorderConfig
}

export interface CardItemProps {
  title: string
  desc: string
  href: string
  index: number
  isLast?: boolean
  borders?: BorderConfig
}


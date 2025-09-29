import type { ReactNode } from "react"

export interface Skill {
  name: string
  icon: string
}

export interface Project {
  title: string
  description: string
  tech: string[]
  link: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Section {
  id: string
  title: string
  subtitle?: ReactNode
  content?: string
  showButton?: boolean
  buttonText?: string
  showContactButton?: boolean
  showPhoto?: boolean
  skills?: Skill[]
  projects?: Project[]
  socialLinks?: SocialLink[]
}

export interface SectionProps extends Section {
  isActive: boolean
}

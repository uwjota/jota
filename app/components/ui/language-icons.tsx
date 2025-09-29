import React from 'react'
import { 
  SiC, 
  SiJavascript, 
  SiPython, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiNextdotjs,
  SiWordpress,
  SiGit, 
  SiFigma,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiBootstrap
} from 'react-icons/si'
import { 
  MdVideoLibrary,
  MdAdsClick,
  MdPalette,
  MdSmartToy,
  MdShoppingCart
} from 'react-icons/md'

interface LanguageIconProps {
  icon: string
  className?: string
}

export function LanguageIcon({ icon, className = "w-8 h-8" }: LanguageIconProps) {
  const iconMap: Record<string, React.ReactElement> = {
    c: <SiC className={className} />,
    javascript: <SiJavascript className={className} />,
    python: <SiPython className={className} />,
    typescript: <SiTypescript className={className} />,
    react: <SiReact className={className} />,
    nodejs: <SiNodedotjs className={className} />,
    nextjs: <SiNextdotjs className={className} />,
    wordpress: <SiWordpress className={className} />,
    git: <SiGit className={className} />,
    design: <SiFigma className={className} />,
    design2: <MdPalette className={className} />,
    video: <MdVideoLibrary className={className} />,
    ads: <MdAdsClick className={className} />,
    html: <SiHtml5 className={className} />,
    css: <SiCss3 className={className} />,
    tailwind: <SiTailwindcss className={className} />,
    bootstrap: <SiBootstrap className={className} />,
    ai: <MdSmartToy className={className} />,
    ecommerce: <MdShoppingCart className={className} />
  }

  return iconMap[icon] || <div className={className} />
}

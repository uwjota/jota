"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useCallback, useMemo, Suspense } from "react"
import Marquee from "react-fast-marquee"
import Image from "next/image"
import { Button } from "./ui/button"
import { SocialIcon } from "./ui/social-icons"
import { LanguageIcon } from "./ui/language-icons"
import { useLanguage } from "./LanguageContext"
import type { SectionProps } from "../types"

/**
 * Componente principal de seção do portfólio
 * Renderiza diferentes tipos de conteúdo baseado nas props
 * Inclui animações com Framer Motion
 */

// Componente de loading para Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
)

export default function Section({ 
  id, 
  title, 
  subtitle, 
  content, 
  isActive, 
  showButton, 
  buttonText, 
  showContactButton,
  showPhoto,
  skills, 
  projects, 
  socialLinks 
}: SectionProps) {
  const { t } = useLanguage()
  
  // Memoizar valores de animação para evitar re-renders desnecessários
  const animationVariants = useMemo(() => ({
    initial: { opacity: 0, y: 10 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0.75, y: 0 },
    transition: { duration: 0.5 }
  }), [isActive])
  
  const titleAnimationVariants = useMemo(() => ({
    initial: { opacity: 0, y: 14 },
    animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 0 },
    transition: { duration: 0.65 }
  }), [isActive])
  
  const contentVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 14, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, delay: 0.06 } },
    dim: { opacity: 0.6, y: 0, filter: 'blur(0px)', transition: { duration: 0.3 } }
  }), [])

  // Animação per-caractere para o título (controlada por isActive)
  const titleContainerVariants = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.02, delayChildren: 0.08 } }
  }), [])

  const titleCharVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 12, filter: 'blur(2px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5 } }
  }), [])
  
  
  function SwipeProjectsMobile({ projects }: { projects: { title: string; description: string; tech: string[]; link: string }[] }) {
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(1) // 1: próximo (entra da direita), -1: anterior (entra da esquerda)
    const total = projects.length
    const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
    const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

    return (
      <div className="md:hidden relative select-none">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          {projects.length > 0 && (
            <motion.div
              key={projects[index].title}
              className="bg-gradient-to-r from-black/20 to-gray-800/20 backdrop-blur-sm rounded-lg p-6 border border-white/30 transition-colors cursor-pointer w-80 h-56 flex flex-col"
              variants={{
                initial: (dir: number) => ({ x: dir * 80, opacity: 0 }),
                animate: { x: 0, opacity: 1 },
                exit: (dir: number) => ({ x: -dir * 80, opacity: 0 })
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 60) { setDirection(-1); prev() }
                else if (info.offset.x < -60) { setDirection(1); next() }
              }}
              onClick={() => window.open(projects[index].link, '_blank')}
            >
              <h3 className="text-xl font-semibold text-white mb-3">{projects[index].title}</h3>
              <p className="text-neutral-400 mb-4 line-clamp-3 min-h-[60px]">{projects[index].description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {projects[index].tech.map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-white/10 text-white text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-start gap-2 mt-3 ml-4">
          {projects.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    )
  }
  
  // Navegação suave para seção de projetos
  const handleButtonClick = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  // Navegação suave para seção de contato
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Renderiza a foto do perfil com animações
  const renderPhoto = () => (
    <motion.div
      className="mb-8 flex justify-start items-start"
      initial={{ opacity: 0, y: 12 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 1, delay: 0.3 }}
    >

      <motion.div
        className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96"
        initial={{ scale: 0.98 }}
        animate={isActive ? { scale: 1, y: id === 'about' ? [0, -8, 0] : 0, rotateX: 0, rotateY: 0 } : { scale: 0.98 }}
        transition={{ duration: 0.4, y: { duration: 3, repeat: Infinity, ease: 'linear' } }}
        
      >

        {/* Imagem circular simples */}
        <div className="absolute inset-0 p-0 rounded-full z-10">
          <motion.div
            className="w-full h-full rounded-full overflow-hidden"
          >
            <Image 
              src="/fotodojoao.webp" 
              alt="João Marcelo Venancio Ribeiro - Desenvolvedor Full Stack especializado em automações, sites e soluções audiovisuais" 
              width={500}
              height={500}
              className="w-full h-full object-cover"
              priority
              draggable={false}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )

  // Renderiza os skills com componente pronto (marquee)
  const renderSkills = () => (
      <motion.div
        className="mt-8 overflow-hidden relative max-w-6xl"
        initial={{ opacity: 0, y: 50 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: isActive ? 0.5 : 0 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
      <Suspense fallback={<LoadingFallback />}>
        <Marquee gradient={false} speed={120} pauseOnHover>
          {(skills || []).map((skill, index) => (
              <div
              key={`skills-marquee-${skill.name}-${index}`}
              className="bg-gradient-to-r from-black/20 to-gray-800/20 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-white/30 flex flex-col items-center text-center w-[128px] md:w-[140px] flex-shrink-0 mr-4 md:mr-6"
              >
                <LanguageIcon icon={skill.icon} className="w-7 h-7 md:w-8 md:h-8 text-white mb-2 md:mb-2" />
                <span className="text-white font-medium text-sm md:text-sm leading-tight">{skill.name}</span>
              </div>
            ))}
        </Marquee>
      </Suspense>
      </motion.div>
    )

  // Renderiza os projetos em grid (desktop) e scroll horizontal (mobile)
  const renderProjects = () => (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: isActive ? 0.5 : 0 }}
    >
      
      {/* Desktop Grid sem blur nas bordas */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl items-stretch">
      {projects?.map((project, index) => (
          <motion.div
            key={project.title}
            className="bg-gradient-to-r from-black/20 to-gray-800/20 backdrop-blur-sm rounded-lg relative overflow-hidden p-6 border border-white/30 hover:bg-white/10 transition-colors cursor-pointer h-full flex flex-col min-h-[260px]"
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.8, 
              delay: isActive ? 0.5 + index * 0.15 : 0,
            }}
            whileHover={{ 
              scale: 1.03, 
              y: -8,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(project.link, '_blank')}
          >
            <div className="relative z-10 flex flex-col h-full">
            <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
            <p className="text-neutral-400 mb-4 line-clamp-3 min-h-[60px]">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-white/10 text-white text-xs rounded"
                >
                  {tech}
                </span>
              ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Mobile Horizontal Scroll */}
      {/* Mobile – swipe para trocar (sem blur, sem auto-scroll) */}
      <SwipeProjectsMobile projects={projects || []} />
    </motion.div>
  )

  // Renderiza os botões de ação
  const renderActionButtons = () => {
    if (!showButton && !showContactButton) return null

    return (
      <motion.div
        {...animationVariants}
        className="mt-8 flex flex-wrap gap-4 xl:gap-6 2xl:gap-8"
      >
        {showContactButton && (
          <motion.div initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0.6 }} transition={{ duration: 0.5, delay: isActive ? 0.05 : 0 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={handleContactClick}
              className="group relative text-black !bg-gradient-to-r from-white to-gray-100 border-2 border-gray-300 hover:!bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:border-gray-400 hover:text-black transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-gray-500/25 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] px-8 py-4 rounded-full font-medium flex items-center gap-2 overflow-hidden"
            >
              <svg className="w-5 h-5 relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">{t('about.contact')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-gray-800/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-black/20 to-gray-800/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </Button>
          </motion.div>
        )}
        {showButton && (
          <motion.div initial={{ opacity: 0, x: -24 }} animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.6, x: 0 }} transition={{ duration: 0.6, delay: isActive ? 0.12 : 0 }}>
            <Button
              variant="outline"
              size="lg"
              onClick={handleButtonClick}
              className="group relative text-white bg-gradient-to-r from-black/20 to-gray-800/20 border-2 border-white/30 hover:from-black/40 hover:to-gray-800/40 hover:border-white/50 hover:text-white transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:shadow-white/25 px-8 py-4 rounded-full font-medium overflow-hidden"
            >
              <span className="relative z-10">{buttonText}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-gray-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-gray-200/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            </Button>
          </motion.div>
        )}
      </motion.div>
    )
  }

  // Renderiza os links sociais com animações
  const renderSocialLinks = () => (
    <motion.div
      className="mt-8 flex flex-wrap gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: isActive ? 0.5 : 0 }}
    >
      {socialLinks?.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-gradient-to-r from-black/20 to-gray-800/20 backdrop-blur-sm rounded-lg p-6 border border-white/30 hover:bg-white/10 transition-colors"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3, delay: isActive ? 0.5 + index * 0.06 : 0 }}
          whileHover={{ scale: 1.12, rotate: 1, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.985, transition: { duration: 0.08 } }}
          title={link.name}
        >
          <SocialIcon name={link.icon} className="w-8 h-8 text-white" />
        </motion.a>
      ))}
    </motion.div>
  )

  return (
    <motion.section 
      id={id} 
      className="relative h-[100svh] w-full snap-start flex flex-col justify-center p-8 md:p-16 lg:p-24 xl:p-32 2xl:p-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {showPhoto ? (
        <div className="flex flex-col md:flex-row md:items-center md:gap-14 lg:gap-20 xl:gap-24 2xl:gap-32">
          <div className="md:flex-shrink-0">
            {renderPhoto()}
          </div>
          <div className="mt-4 md:mt-0">
            {subtitle && (
              <motion.div
                className="mb-6 md:mb-8"
                {...animationVariants}
                transition={{ duration: 0.6, delay: isActive ? 0.1 : 0 }}
              >
                {subtitle}
              </motion.div>
            )}
            <motion.h2
              className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] 3xl:text-[8rem] font-bold leading-[1.1] tracking-tight max-w-4xl 2xl:max-w-6xl whitespace-pre"
              {...titleAnimationVariants}
            >
              <motion.span variants={titleContainerVariants} initial="hidden" animate={isActive ? 'visible' : 'hidden'} className="inline-block">
              {title.split('').map((char, index) => {
                  const isBlinkDot = char === '.' && index === title.length - 1
                  return (
                    <motion.span key={index} variants={titleCharVariants} className="inline-block">
                      {isBlinkDot ? (
                    <motion.span
                          animate={{ opacity: [1, 0.2, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      {char}
                        </motion.span>
                      ) : (
                        char
                      )}
                    </motion.span>
                  )
              })}
              </motion.span>
            </motion.h2>
            {content && (
              <motion.p
                key={`content-${id}-${isActive ? 'on' : 'off'}`}
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mt-6 text-neutral-400"
                variants={contentVariants}
                initial="hidden"
                animate={isActive ? 'visible' : 'dim'}
              >
                {id === 'contact' ? (
                  (() => {
                    const regex = /(Fala comigo!?|Fale comigo!?|Talk to me!?)/i
                    const match = content.match(regex)
                    if (!match) return content
                    const [m] = match
                    const idx = content.toLowerCase().indexOf(m.toLowerCase())
                    const before = content.slice(0, idx)
                    const after = content.slice(idx + m.length)
                    return (
                      <>
                        {before}
                        <span className="text-white font-semibold tracking-wide">{m}</span>
                        {after}
                      </>
                    )
                  })()
                ) : content}
              </motion.p>
            )}

            {/* Renderizar botões de ação dentro do container de texto */}
            {renderActionButtons()}
          </div>
        </div>
      ) : (
        <>
      {subtitle && (
        <motion.div
          className="mb-12"
          {...animationVariants}
          transition={{ duration: 0.6, delay: isActive ? 0.1 : 0 }}
        >
          {subtitle}
        </motion.div>
      )}
      <motion.h2
        className="text-4xl md:text-6xl lg:text-[5rem] xl:text-[6rem] 2xl:text-[7rem] 3xl:text-[8rem] font-bold leading-[1.1] tracking-tight max-w-4xl 2xl:max-w-6xl whitespace-pre"
        {...titleAnimationVariants}
      >
        <motion.span variants={titleContainerVariants} initial="hidden" animate={isActive ? 'visible' : 'hidden'} className="inline-block">
        {title.split('').map((char, index) => {
            const isBlinkDot = char === '.' && index === title.length - 1
            return (
              <motion.span key={index} variants={titleCharVariants} className="inline-block">
                {isBlinkDot ? (
              <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                {char}
                  </motion.span>
                ) : (
                  char
                )}
              </motion.span>
            )
        })}
        </motion.span>
      </motion.h2>
      {content && (
        <motion.p
          key={`content2-${id}-${isActive ? 'on' : 'off'}`}
          className="text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl max-w-2xl xl:max-w-3xl 2xl:max-w-4xl mt-6 text-neutral-400"
          variants={contentVariants}
          initial="hidden"
          animate={isActive ? 'visible' : 'dim'}
        >
          {id === 'contact' ? (
            (() => {
              const regex = /(Fala comigo!?|Fale comigo!?|Talk to me!?)/i
              const match = content.match(regex)
              if (!match) return content
              const [m] = match
              const idx = content.toLowerCase().indexOf(m.toLowerCase())
              const before = content.slice(0, idx)
              const after = content.slice(idx + m.length)
              return (
                <>
                  {before}
                  <span className="text-white font-semibold tracking-wide">{m}</span>
                  {after}
                </>
              )
            })()
          ) : content}
        </motion.p>
          )}
          
          {/* Renderizar botões de ação */}
          {renderActionButtons()}
        </>
      )}
      
      {/* Renderizar conteúdo específico baseado no tipo de seção */}
      {skills && renderSkills()}
      {projects && renderProjects()}
      {socialLinks && renderSocialLinks()}
    </motion.section>
  )
}

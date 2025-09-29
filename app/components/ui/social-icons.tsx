import { 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaInstagram, 
  FaEnvelope 
} from 'react-icons/fa'

interface SocialIconProps {
  name: string
  className?: string
}

export function SocialIcon({ name, className = "w-6 h-6" }: SocialIconProps) {
  const icons = {
    GitHub: <FaGithub className={className} />,
    LinkedIn: <FaLinkedin className={className} />,
    WhatsApp: <FaWhatsapp className={className} />,
    Instagram: <FaInstagram className={className} />,
    Email: <FaEnvelope className={className} />
  }

  return icons[name as keyof typeof icons] || null
}

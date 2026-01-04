'use client'

import Link from 'next/link'
import { Twitter, Github, Mail, MessageCircle } from 'lucide-react'

// Discord icon component
const DiscordIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

// Telegram icon component
const TelegramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)
import { StonewallLogo } from './StonewallLogo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    services: [
      { name: 'Smart Contract Audit', href: '#services' },
      { name: 'Security Assessment', href: '#services' },
      { name: 'Penetration Testing', href: '#services' },
      { name: 'DeFi Review', href: '#services' },
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Audits', href: '#audits' },
      { name: 'Contact', href: '#contact' },
    ],
    social: [
      { name: 'Email', href: 'mailto:stonewallaudits@stonewall.ink', icon: Mail },
      { name: 'Telegram', href: 'https://t.me/Lefkk', icon: TelegramIcon },
      { name: 'Discord', href: 'https://discord.com/users/lef8139', icon: DiscordIcon },
    ],
  }

  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0B]" />
      <div className="divider absolute top-0 left-0 right-0" />

      {/* Decorative wall silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-[0.03]">
        <div className="flex justify-center items-end h-full">
          <StonewallLogo className="w-64 h-16" gradient={false} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* CTA Section */}
        <div className="card-highlight rounded-3xl p-12 mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to secure your protocol?
          </h2>
          <p className="text-[#9CA3AF] text-lg mb-8 max-w-xl mx-auto">
            Get in touch to discuss your security needs. We respond within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:stonewallaudits@stonewall.ink"
              className="btn-primary text-base"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
            <a
              href="https://t.me/Lefkk"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base"
            >
              <TelegramIcon className="w-5 h-5" />
              DM on Telegram
            </a>
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <StonewallLogo className="w-10 h-10" />
              <span className="text-xl font-bold">
                Stone<span className="gradient-text">wall</span>
              </span>
            </Link>
            <p className="text-[#9CA3AF] text-sm leading-relaxed">
              Immovable Web3 security. Smart contract audits that stand unbreakable.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {links.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {links.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] flex items-center justify-center text-[#D4AF37] hover:bg-[rgba(212,175,55,0.2)] transition-all"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-sm">
            © {currentYear} Stonewall. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#9CA3AF] hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

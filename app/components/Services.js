'use client'

import { Code, Search, Bug, Cpu, FileCheck, Lock, Zap, Eye, Shield, Terminal } from 'lucide-react'

const services = [
  {
    icon: Code,
    title: 'Smart Contract Audit',
    description: 'Comprehensive line-by-line review of Solidity, Vyper, and Rust contracts with manual analysis.',
  },
  {
    icon: Search,
    title: 'Security Assessment',
    description: 'Full protocol analysis covering economic attacks, oracle manipulation, and cross-chain risks.',
  },
  {
    icon: Bug,
    title: 'Penetration Testing',
    description: 'Real-world attack simulations against deployed contracts and infrastructure.',
  },
  {
    icon: Cpu,
    title: 'DeFi Protocol Review',
    description: 'Specialized audits for AMMs, lending protocols, yield aggregators, and complex DeFi.',
  },
  {
    icon: FileCheck,
    title: 'Formal Verification',
    description: 'Mathematical proofs of contract correctness for critical functions and invariants.',
  },
  {
    icon: Lock,
    title: 'Continuous Security',
    description: 'Ongoing monitoring and security reviews as your protocol evolves.',
  },
]

export function Services() {
  return (
    <section id="services" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0B]" />

      {/* Gold glow */}
      <div className="glow-gold -bottom-48 -right-48 opacity-30" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="section-header thai-border pt-8">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">
            Security <span className="gradient-text">Services</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive security solutions for every stage of your Web3 project
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {services.map((service, index) => (
            <div key={index} className="card p-8 group gold-shimmer">
              {/* Icon */}
              <div className="feature-icon mb-6 group-hover:scale-110 transition-transform">
                <service.icon />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-[#9CA3AF] leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Our <span className="gradient-text">Methodology</span>
            </h3>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto">
              Battle-tested audit process combining automated scanning with deep manual review
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Step 1: Automated */}
            <div className="card-highlight p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.15)] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-medium">PHASE 1</span>
                  <h4 className="text-white font-semibold">Automated Analysis</h4>
                </div>
              </div>
              <p className="text-[#9CA3AF] text-sm mb-4">
                Within 10 minutes, our automated pipeline scans your codebase using industry-leading tools:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Slither</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Mythril</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Aderyn</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Semgrep</span>
              </div>
            </div>

            {/* Step 2: Symbolic */}
            <div className="card-highlight p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.15)] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-medium">PHASE 2</span>
                  <h4 className="text-white font-semibold">Symbolic Execution</h4>
                </div>
              </div>
              <p className="text-[#9CA3AF] text-sm mb-4">
                Deep symbolic analysis and fuzzing to discover edge cases and complex vulnerabilities:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Manticore</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Echidna</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Halmos</span>
              </div>
            </div>

            {/* Step 3: Foundry */}
            <div className="card-highlight p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.15)] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-medium">PHASE 3</span>
                  <h4 className="text-white font-semibold">Mainnet Fork Testing</h4>
                </div>
              </div>
              <p className="text-[#9CA3AF] text-sm mb-4">
                Real-world attack simulations using Foundry against mainnet forks to validate exploitability:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Foundry</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Forge Scripts</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">PoC Exploits</span>
              </div>
            </div>

            {/* Step 4: Manual */}
            <div className="card-highlight p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(212,175,55,0.15)] flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs text-[#D4AF37] font-medium">PHASE 4</span>
                  <h4 className="text-white font-semibold">Manual Line-by-Line</h4>
                </div>
              </div>
              <p className="text-[#9CA3AF] text-sm mb-4">
                Expert auditors review every line of code for logic flaws, access control, and business logic bugs:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Logic Review</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Access Control</span>
                <span className="px-2.5 py-1 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)] rounded text-xs text-[#D4AF37]">Economic Analysis</span>
              </div>
            </div>
          </div>

          {/* What We Check */}
          <div className="card p-8">
            <h4 className="text-lg font-semibold text-white mb-6 text-center">Vulnerability Coverage</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Reentrancy
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Flash Loan Attacks
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Oracle Manipulation
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Access Control
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Integer Overflow
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Front-running
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Denial of Service
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Governance Attacks
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Sandwich Attacks
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Price Manipulation
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Unchecked Returns
              </div>
              <div className="text-[#9CA3AF]">
                <span className="text-[#D4AF37]">●</span> Storage Collisions
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image";
import Link from "next/link";
import type { Company, NavItem } from "@/types/content";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Footer({ company, nav }: { company: Company; nav: { company: NavItem[]; services: NavItem[] } }) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-secondary text-white">
      <div className="h-1 w-full bg-primary" aria-hidden="true" />
      <div className="container-x pb-10 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src={company.logo.onDark} alt={company.logo.alt} width={220} height={44} className="h-auto w-[190px]" />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">{company.description}</p>
            <Link href="/contact" className="group mt-10 inline-flex items-center gap-3 font-display text-2xl font-bold uppercase tracking-tight">
              <span className="link-underline">Start a project</span>
              <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>

          <FooterCol title="Company" items={nav.company} className="lg:col-span-2" />
          <FooterCol title="Services" items={nav.services} className="lg:col-span-3" />

          <div className="lg:col-span-3">
            <h3 className="eyebrow mb-6 text-white/45">Contact</h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li><a className="link-underline hover:text-white" href={company.contact.phoneHref}>{company.contact.phone}</a></li>
              <li><a className="link-underline hover:text-white" href={company.contact.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="link-underline hover:text-white" href={`mailto:${company.contact.email}`}>{company.contact.email}</a></li>
              <li className="pt-2 leading-relaxed text-white/55">{company.contact.address.map((l) => <span key={l} className="block">{l}</span>)}</li>
              <li><a className="link-underline text-white hover:text-primary-light" href={company.contact.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 overflow-hidden border-t border-white/10 pt-10">
          <p aria-hidden="true" className="select-none whitespace-nowrap font-display text-[9.5vw] tex font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-white/[0.04]">
            {company.shortName}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {year} {company.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-6">
            {company.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="uppercase tracking-[0.16em] transition-colors hover:text-primary-light">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, className = "" }: { title: string; items: NavItem[]; className?: string }) {
  return (
    <div className={className}>
      <h3 className="eyebrow mb-6 text-white/45">{title}</h3>
      <ul className="space-y-3 text-sm">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="link-underline text-white/75 transition-colors hover:text-white">{i.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

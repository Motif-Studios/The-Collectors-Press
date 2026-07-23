import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const links: FooterLink[] = [
  // {
  //   label: "Terms & Conditions",
  //   href: "https://www.nzme.co.nz/hubfs/NZME_November2024/pdf/digital-subscription-terms.pdf?hsLang=en-nz",
  //   external: true,
  // },
  // {
  //   label: "FAQs",
  //   href: "/help-and-support/",
  // },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export function AccountFooter() {
  return (
    <footer className="border-t border-neutral-200 py-6">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-700">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:underline"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
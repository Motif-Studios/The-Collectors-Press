import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const footerSections = [
  {
    title: "The Collectors Press",
    links: [
      { label: "About The Collectors Press", href: "/about" },
      { label: "Write for us", href: "#" },
      { label: "Contact us", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of use", href: "#" },
    ],
  },
  // {
  //   title: "Subscriber Services",
  //   links: [
  //     { label: "NZ Herald e-editions", href: "#" },
  //     { label: "Daily puzzles & quizzes", href: "#" },
  //     { label: "Manage your digital subscription", href: "#" },
  //     { label: "Manage your print subscription", href: "#", external: true },
  //     {
  //       label: "Subscribe to the NZ Herald newspaper",
  //       href: "#",
  //       external: true,
  //     },
  //     { label: "Subscribe to Herald Premium", href: "#" },
  //     { label: "Gift a subscription", href: "#", external: true },
  //     { label: "Subscriber FAQs", href: "#" },
  //     { label: "Subscription terms & conditions", href: "#", external: true },
  //     { label: "Promotions and subscriber benefits", href: "#" },
  //   ],
  // },
  // {
  //   title: "NZME Network",
  //   links: [
  //     { label: "The New Zealand Herald", href: "#" },
  //     { label: "The Northland Age", href: "#" },
  //     { label: "The Northern Advocate", href: "#" },
  //     { label: "Waikato Herald", href: "#" },
  //     { label: "Bay of Plenty Times", href: "#" },
  //     { label: "Rotorua Daily Post", href: "#" },
  //     { label: "Hawke's Bay Today", href: "#" },
  //     { label: "Whanganui Chronicle", href: "#" },
  //     { label: "Viva", href: "#" },
  //     { label: "NZ Listener", href: "#" },
  //     { label: "Newstalk ZB", href: "#", external: true },
  //     { label: "BusinessDesk", href: "#", external: true },
  //     { label: "OneRoof", href: "#", external: true },
  //     { label: "Driven Car Guide", href: "#", external: true },
  //     { label: "iHeart Radio", href: "#", external: true },
  //     { label: "Restaurant Hub", href: "#", external: true },
  //   ],
  // },
  // {
  //   title: "NZME",
  //   links: [
  //     { label: "About NZME", href: "#", external: true },
  //     { label: "NZME careers", href: "#", external: true },
  //     { label: "Advertise with NZME", href: "#", external: true },
  //     {
  //       label: "NZME Digital Performance Marketing",
  //       href: "#",
  //       external: true,
  //     },
  //     { label: "Book your classified ad", href: "#" },
  //     { label: "Photo sales", href: "#" },
  //     { label: "NZME Events", href: "#", external: true },
  //   ],
  // },
];

const socialLinks = [
  { href: "https://www.facebook.com/TheCollectorsPress", label: "Facebook", icon: faFacebookF },
  { href: "https://www.instagram.com/thecollectorspress/", label: "Instagram", icon: faInstagram },
];

export function Footer() {
  return (
    <footer className="bg-black px-17.5 py-14 text-white max-[1100px]:px-8 max-[1100px]:py-12">
      <div className="mx-auto max-w-345">
        <div className="mb-20 flex items-start justify-between gap-8 max-[700px]:mb-12 max-[700px]:flex-col">
          <div className="whitespace-nowrap font-serif text-[28px] font-bold tracking-[0.3px] max-[700px]:text-2xl">
            The Collectors Press
          </div>

          <div className="flex flex-wrap items-center gap-4.5">
            <a
              href="/subscribe"
              aria-label="Subscribe"
              className="rounded-sm bg-white px-4 py-2 text-black transition-opacity duration-200 hover:opacity-90"
            >
              Subscribe
            </a>

            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-white opacity-95 transition-opacity duration-200 hover:opacity-70"
              >
                <FontAwesomeIcon icon={icon} className="text-[20px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mb-30 grid grid-cols-4 gap-17.5 max-[1100px]:mb-20 max-[1100px]:grid-cols-2 max-[1100px]:gap-x-10 max-[1100px]:gap-y-12.5 max-[700px]:grid-cols-1 max-[700px]:gap-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-[13px] font-bold uppercase text-[#9da0a6]">
                {section.title}
              </h4>

              <div className="mb-4.5 h-px w-full bg-[#2b2b2b]" />

              <ul className="list-none">
                {section.links.map((link) => (
                  <li key={link.label} className="mb-3.5">
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 text-[16px] leading-[1.45] text-white transition-opacity duration-200 hover:opacity-75"
                    >
                      <span>{link.label}</span>
                      {link.external && (
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className="text-[12px] opacity-75"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

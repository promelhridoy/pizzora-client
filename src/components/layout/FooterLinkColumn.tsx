import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkColumnProps = {
  title: string;
  links: FooterLink[];
};

export default function FooterLinkColumn({
  title,
  links,
}: FooterLinkColumnProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-gray-500 transition-colors duration-200 hover:text-[#E63946] dark:text-gray-400 dark:hover:text-[#F97316]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


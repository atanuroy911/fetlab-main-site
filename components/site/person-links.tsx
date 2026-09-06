import { Mail, Globe, GraduationCap } from "lucide-react";
import { LinkedInIcon, XIcon, GitHubIcon } from "@/components/site/social-icons";
import type { Socials } from "@/lib/sanity/types";

function LinkIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      {children}
    </a>
  );
}

export function PersonLinks({
  email,
  website,
  socials,
  className,
}: {
  email?: string | null;
  website?: string | null;
  socials?: Socials | null;
  className?: string;
}) {
  const hasAny = email || website || socials?.linkedin || socials?.twitter || socials?.github || socials?.scholar;
  if (!hasAny) return null;

  return (
    <div className={className}>
      <div className="flex items-center gap-1">
        {email && (
          <LinkIcon href={`mailto:${email}`} label={`Email ${email}`}>
            <Mail className="h-3.5 w-3.5" />
          </LinkIcon>
        )}
        {website && (
          <LinkIcon href={website} label="Website">
            <Globe className="h-3.5 w-3.5" />
          </LinkIcon>
        )}
        {socials?.linkedin && (
          <LinkIcon href={socials.linkedin} label="LinkedIn">
            <LinkedInIcon className="h-3.5 w-3.5" />
          </LinkIcon>
        )}
        {socials?.twitter && (
          <LinkIcon href={socials.twitter} label="X / Twitter">
            <XIcon className="h-3.5 w-3.5" />
          </LinkIcon>
        )}
        {socials?.github && (
          <LinkIcon href={socials.github} label="GitHub">
            <GitHubIcon className="h-3.5 w-3.5" />
          </LinkIcon>
        )}
        {socials?.scholar && (
          <LinkIcon href={socials.scholar} label="Google Scholar">
            <GraduationCap className="h-3.5 w-3.5" />
          </LinkIcon>
        )}
      </div>
    </div>
  );
}

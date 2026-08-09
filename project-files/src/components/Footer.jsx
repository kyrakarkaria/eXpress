

import { TiSocialLinkedin } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialYoutube } from "react-icons/sl";
import { FaMediumM } from "react-icons/fa";
import { SiSubstack } from "react-icons/si";
const SOCIALS = [
  { label: "Instagram", icon: <SlSocialInstagram />, site: "https://www.instagram.com/djsce.express?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
  { label: "Medium", icon: <FaMediumM />, site: "https://medium.com/@djsexpresso" },
  { label: "Substack", icon: <SiSubstack />, site: "https://substack.com/@djsexpresso" },
  { label: "YouTube", icon: <SlSocialYoutube />, site: "https://www.youtube.com/@DJSCEeXpress" },
  { label: "LinkedIn", icon: <TiSocialLinkedin />, site: "https://www.linkedin.com/company/djscexpress/posts/" },
];

export default function Footer() {
  return (
    <footer className="relative z-[1] bg-black border-t border-border-soft ">
      <div className="max-w-[1280px] mx-auto py-[26px] px-8 flex items-center justify-between flex-wrap gap-4 text-[0.85rem] text-text-dim max-[640px]:justify-center max-[640px]:text-center">
        <span>© {new Date().getFullYear()} DJSCE eXpress. All rights reserved.</span>

        <div className="flex gap-3.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-[34px] h-[34px] rounded-[10px] border border-border-soft flex items-center justify-center text-[1.08rem] font-bold text-purple-light transition-[background-color,transform] duration-[250ms] ease-in-out hover:bg-purple/15 hover:-translate-y-0.5"
            >
              {typeof s.icon === "string" ? (
                s.icon
              ) : (
                s.icon
              )}
            </a>
          ))}
        </div>

        <span>
          Made with <span className="text-purple-light">♥</span> by DJSCE eXpress 2026 Tech Team
        </span>
      </div>
    </footer>
  );
}
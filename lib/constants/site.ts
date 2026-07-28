import { ICONS } from "./icon";
import { SocialType } from "../types/site";

export const SITE_NAME = "Athena Hair";
export const EMAIL_ADDRESS = "athenahairstore@gmail.com";
export const PHONE_NUMBER = "+84 981 444 137"

export const SOCIALS: SocialType[] = [
  {
    name: "Facebook",
    link: 'https://www.facebook.com/share/1EHG7ysbme/',
    icon: ICONS.facebook,
  },
  {
    name: "Instagram",
    link: 'https://www.instagram.com/athenahair.store',
    icon: ICONS.instagram,
  },
  {
    name: "TikTok",
    link: 'https://www.tiktok.com/@athena.hair.store',
    icon: ICONS.tikTok,
  },
  {
    name: "Telegram",
    link: 'https://t.me/+pHFx4sw72ehmOTI1',
    icon: ICONS.telegram,
  },
  {
    name: "X",
    link: 'https://x.com/athenahairstore',
    icon: ICONS.xDark,
    monotone: true,
  },
  {
    name: "VK",
    link: 'https://vk.com',
    icon: ICONS.vk,
  },
  {
    name: "Threads",
    link: 'https://www.threads.com/@athenahair.store',
    icon: ICONS.threads,
    monotone: true,
  },
  {
    name: "WhatsApp",
    link: 'https://chat.whatsapp.com/HnrlY8h9qANGLiAoATl0uS',
    icon: ICONS.whatsApp,
  },
  {
    name: "Gmail",
    link: `mailto:${EMAIL_ADDRESS}`,
    icon: ICONS.google,
  },
  // {
  //   name: "YouTube",
  //   link: 'https://youtube.com',
  //   icon: ICONS.youTube,
  // },
];
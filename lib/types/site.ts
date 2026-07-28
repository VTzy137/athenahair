import { ICONS } from "../constants/icon";

export type Themes = 'dark' | 'light' | 'system';

export type SocialType = {
  name: string;
  link: string;
  icon: (typeof ICONS)[keyof typeof ICONS];
  monotone?: boolean;
};
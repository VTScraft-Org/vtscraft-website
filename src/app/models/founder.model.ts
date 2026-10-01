export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'email' | 'website';
  url: string;
  label: string;
}

export interface FounderStat {
  value: string;
  label: string;
}

export interface FounderProfile {
  name: string;
  role: string;
  companyTag: string;
  headline: string;
  bio: string[];
  quote: string;
  image: string;
  avatarBgColor?: string;
  expertise: string[];
  stats: FounderStat[];
  socials: SocialLink[];
}

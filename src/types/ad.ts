export interface AdCampaign {
  id: string;
  pinId: string;
  shortUrl: string;
  directUrl: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  videoHlsUrl?: string;
  category: 'fashion' | 'streetwear' | 'accessories' | 'lifestyle';
  categoryLabel: string;
  advertiser: string;
  tags: string[];
  clicks: number;
  impressions: number;
  featured: boolean;
  active: boolean;
  createdAt: string;
  ctaText: string;
  badgeText: string;
}

export type AdDisplayFormat = 'all' | 'leaderboard' | 'rectangle' | 'card' | 'sticky';

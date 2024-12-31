interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

interface ImageFormats {
  large?: ImageFormat;
  small?: ImageFormat;
  medium?: ImageFormat;
  thumbnail?: ImageFormat;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Button {
  id: number;
  ButtonTitle: string;
  ButtonLink: string;
}

interface HeroSection {
  id: number;
  Title: string;
  Description: string;
  SmallImage: Image;
  MainImage: Image;
  DownloadButton: Button;
  Button: Button;
}

export interface CommunityData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  Location: string;
  statusType: string;
  Type: string;
  UnitType: string;
  HeroSection: HeroSection;
  // Add other sections as needed
}

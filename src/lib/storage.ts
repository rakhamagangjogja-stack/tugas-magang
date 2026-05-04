export interface HeroSection {
  label: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryUrl: string;
  ctaSecondary: string;
  ctaSecondaryUrl: string;
  imageLabel: string;
}

export interface ProblemCard {
  title: string;
  description: string;
}

export interface SectionHeading {
  title: string;
  subtitle: string;
}

export interface LandingContent {
  hero: HeroSection;
  stats: Array<{ label: string; value: string }>;
  section: SectionHeading;
  problems: ProblemCard[];
}

const STORAGE_KEY = 'rkha-landing-content';
const AUTH_KEY = 'rkha-admin-token';

export const defaultLandingContent: LandingContent = {
  hero: {
    label: 'Rkha Cepat',
    title: 'Butuh Dana Cepat? Cair 15 Menit Tanpa Ribet.',
    subtitle:
      'Solusi gadai paling cepat di Jogja. Bunga ringan, proses singkat, barang aman di brankas berasuransi. Gratis take-up, no survey.',
    ctaPrimary: 'Chat WhatsApp Sekarang',
    ctaPrimaryUrl: 'https://wa.me/6281234567890',
    ctaSecondary: 'Hitung Simulasi',
    ctaSecondaryUrl: '/admin/login',
    imageLabel: 'Gambar Produk / Ilustrasi',
  },
  stats: [
    { label: 'Menit', value: '15' },
    { label: 'Approval', value: '100%' },
    { label: 'Cabang', value: '5.000+' },
  ],
  section: {
    title: 'Pernah Mengalami Hal Ini?',
    subtitle: 'Kerap kali, situasi mendesak butuh solusi cepat, bukan jalan panjang.',
  },
  problems: [
    {
      title: 'Butuh dana mendesak hari ini juga?',
      description:
        'Ajukan sekarang, kebutuhan keuangan cepat cair, aman, dan tanpa prosedur berbelit-belit.',
    },
    {
      title: 'Punya takut risiko data disebar?',
      description:
        'Jaga privasi dengan sistem kami yang aman dan layanan hanya untuk Anda.',
    },
    {
      title: 'Pingin keuangan lebih leluasa lagi?',
      description:
        'Solusi fleksibel untuk pinjaman yang bisa diandalkan dengan bunga bersaing.',
    },
    {
      title: 'Bingung cari tempat gadai terpercaya?',
      description:
        'Konsultasi gratis untuk memilih layanan gadai yang tepat tanpa khawatir.',
    },
  ],
};

export function loadLandingContent(): LandingContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultLandingContent;
    return JSON.parse(raw) as LandingContent;
  } catch {
    return defaultLandingContent;
  }
}

export function saveLandingContent(content: LandingContent) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function setAuthToken(token: string) {
  localStorage.setItem(AUTH_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(AUTH_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_KEY);
}

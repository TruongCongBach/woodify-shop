// API Configuration
export const API_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
  },
  CACHE: {
    REVALIDATE_TIME: 60, // seconds
  },
} as const

// UI Configuration
export const UI_CONFIG = {
  CAROUSEL: {
    AUTO_PLAY_DELAY: 3000,
    ITEMS_PER_VIEW: {
      MOBILE: '80%',
      TABLET: '45%',
      DESKTOP: '30%',
      LARGE: '24%',
    },
  },
  SKELETON: {
    CARDS_COUNT: 6,
  },
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/product',
  CATEGORIES: '/category',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  LOGOUT: '/logout',
  CONTACT: '/contact-us',
  ABOUT: '/about-us',
  RETURN_POLICY: '/return-policy',
} as const

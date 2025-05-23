Claude AI Development Guidelines
This document outlines the development standards and best practices for the Realty Direct Queensland real estate platform built on the Next.js boilerplate.
🎯 Primary Objectives

SEO Excellence: All development must prioritize search engine optimization for maximum visibility in Queensland property searches
Lighthouse Perfect Score: Target 100/100 across all Lighthouse metrics (Performance, Accessibility, Best Practices, SEO)
Mobile-First Development: Every feature must be designed for mobile devices first, then enhanced for desktop
Type Safety: Leverage TypeScript for full type safety across the application

🛠️ Technology Stack
Core Framework

Next.js 15.3 with App Router for server-side rendering and SEO optimization
TypeScript for type safety with strict mode enabled
Tailwind CSS for utility-first styling with custom design system

UI Components & Design

Material-UI (MUI) v6 - Use MUI components for consistent, accessible UI elements
Lucide React - For iconography (already integrated)
Custom Component Library - Build on top of MUI with Tailwind utilities

Performance & SEO Tools

next/image - Always use for optimized image loading
next/font - Use for font optimization
Dynamic imports - Code split non-critical components
React Suspense - Implement loading boundaries
ISR/SSG - Use static generation where possible

Form & Validation

React Hook Form - For performant forms
Zod - For schema validation (already integrated)

Internationalization

next-intl - Multi-language support (already integrated)

Error Tracking & Analytics

Sentry - Error monitoring (already configured)
PostHog - Product analytics (already configured)

📋 Development Standards
1. SEO Best Practices

Metadata: Always implement comprehensive metadata for every page
typescriptexport async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Page Title - Realty Direct Queensland',
    description: 'Detailed description with keywords',
    openGraph: { /* full OG tags */ },
    alternates: { canonical: 'https://realtydirect.com.au/...' },
    robots: { index: true, follow: true }
  }
}

Structured Data: Implement JSON-LD for all property listings
typescriptconst structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Realty Direct",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Queensland",
    "addressCountry": "AU"
  }
}

Semantic HTML: Use proper heading hierarchy (h1-h6) and semantic tags
URL Structure: Clean, descriptive URLs with proper routing

2. Performance Optimization

Core Web Vitals: Monitor and optimize for:

LCP (Largest Contentful Paint) < 2.5s
FID (First Input Delay) < 100ms
CLS (Cumulative Layout Shift) < 0.1

Image Optimization:
tsximport Image from 'next/image'

<Image
  src="/property.jpg"
  alt="Detailed property description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  quality={85}
/>

Code Splitting: Use dynamic imports for heavy components
typescriptconst PropertyMap = dynamic(() => import('./PropertyMap'), {
  loading: () => <Skeleton />,
  ssr: false
})

3. Mobile-First Approach

Responsive Design Pattern:
tsx// Always start with mobile styles
<div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12">
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {/* Content */}
  </div>
</div>

Touch-Friendly Interfaces:

Minimum touch target size: 44x44px
Adequate spacing between interactive elements
Swipe gestures for image galleries

Performance on Mobile:

Lazy load below-the-fold content
Optimize for 3G connections
Minimize JavaScript execution

4. MUI Component Integration
tsximport {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Grid,
  Skeleton
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // Realty Direct blue
    },
    secondary: {
      main: '#0ea5e9',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})

// Use MUI components with Tailwind utilities
<Card className="shadow-lg hover:shadow-xl transition-shadow">
  <CardContent className="p-6">
    <Typography variant="h5" component="h2" className="mb-4">
      Property Title
    </Typography>
    <Button
      variant="contained"
      className="w-full md:w-auto"
      onClick={handleAction}
    >
      View Details
    </Button>
  </CardContent>
</Card>
5. Accessibility Standards

WCAG 2.1 AA Compliance:

Proper color contrast ratios (4.5:1 for normal text, 3:1 for large text)
Keyboard navigation support
Screen reader optimization
ARIA labels where necessary

Focus Management:
tsx<button
  className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  aria-label="Submit property listing"
>
  Submit
</button>

6. Code Organization
src/
├── components/
│   ├── common/        # Shared components
│   ├── properties/    # Property-specific components
│   ├── ui/           # UI components (extended MUI)
│   └── layouts/      # Layout components
├── hooks/            # Custom React hooks
├── services/         # API services
├── utils/            # Utility functions
├── types/            # TypeScript definitions
└── styles/           # Global styles
7. Testing Requirements

Unit Tests: For utility functions and hooks
Component Tests: Using Testing Library for components
E2E Tests: Playwright for critical user flows
Visual Regression: Percy for UI consistency

8. API Integration
typescript// Use proper error handling and loading states
const usePropertyData = (propertyId: string) => {
  const [data, setData] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/properties/${propertyId}`)
        if (!response.ok) throw new Error('Failed to fetch property')
        const data = await response.json()
        setData(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  return { data, loading, error }
}
9. State Management

Use React Context for global state (user auth, preferences)
Use React Query/SWR for server state
Keep component state local when possible
Avoid prop drilling - use composition instead

10. Environment Variables
typescript// Always validate environment variables with zod
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  DATABASE_URL: z.string(),
  ARCJET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
🚀 Deployment Checklist

 Run npm run build successfully
 All Lighthouse scores above 90
 Mobile responsiveness tested on real devices
 SEO meta tags implemented for all pages
 Security headers configured
 Error tracking enabled
 Analytics configured
 Environment variables set
 Database migrations run
 CDN configured for static assets

📏 Biome Configuration
Follow the project's Biome rules for linting:
javascript// Always use these rules
{
  "linter": {
    "rules": {
      "complexity": {
        "noForEach": "error", // Use for...of instead
        "noUselessFragments": "error"
      },
      "correctness": {
        "noUnusedVariables": "error",
        "noUnusedImports": "error"
      },
      "style": {
        "noNonNullAssertion": "warn",
        "useTemplate": "error" // Use template literals
      }
    }
  }
}
🏗️ Component Development Pattern
tsximport type { FC } from 'react'
import { memo } from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import clsx from 'clsx'

interface PropertyCardProps {
  property: Property
  className?: string
  onSelect?: (property: Property) => void
}

export const PropertyCard: FC<PropertyCardProps> = memo(({
  property,
  className,
  onSelect
}) => {
  return (
    <Card className={clsx('hover:shadow-lg transition-shadow', className)}>
      <CardContent className="p-0">
        <div className="relative h-64 w-full">
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6">
          <Typography variant="h6" component="h3" className="mb-2">
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            {property.location}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => onSelect?.(property)}
            className="mt-4"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

PropertyCard.displayName = 'PropertyCard'
🔒 Security Best Practices

Input Validation: Always validate and sanitize user input
Authentication: Use proper auth flow with JWT or session management
CSRF Protection: Implement CSRF tokens for forms
Rate Limiting: Use Arcjet for API rate limiting
Content Security Policy: Configure proper CSP headers
HTTPS: Always use HTTPS in production

📱 Progressive Web App Features

Implement service worker for offline functionality
Add web app manifest for installability
Use push notifications for property alerts
Implement background sync for saved searches

🎨 Design System Guidelines

Colors:

Primary: #3b82f6 (Realty Direct Blue)
Secondary: #0ea5e9 (Sky Blue)
Success: #10b981
Error: #ef4444
Warning: #f59e0b

Typography:

Headings: Inter or system font
Body: Inter or system font
Maintain consistent font sizes across devices

Spacing:

Use consistent spacing scale (4, 8, 16, 24, 32, 48, 64)
Maintain visual rhythm throughout the app

Components:

Use MUI components as base
Extend with Tailwind utilities
Keep consistent border radius (8px default)
Implement smooth transitions

🔧 Development Tools

Storybook: For component development and documentation
Playwright: For E2E testing
Bundle Analyzer: Monitor bundle size
Lighthouse CI: Automated performance testing

Remember: Every decision should prioritize SEO, performance, and user experience. When in doubt, choose the option that loads faster and ranks better in search engines.

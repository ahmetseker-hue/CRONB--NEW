import HeroSection from '@/components/sections/HeroSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import OrbitalSection from '@/components/sections/OrbitalSection'
import TabsSection from '@/components/sections/TabsSection'
import ProductDetails from '@/components/sections/ProductDetail'
import BlogSection from '@/components/sections/BlogSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <OrbitalSection />
      <TabsSection />
      <ProductDetails />
      <BlogSection />
      <CTASection />
    </>
  )
}

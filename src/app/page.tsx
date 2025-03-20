import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import TeamSection from '@/components/home/TeamSection'
import GallerySection from '@/components/home/GallerySection'
import ReviewsSection from '@/components/home/ReviewsSection'
import BlogSection from '@/components/home/BlogSection'
import ContactSection from '@/components/home/ContactSection'

export default function Home() {
  return (
    <div className="animate-fade-in">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      <GallerySection />
      <ReviewsSection />
      <BlogSection />
      <ContactSection />
    </div>
  )
}

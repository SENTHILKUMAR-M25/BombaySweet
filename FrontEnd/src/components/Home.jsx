import React from 'react'
import HeroCarousel from '../pages/Hero'
import ProductCard from '../pages/ProductPage'
import ExperienceSection from '../pages/ExperienceSection'

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <ExperienceSection />
      <ProductCard />
    </div>
  )
}

export default Home

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Global GSAP defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
})

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
})

export { gsap, ScrollTrigger }

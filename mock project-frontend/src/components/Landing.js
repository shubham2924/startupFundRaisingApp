import { useState, useEffect } from 'react'
import { Navigation } from './landingcomponents/navigation'
import { Header } from './landingcomponents/header'
import { Features } from './landingcomponents/features'
import { About } from './landingcomponents/about'

import { Testimonials } from './landingcomponents/testimonials'
import { Footer } from './landingcomponents/footer'
import JsonData from './data/data.json'



const Landing = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])

  return (
    <div>
      <Navigation />
      <div style={{marginTop:"1450px"}}></div>
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Testimonials data={landingPageData.Testimonials} />
      <Footer />
    </div>
  )
}

export default Landing
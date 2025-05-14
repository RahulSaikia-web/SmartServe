import HeroSection from '../../components/HeroSection/HeroSection'
import MostBooking from '../../components/MostBooking/MostBooking'
import Services from '../../components/Services/Services'
import Layout from '../../Layout/Layout'

function Home() {
  return (
    <Layout>
      <HeroSection/>
      <MostBooking/>
      <Services/>
    </Layout>
  )
}

export default Home

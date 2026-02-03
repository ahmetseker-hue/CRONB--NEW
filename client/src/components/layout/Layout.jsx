import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-cronbi-dark">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

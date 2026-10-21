import { ThemeProvider } from './context/ThemeContext'
import { Footer } from './components/Footer'
import { NavMesh } from './components/NavMesh'
import { NetworkBackground } from './components/NetworkBackground'
import { AmazonConnectWidget } from './components/AmazonConnectWidget'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Resume } from './sections/Resume'
import { Skills } from './sections/Skills'

function App() {
  return (
    <ThemeProvider>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <NetworkBackground />
      <div className="relative z-10 flex min-h-svh flex-col">
        <NavMesh />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Resume />
          <Contact />
        </main>
        <AmazonConnectWidget />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

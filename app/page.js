"use client"
import { useEffect } from "react"
import Head from "next/head"
import Contect from "./_components/Contect"
import { FaGithub } from "react-icons/fa"
import { ModeToggle } from "@/components/ModeToggle"
import { ArrowDown, ArrowRight, CheckCircle, Code, Cpu, MessageSquare, Sparkles, Star, Users } from "lucide-react"

const page = () => {
  // Intersection Observer setup
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".reveal-on-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    animatedElements.forEach((el) => {
      observer.observe(el)
    })

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background relative animated-bg">
      <Head>
        <title>InterviewAI</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="sticky top-0 z-50 w-full py-4 backdrop-blur-md bg-background/80 shadow-sm border-b border-primary/10 transition-all duration-300">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <h1 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  InterviewAI
                </h1>
              </div>
            </div>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-4">
  <div className="relative group">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://github.com/sponsors/Soumilgit"
      className="absolute inset-0 z-10"
      aria-label="Sponsor Soumil on GitHub"
    ></a>
    <iframe
      src="https://github.com/sponsors/Soumilgit/button"
      title="Sponsor Soumil on GitHub"
      height="32"
      width="114"
      className="border-0 rounded-lg relative"
    ></iframe>
  </div>

  <a
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/Soumilgit"
    className="inline-block relative group"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
    <FaGithub className="relative text-foreground hover:text-primary transition-colors w-7 h-7" />
  </a>

  <ModeToggle />
</div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
                <a
                  href="#features"
                  className="text-lg text-foreground hover:text-primary mx-2 md:mx-4 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-lg text-foreground hover:text-primary mx-2 md:mx-4 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-lg text-foreground hover:text-primary mx-2 md:mx-4 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 px-6 md:px-0 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
            <div className="absolute top-40 right-20 w-64 h-64 bg-accent/10 rounded-full filter blur-3xl animate-float animation-delay-1000"></div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="reveal-on-scroll animate-fade-down">
              <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                Ace Your Next Interview
              </h2>
            </div>

            <div className="reveal-on-scroll animate-fade-up delay-200">
              <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-3xl">
                Practice with AI-powered mock interviews and get personalized feedback to improve your interview skills
                and land your dream job.
              </p>
            </div>

            <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center reveal-on-scroll animate-fade-up delay-300">
              <a
                href="/dashboard"
                className="group relative px-8 py-3 text-lg font-semibold overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-primary to-secondary"></div>
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105"></div>
                <span className="relative z-10 text-white flex items-center justify-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a href="#features" className="group relative px-8 py-3 text-lg font-semibold overflow-hidden rounded-lg">
                <div className="absolute inset-0 w-full h-full transition-all duration-300 border-2 border-primary/50 dark:border-primary/30"></div>
                <div className="absolute inset-0 w-full h-full bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10 text-foreground flex items-center justify-center gap-2">
                  Learn More <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <ArrowDown className="w-6 h-6 text-primary/70" />
            <span className="text-sm text-foreground/50">Scroll to explore</span>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-6 md:px-0 relative">
          <div className="container mx-auto text-center relative z-10">
            <div className="reveal-on-scroll animate-fade-down">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Features
              </h2>
              <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                Our AI Mock Interview platform offers a range of powerful features:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="reveal-on-scroll animate-slide-in-left delay-100">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 h-full border border-primary/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                        <MessageSquare className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">AI Mock Interviews</h3>
                      <p className="text-foreground/70">
                        Experience realistic interview scenarios with our advanced AI that adapts to your responses and
                        provides real-time feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll animate-fade-up delay-200">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 h-full border border-primary/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6 mx-auto">
                        <Sparkles className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">Instant Feedback</h3>
                      <p className="text-foreground/70">
                        Get instant, personalized feedback to improve your performance and identify areas for growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll animate-slide-in-right delay-300">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 h-full border border-primary/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 mx-auto">
                        <CheckCircle className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">Comprehensive Reports</h3>
                      <p className="text-foreground/70">
                        Receive detailed reports highlighting your strengths and weaknesses with actionable insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="reveal-on-scroll animate-slide-in-left delay-400">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 h-full border border-primary/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                        <Cpu className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">Advanced AI Technology</h3>
                      <p className="text-foreground/70">
                        Powered by state-of-the-art AI models that understand context and provide human-like
                        interactions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>



              <div className="reveal-on-scroll animate-slide-in-right delay-600">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 h-full border border-primary/10 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 mx-auto">
                        <Users className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">Industry Specific</h3>
                      <p className="text-foreground/70">
                        Tailored interviews for different industries and roles to match your specific career goals, helps gain insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-6 md:px-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background opacity-50"></div>
          <div className="container mx-auto text-center relative z-10">
            <div className="reveal-on-scroll animate-fade-down">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                What Our Users Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="reveal-on-scroll animate-slide-in-left">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 border border-primary/10 relative">
                    <div className="absolute top-4 right-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground/80 text-lg mt-6">
                      "The AI mock interviews were incredibly helpful. I felt much more confident going into my real
                      interview. The feedback was detailed and actionable."
                    </p>
                    <div className="mt-6 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        MK
                      </div>
                      <div className="ml-4 text-left">
                        <h4 className="text-lg font-semibold text-foreground">Mohan Kumar</h4>
                        <p className="text-sm text-foreground/60">Software Engineer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reveal-on-scroll animate-slide-in-right">
                <div className="rounded-xl overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]">
                  <div className="glass p-8 border border-primary/10 relative">
                    <div className="absolute top-4 right-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-foreground/80 text-lg mt-6">
                      "The feedback was spot on and helped me improve my answers. The platform is intuitive and the AI
                      feels remarkably human-like. Highly recommend!"
                    </p>
                    <div className="mt-6 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                        SR
                      </div>
                      <div className="ml-4 text-left">
                        <h4 className="text-lg font-semibold text-foreground">Soham Ram</h4>
                        <p className="text-sm text-foreground/60">Product Manager</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 md:px-0 relative">
          <div className="reveal-on-scroll animate-fade-up">
            <Contect />
          </div>
        </section>
      </main>

      <footer className="py-8 bg-gradient-to-r from-primary/90 to-secondary/90 text-white text-center relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">InterviewAI</h3>
              <p className="text-white/80">
                Ace your next interview with AI-powered mock interviews and personalized feedback.
              </p>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-white/80 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white/80 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Soumilgit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/20">
            <p className="text-white/80">© {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page

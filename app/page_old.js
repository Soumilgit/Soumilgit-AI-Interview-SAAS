"use client"
import { useEffect, useState } from "react"
import Head from "next/head"
import Contect from "./_components/Contect"
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa"
import { ModeToggle } from "@/components/ModeToggle"
import { Menu, X, ArrowRight, MessageSquare, BarChart3, Target, Zap } from "lucide-react"

const socialLinks = {
  github: "https://github.com/Soumilgit/Soumilgit-AI-Interview-SAAS",
  githubProfile: "https://github.com/Soumilgit",
  linkedin: "https://www.linkedin.com/in/soumilm30/",
  instagram: "https://www.instagram.com/soumil_m.exe/",
  twitterWeb: "https://twitter.com/SoumilMukh6476",
  twitterApp: "twitter://user?screen_name=SoumilMukh6476",
};

const openAppOrFallback = (appLink, webLink) => {
  const timeout = setTimeout(() => {
    window.open(webLink, "_blank");
  }, 300);

  window.location.href = appLink;

  window.addEventListener("blur", () => clearTimeout(timeout), { once: true });
};

const page = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(null)

  // System theme detection and caching
  useEffect(() => {
    const cachedTheme = localStorage.getItem("theme-mode")
    
    if (cachedTheme) {
      setIsDarkMode(cachedTheme === "dark")
    } else {
      // Detect system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
      localStorage.setItem("theme-mode", prefersDark ? "dark" : "light")
    }
  }, [])

  // Intersection Observer setup for scroll animations
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

  // Smooth scroll to section
  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>SimulateRecruitAI</title>
        <meta name="description" content="Master your interview skills with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="fixed top-0 z-50 w-full py-4 bg-background/95 backdrop-blur-sm shadow-sm border-b border-foreground/5 transition-all duration-300">
          <div className="container mx-auto flex justify-between items-center px-6">
            {/* Logo */}
            <a href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-300">
              SimulateRecruitAI
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("faqs")}
                className="text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-foreground hover:text-primary transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                Contact
              </button>
            </nav>

            {/* Right side: Icons and Menu */}
            <div className="flex items-center space-x-4">
              {/* Sponsor Button */}
              <iframe
                src="https://github.com/sponsors/Soumilgit/button"
                title="Sponsor Soumil on GitHub"
                height="32"
                width="114"
                className="border-0 rounded-lg hidden sm:block"
              ></iframe>

              {/* GitHub Icon */}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={socialLinks.github}
                className="text-foreground hover:text-primary transition-colors duration-300"
                title="GitHub Repository"
              >
                <FaGithub className="w-6 h-6" />
              </a>

              {/* Mode Toggle */}
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-foreground hover:text-primary transition-colors duration-300"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Mobile Mode Toggle */}
              <div className="md:hidden">
                <ModeToggle />
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-foreground/5 bg-background/95 backdrop-blur-sm">
              <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-left py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-left py-2"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-left py-2"
                >
                  FAQs
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-foreground hover:text-primary transition-colors duration-300 text-left py-2"
                >
                  Contact
                </button>
              </nav>
            </div>
          )}
        </header>

        {/* Spacing for fixed header */}
        <div className="h-20"></div>

        {/* Hero Section */}
        <section id="about" className="relative py-20 md:py-32 px-6 overflow-hidden">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="reveal-on-scroll animate-fade-up space-y-8">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                    Master Your Interview Skills
                  </h1>
                  <p className="text-xl text-foreground/70 leading-relaxed">
                    Practice realistic interview scenarios with AI-powered feedback. Get detailed insights to improve your performance and land your dream role.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="/dashboard"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground border-2 border-foreground/20 rounded-lg hover:border-primary hover:text-primary transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8">
                  <div className="reveal-on-scroll animate-fade-up delay-100">
                    <p className="text-3xl font-bold text-primary">500+</p>
                    <p className="text-sm text-foreground/60 mt-2">Interview Questions</p>
                  </div>
                  <div className="reveal-on-scroll animate-fade-up delay-200">
                    <p className="text-3xl font-bold text-primary">AI-Powered</p>
                    <p className="text-sm text-foreground/60 mt-2">Real-time Feedback</p>
                  </div>
                  <div className="reveal-on-scroll animate-fade-up delay-300">
                    <p className="text-3xl font-bold text-primary">24/7</p>
                    <p className="text-sm text-foreground/60 mt-2">Practice Available</p>
                  </div>
                </div>
              </div>

              {/* Visual Element - Interview Mockup */}
              <div className="reveal-on-scroll animate-fade-down hidden md:flex items-center justify-center perspective">
                <div className="relative w-full h-full min-h-96 flex items-center justify-center">
                  {/* Background blur elements */}
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div className="absolute w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float"></div>
                    <div className="absolute w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
                  </div>

                  {/* Main Interview Interface Mockup */}
                  <div className="relative w-full max-w-md z-10">
                    {/* Top Window Bar - Interview Screen */}
                    <div className="bg-gradient-to-br from-primary/15 to-secondary/10 rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl backdrop-blur-md">
                      {/* Browser/App Header */}
                      <div className="bg-gradient-to-r from-primary/30 to-secondary/20 px-6 py-4 border-b border-foreground/10">
                        <div className="flex gap-2 mb-3">
                          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                        </div>
                        <p className="text-xs text-foreground/60">Interview Practice Session</p>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 space-y-6">
                        {/* Video Placeholder - Candidate */}
                        <div className="relative">
                          <div className="aspect-video bg-gradient-to-br from-primary/25 via-secondary/15 to-primary/20 rounded-2xl overflow-hidden border border-primary/30 shadow-lg group">
                            {/* Animated video effect */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary/80 flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
                                  <span className="text-2xl">🎥</span>
                                </div>
                                <p className="text-sm text-foreground/60">Your Response Recording</p>
                              </div>
                            </div>
                            {/* Animated scan line effect */}
                            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"></div>
                            </div>
                          </div>
                          {/* Recording indicator */}
                          <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full backdrop-blur-sm">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                            <span className="text-xs text-white font-semibold">2:34</span>
                          </div>
                        </div>

                        {/* Question Display */}
                        <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                          <p className="text-xs text-foreground/60 mb-2 font-semibold">QUESTION</p>
                          <p className="text-sm text-foreground leading-relaxed">
                            "Tell us about a time when you had to work with a difficult team member. How did you handle it?"
                          </p>
                        </div>

                        {/* AI Analysis Widget */}
                        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20 space-y-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-foreground/70 font-semibold">🤖 AI ANALYSIS</p>
                            <div className="flex gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-background/40 rounded-lg p-2">
                              <p className="text-xs text-foreground/60">Clarity</p>
                              <p className="text-lg font-bold text-primary">8.2/10</p>
                            </div>
                            <div className="bg-background/40 rounded-lg p-2">
                              <p className="text-xs text-foreground/60">Confidence</p>
                              <p className="text-lg font-bold text-secondary">7.9/10</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button className="flex-1 bg-primary/90 hover:bg-primary text-white text-xs font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                            Submit Answer
                          </button>
                          <button className="flex-1 bg-foreground/5 hover:bg-foreground/10 text-foreground text-xs font-semibold py-2 rounded-lg transition-all duration-300 border border-foreground/10">
                            Retake
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Floating insights badge */}
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-secondary to-secondary/60 text-white px-4 py-3 rounded-2xl shadow-lg border border-secondary/40 max-w-xs animate-bounce" style={{animationDelay: '0.5s'}}>
                      <p className="text-xs font-bold">✨ AI Powered</p>
                      <p className="text-xs opacity-90">Real-time feedback generation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 px-6 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <div className="reveal-on-scroll animate-fade-down">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Powerful Features for Success
                </h2>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                  Everything you need to prepare for your next interview and excel in your career.
                </p>
              </div>
            </div>

            {/* First row of features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="reveal-on-scroll animate-fade-up delay-100 group">
                <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">AI Mock Interviews</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    Experience realistic interview scenarios with AI that adapts to your responses and provides intelligent follow-up questions.
                  </p>
                </div>
              </div>

              <div className="reveal-on-scroll animate-fade-up delay-200 group">
                <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Detailed Feedback</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    Get comprehensive analysis of your responses including communication style, technical accuracy, and areas for improvement.
                  </p>
                </div>
              </div>

              <div className="reveal-on-scroll animate-fade-up delay-300 group">
                <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Comprehensive Reports</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    Receive detailed performance reports highlighting your strengths, weaknesses, and personalized recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Second row of features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="reveal-on-scroll animate-fade-up delay-400 group">
                <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Industry-Specific Content</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    Access interview questions tailored to your industry and role, with scenarios relevant to your target position.
                  </p>
                </div>
              </div>

              <div className="reveal-on-scroll animate-fade-up delay-500 group">
                <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Behavioral Analysis</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    Track your speaking pace, tone, and body language patterns with advanced analysis tools for continuous improvement.
                  </p>
                </div>
              </div>

              <div className="reveal-on-scroll animate-fade-up delay-600 group">
                <div className="p-8 rounded-2xl border border-foreground/10 hover:border-primary/40 transition-all duration-500 h-full hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
                  <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Track Progress</h3>
                  <p className="text-foreground/60 leading-relaxed">
                    Monitor your improvement over time with visual dashboards and performance metrics from all your practice sessions.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Showcase - Performance Dashboard */}
            <div className="mt-20 reveal-on-scroll animate-fade-up">
              <div className="relative bg-gradient-to-b from-primary/5 to-secondary/5 rounded-3xl p-12 md:p-16 border border-foreground/10 overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl -z-10"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                  {/* Left: Heading and Description */}
                  <div className="space-y-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                      See Your Growth in Real-Time
                    </h3>
                    <p className="text-lg text-foreground/70 leading-relaxed">
                      Track every aspect of your interview performance with detailed analytics and visual dashboards that show your progress across different skill categories.
                    </p>
                    <div className="space-y-3 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                        <p className="text-foreground/80">Analyze communication clarity and speaking pace</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-secondary flex-shrink-0"></div>
                        <p className="text-foreground/80">Measure content quality and technical accuracy</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                        <p className="text-foreground/80">Compare performance across different interview types</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: Analytics Dashboard Mockup */}
                  <div className="space-y-4">
                    {/* Overall Score Card */}
                    <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-6 border border-foreground/10 hover:border-primary/40 transition-all duration-300">
                      <p className="text-xs text-foreground/60 mb-4">OVERALL PERFORMANCE</p>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-semibold text-foreground">Score Trend</span>
                            <span className="text-sm text-green-600 font-bold">+12%</span>
                          </div>
                          <div className="flex gap-1 h-2">
                            <div className="flex-1 bg-foreground/10 rounded-full"></div>
                            <div className="flex-1 bg-foreground/15 rounded-full"></div>
                            <div className="flex-1 bg-foreground/20 rounded-full"></div>
                            <div className="flex-1 bg-primary/60 rounded-full"></div>
                            <div className="flex-1 bg-primary rounded-full"></div>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-primary pt-2">78/100</div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                        <p className="text-xs text-foreground/60 mb-2">Communication</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-primary">8.5</span>
                          <span className="text-xs text-foreground/60">/10</span>
                        </div>
                        <p className="text-xs text-foreground/70 mt-1">Professional tone</p>
                      </div>
                      <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                        <p className="text-xs text-foreground/60 mb-2">Content Quality</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-primary">7.2</span>
                          <span className="text-xs text-foreground/60">/10</span>
                        </div>
                        <p className="text-xs text-foreground/70 mt-1">Relevance & depth</p>
                      </div>
                      <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                        <p className="text-xs text-foreground/60 mb-2">Confidence</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-primary">8.1</span>
                          <span className="text-xs text-foreground/60">/10</span>
                        </div>
                        <p className="text-xs text-foreground/70 mt-1">Delivery & presence</p>
                      </div>
                      <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                        <p className="text-xs text-foreground/60 mb-2">Focus Area</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-primary">6.8</span>
                          <span className="text-xs text-foreground/60">/10</span>
                        </div>
                        <p className="text-xs text-foreground/70 mt-1">Technical depth</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 md:py-32 px-6 bg-gradient-to-l from-primary/5 via-transparent to-secondary/5">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <div className="reveal-on-scroll animate-fade-down">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  How It Works
                </h2>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                  From setup to success in four streamlined steps.
                </p>
              </div>
            </div>

            {/* Timeline with connecting curves */}
            <div className="relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 z-0"></div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {/* Step 1 - Setup */}
                <div className="reveal-on-scroll animate-fade-up delay-100">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-8 w-full flex justify-center group">
                      {/* Step Visual - Setup Screen */}
                      <div className="w-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                        <div className="bg-background/60 rounded-lg p-3 space-y-2 backdrop-blur-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-primary/60"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                            <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-2 bg-primary/30 rounded w-3/4"></div>
                            <div className="h-2 bg-primary/20 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 h-2 bg-primary/40 rounded text-xs"></button>
                          <button className="flex-1 h-2 bg-primary/20 rounded text-xs"></button>
                        </div>
                      </div>
                      {/* Circle indicator */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg font-bold text-sm z-20">
                        1
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2">Create Account</h3>
                    <p className="text-foreground/60 text-center text-sm leading-relaxed">
                      Sign up with your email and select your target role
                    </p>
                  </div>
                </div>

                {/* Step 2 - Practice */}
                <div className="reveal-on-scroll animate-fade-up delay-200">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-8 w-full flex justify-center group">
                      {/* Step Visual - Practice/Interview Screen */}
                      <div className="w-full bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-4 border border-secondary/30 hover:border-secondary/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                        <div className="bg-background/60 rounded-lg p-3 space-y-3 backdrop-blur-sm">
                          <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/10 rounded-lg flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-secondary/40 flex items-center justify-center text-xs">🎙️</div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-1.5 bg-secondary/30 rounded w-full"></div>
                            <div className="h-1 bg-secondary/20 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                      {/* Circle indicator */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 text-white flex items-center justify-center shadow-lg font-bold text-sm z-20">
                        2
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2">Start Interview</h3>
                    <p className="text-foreground/60 text-center text-sm leading-relaxed">
                      Begin your mock interview with AI-generated questions
                    </p>
                  </div>
                </div>

                {/* Step 3 - Analyze */}
                <div className="reveal-on-scroll animate-fade-up delay-300">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-8 w-full flex justify-center group">
                      {/* Step Visual - Analytics Screen */}
                      <div className="w-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                        <div className="bg-background/60 rounded-lg p-3 space-y-2 backdrop-blur-sm">
                          <div className="flex justify-between">
                            <div className="h-8 w-2 bg-primary/60 rounded"></div>
                            <div className="h-5 w-2 bg-primary/40 rounded"></div>
                            <div className="h-6 w-2 bg-primary/50 rounded"></div>
                          </div>
                          <div className="h-1 bg-primary/20 rounded w-full"></div>
                        </div>
                      </div>
                      {/* Circle indicator */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg font-bold text-sm z-20">
                        3
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2">Get Feedback</h3>
                    <p className="text-foreground/60 text-center text-sm leading-relaxed">
                      Receive instant AI-powered detailed analysis of your performance
                    </p>
                  </div>
                </div>

                {/* Step 4 - Improve */}
                <div className="reveal-on-scroll animate-fade-up delay-400">
                  <div className="flex flex-col items-center">
                    <div className="relative mb-8 w-full flex justify-center group">
                      {/* Step Visual - Progress Screen */}
                      <div className="w-full bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl p-4 border border-secondary/30 hover:border-secondary/60 transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                        <div className="bg-background/60 rounded-lg p-3 space-y-2 backdrop-blur-sm">
                          <div className="flex justify-between text-xs text-foreground/60">
                            <span>Progress</span>
                            <span>85%</span>
                          </div>
                          <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                            <div className="h-full w-10/12 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-1 pt-1">
                            <div className="h-1 bg-secondary/30 rounded"></div>
                            <div className="h-1 bg-secondary/50 rounded"></div>
                          </div>
                        </div>
                      </div>
                      {/* Circle indicator */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-secondary/80 text-white flex items-center justify-center shadow-lg font-bold text-sm z-20">
                        4
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2">Track Progress</h3>
                    <p className="text-foreground/60 text-center text-sm leading-relaxed">
                      Monitor improvements and retake to build confidence
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Flow Stats */}
            <div className="mt-20 reveal-on-scroll animate-fade-up grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-foreground/10 text-center hover:border-primary/40 transition-all duration-300">
                <p className="text-4xl font-bold text-primary mb-2">2-3 mins</p>
                <p className="text-foreground/70">Average time per interview</p>
              </div>
              <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-foreground/10 text-center hover:border-secondary/40 transition-all duration-300">
                <p className="text-4xl font-bold text-secondary mb-2">Instant</p>
                <p className="text-foreground/70">AI feedback generation</p>
              </div>
              <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-foreground/10 text-center hover:border-primary/40 transition-all duration-300">
                <p className="text-4xl font-bold text-primary mb-2">Unlimited</p>
                <p className="text-foreground/70">Practice sessions anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faqs" className="py-20 md:py-32 px-6 bg-foreground/2">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-20">
              <div className="reveal-on-scroll animate-fade-down">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                  Everything you need to know about SimulateRecruitAI and interview preparation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* FAQ Item 1 */}
              <div className="reveal-on-scroll animate-fade-up delay-100">
                <div className="group cursor-pointer">
                  <div className="p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      How does the AI generate interview questions?
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Our AI uses advanced natural language processing trained on thousands of real interview scenarios across different industries and roles. Questions are dynamically generated based on your selected position and adapt based on your responses.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="reveal-on-scroll animate-fade-up delay-200">
                <div className="group cursor-pointer">
                  <div className="p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Can I practice specific industries or roles?
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Absolutely. We offer interviews tailored to various industries like tech, finance, healthcare, sales, marketing, and more. Each role has industry-specific questions and scenarios relevant to that field.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="reveal-on-scroll animate-fade-up delay-300">
                <div className="group cursor-pointer">
                  <div className="p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      What kind of feedback do I receive?
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      You get comprehensive feedback on content quality, communication skills, and areas for improvement. Our system analyzes your answers for technical accuracy, structure, clarity, and provides specific suggestions for enhancement.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="reveal-on-scroll animate-fade-up delay-400">
                <div className="group cursor-pointer">
                  <div className="p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      How often should I practice?
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      We recommend practicing 3-4 times per week, with each session lasting 20-45 minutes. Consistency is key to building confidence. Our dashboard tracks your progress and suggests optimal practice schedules.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 5 */}
              <div className="reveal-on-scroll animate-fade-up delay-500">
                <div className="group cursor-pointer">
                  <div className="p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Can I track my improvement over time?
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Yes. Our advanced analytics dashboard shows your performance metrics across different categories. You can see trends, identify weak areas, and measure growth through detailed performance reports.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 6 */}
              <div className="reveal-on-scroll animate-fade-up delay-600">
                <div className="group cursor-pointer">
                  <div className="p-6 rounded-2xl border border-foreground/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      Is there a free trial available?
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Yes, you can start with our free tier that includes limited practice interviews. Upgrade to premium for unlimited access, advanced analytics, and personalized coaching insights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-6 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 relative overflow-hidden">
          {/* Background animations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float" style={{animationDelay: '1.5s'}}></div>
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <div className="reveal-on-scroll animate-fade-up space-y-6">
                <div className="space-y-4">
                  <div className="inline-block px-4 py-2 bg-primary/15 rounded-full border border-primary/30 mb-4">
                    <span className="text-sm font-semibold text-primary">🚀 Transform Your Interview Skills</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Ready to Land Your Dream Job?
                  </h2>
                  <p className="text-lg text-foreground/70 leading-relaxed">
                    Join thousands of professionals who have successfully passed interviews using our AI-powered platform. Start your journey to career success today.
                  </p>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                    <p className="text-2xl font-bold text-primary">95%</p>
                    <p className="text-xs text-foreground/70 mt-1">Success Rate</p>
                  </div>
                  <div className="bg-background/60 backdrop-blur-sm rounded-xl p-4 border border-foreground/10">
                    <p className="text-2xl font-bold text-secondary">50K+</p>
                    <p className="text-xs text-foreground/70 mt-1">Users Trained</p>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="/dashboard"
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-primary/80 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-foreground border-2 border-foreground/20 rounded-lg hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right: Success Visualization */}
              <div className="reveal-on-scroll animate-fade-down hidden md:flex items-center justify-center">
                <div className="relative w-full max-w-sm">
                  {/* Success Story Card */}
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/10 rounded-3xl p-8 border border-primary/20 shadow-2xl backdrop-blur-md">
                    {/* Success Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-full">
                      <span className="text-lg">✨</span>
                      <span className="text-sm font-semibold text-green-600">Success Story</span>
                    </div>

                    {/* Testimonial */}
                    <div className="space-y-6">
                      {/* User Info */}
                      <div>
                        <p className="text-lg font-semibold text-foreground mb-2">Job Offer Received!</p>
                        <p className="text-foreground/70 leading-relaxed">
                          "Using this platform, I nailed my interview at my dream company. The AI feedback was incredibly detailed and helped me improve my communication skills."
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-background/60 rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-primary">87%</p>
                          <p className="text-xs text-foreground/60 mt-1">Interview Score</p>
                        </div>
                        <div className="bg-background/60 rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-secondary">23</p>
                          <p className="text-xs text-foreground/60 mt-1">Practices</p>
                        </div>
                        <div className="bg-background/60 rounded-xl p-3 text-center">
                          <p className="text-xl font-bold text-primary">4 wks</p>
                          <p className="text-xs text-foreground/60 mt-1">Timeline</p>
                        </div>
                      </div>

                      {/* Progress Timeline */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">Week 1: Foundation</p>
                            <p className="text-xs text-foreground/60">Initial score: 62%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold text-secondary">2</div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">Week 2-3: Refinement</p>
                            <p className="text-xs text-foreground/60">Score improved: 75%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-foreground">Week 4: Mastery</p>
                            <p className="text-xs text-foreground/60">Final score: 87%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-secondary to-secondary/60 text-white px-4 py-3 rounded-2xl shadow-lg animate-bounce" style={{animationDelay: '0.3s'}}>
                    <p className="text-xs font-bold">Got the Job! 🎉</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-32 px-6">
          <div className="reveal-on-scroll animate-fade-up">
            <Contect />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-foreground/10 bg-background py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">SimulateRecruitAI</h3>
              <p className="text-foreground/60 leading-relaxed">
                Master your interview skills with AI-powered practice and personalized feedback for your dream job.
              </p>
            </div>

            {/* Links Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("faqs")}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Links Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Connect</h4>
              <div className="flex gap-3">
                <a
                  href={socialLinks.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.twitterWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  title="Instagram"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-foreground/10 pt-8">
            <p className="text-center text-foreground/50 text-sm">
              © {new Date().getFullYear()} SimulateRecruitAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page

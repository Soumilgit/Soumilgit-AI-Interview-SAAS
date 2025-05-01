import Head from "next/head"
import Contect from "./_components/Contect"
import { FaGithub } from "react-icons/fa"


const page = () => {
  return (
    <div className="dark:bg-gray-950">
      <Head>
        <title>AI Mock Interview</title>
        <meta name="description" content="Ace your next interview with AI-powered mock interviews" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full py-6 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Mock Interview</h1>
            <nav className="flex flex-col sm:flex-row flex-wrap items-center justify-between mt-4 md:mt-0 space-y-4 sm:space-y-0 sm:space-x-4">
              <div>
                <iframe
                  src="https://github.com/sponsors/Soumilgit/button"
                  title="Sponsor Soumil on GitHub"
                  height="32"
                  width="114"
                  className="border-0 rounded-lg"
                ></iframe>
              </div>

              <div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Soumilgit"
                  className="inline-block"
                >
                  <FaGithub className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors w-8 h-8" />
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
                <a
                  href="#features"
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mx-2 md:mx-4 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mx-2 md:mx-4 transition-colors"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-lg text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mx-2 md:mx-4 transition-colors"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 px-6 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">Ace Your Next Interview</h2>
          <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl">
            Practice with AI-powered mock interviews and get personalized feedback
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <a
              href="/dashboard"
              className="px-8 py-3 text-lg font-semibold bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-8 py-3 text-lg font-semibold border border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-gray-950 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Features</h2>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Our AI Mock Interview platform offers a range of powerful features:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="rounded-xl overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 p-8 h-full shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">AI Mock Interviews</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Experience realistic interview scenarios with our advanced AI.
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 p-8 h-full shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Instant Feedback</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get instant, personalized feedback to improve your performance.
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-800 p-8 h-full shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Comprehensive Reports</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Receive detailed reports highlighting your strengths and weaknesses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-100 dark:bg-gray-900 px-6 md:px-0">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="rounded-xl overflow-hidden">
                <div className="bg-white dark:bg-gray-800 p-8 shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    "The AI mock interviews were incredibly helpful. I felt much more confident going into my real
                    interview."
                  </p>
                  <h4 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">- Alex Johnson</h4>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <div className="bg-white dark:bg-gray-800 p-8 shadow-md hover:shadow-lg transition-shadow">
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    "The feedback was spot on and helped me improve my answers. Highly recommend this service!"
                  </p>
                  <h4 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">- Sarah Williams</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-950 px-6 md:px-0">
          <Contect />
        </section>
      </main>

      <footer className="py-8 bg-gray-900 dark:bg-black text-white text-center">
        <p className="text-gray-300 dark:text-gray-400">
          © {new Date().getFullYear()} AI Mock Interview. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default page

import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ThemeProvider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SimulateRecruitAI - Ace Your Next Interview",
  description: "Practice with AI-powered mock interviews and get personalized feedback",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Toaster position="top-center" richColors closeButton />
            {children}
          </ThemeProvider>
          <Script id="intersection-observer">
            {`
              document.addEventListener('DOMContentLoaded', function() {
                const animatedElements = document.querySelectorAll('.reveal-on-scroll');
                
                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('visible');
                      observer.unobserve(entry.target);
                    }
                  });
                }, {
                  threshold: 0.1,
                  rootMargin: '0px 0px -100px 0px'
                });
                
                animatedElements.forEach(el => {
                  observer.observe(el);
                });
              });
            `}
          </Script>
        </body>
      </html>
    </ClerkProvider>
  )
}

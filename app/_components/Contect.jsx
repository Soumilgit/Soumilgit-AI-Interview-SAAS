"use client"
import { db } from "@/utils/db"
import { Newsletter } from "@/utils/schema"
import moment from "moment"
import { useState } from "react"
import { toast } from "sonner"

const Contect = () => {
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value)
  }
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log(name, email, message)

    if (name && email && message) {
      setLoading(true)
      try {
        const resp = await db.insert(Newsletter).values({
          newName: name,
          newEmail: email,
          newMessage: message,
          createdAt: moment().format("YYYY-MM-DD"),
        })

        if (resp) {
          toast.success("Message sent successfully! We'll get back to you soon.", {
            description: "Thank you for reaching out to us.",
            duration: 5000,
          })
          setName("")
          setEmail("")
          setMessage("")
        } else {
          toast.error("Error sending message", {
            description: "Please try again later.",
          })
        }
      } catch (error) {
        console.error(error)
        toast.error("Error sending message", {
          description: "Please try again later.",
        })
      } finally {
        setLoading(false)
      }
    } else {
      toast.warning("Please fill in all fields", {
        description: "All fields are required to send a message.",
      })
    }
  }

  return (
    <div className="container mx-auto text-center px-4 py-12 md:py-16 reveal-on-scroll animate-fade-up">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Get In Touch
          </h2>
          <p className="text-lg text-foreground/70 mt-4 max-w-2xl mx-auto">
            Have any questions? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="rounded-xl p-6 md:p-8 transition-all duration-300 border border-foreground/10 relative overflow-hidden bg-background">
          <form onSubmit={onSubmit} className="space-y-5 relative z-10">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-foreground/80 text-left mb-1 ml-1">
                Name
              </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={handleInputChange(setName)}
                  className="w-full px-4 py-3 text-foreground bg-background border border-foreground/20 rounded-lg focus:ring-2 focus:ring-foreground/30 focus:border-transparent transition-colors duration-200"
                />
            </div>

            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-foreground/80 text-left mb-1 ml-1">
                Email
              </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  className="w-full px-4 py-3 text-foreground bg-background border border-foreground/20 rounded-lg focus:ring-2 focus:ring-foreground/30 focus:border-transparent transition-colors duration-200"
                />
            </div>

            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-foreground/80 text-left mb-1 ml-1">
                Message
              </label>
                <textarea
                  id="message"
                  placeholder="Your message"
                  value={message}
                  onChange={handleInputChange(setMessage)}
                  rows="5"
                  className="w-full px-4 py-3 text-foreground bg-background border border-foreground/20 rounded-lg focus:ring-2 focus:ring-foreground/30 focus:border-transparent transition-colors duration-200 resize-none"
                />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full md:w-auto px-6 py-3 text-base font-medium text-background bg-foreground rounded-lg hover:opacity-85 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center">
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    "Send Message"
                  )}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-primary/10">
            <p className="text-sm text-foreground/60">
              We respect your privacy and will never share your information with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contect

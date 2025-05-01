"use client"
import { db } from "@/utils/db"
import { Newsletter } from "@/utils/schema"
import { LoaderCircle } from "lucide-react"
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
          toast("User Response recorded successfully")
          setName("")
          setEmail("")
          setMessage("")
        } else {
          toast("Error recording response")
        }
      } catch (error) {
        console.error(error)
        toast("Error recording response")
      } finally {
        setLoading(false)
      }
    } else {
      toast("No data entered")
    }
  }

  return (
    <div className="container mx-auto text-center px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Have any questions? Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transition-all duration-200">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={handleInputChange(setName)}
                className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-colors duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={handleInputChange(setEmail)}
                className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-colors duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Your message"
                value={message}
                onChange={handleInputChange(setMessage)}
                rows="5"
                className="w-full px-4 py-3 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-colors duration-200 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-6 py-3 text-base font-medium text-white bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoaderCircle className="animate-spin mr-2 h-5 w-5" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We respect your privacy and will never share your information with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contect

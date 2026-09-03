"use client"
import { useState } from "react"
import { toast } from "sonner"

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" })
  const [loading, setLoading] = useState(false)
  const update = (event) => setForm((value) => ({ ...value, [event.target.name]: event.target.value }))
  const onSubmit = async (event) => {
    event.preventDefault(); setLoading(true)
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Unable to send message")
      setForm({ name: "", email: "", message: "", website: "" }); toast.success("Message sent successfully!")
    } catch (error) { toast.error(error.message || "Unable to send message") } finally { setLoading(false) }
  }
  return <div className="container mx-auto px-4 py-12 text-center md:py-16"><div className="mx-auto max-w-3xl"><div className="mb-10 space-y-2"><h2 className="text-3xl font-bold text-foreground md:text-4xl">Get In Touch</h2><p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/70">Have any questions? Reach out to us and we&apos;ll get back to you as soon as possible.</p></div><div className="overflow-hidden rounded-xl border border-foreground/10 bg-background p-6 md:p-8"><form onSubmit={onSubmit} className="space-y-5"><input name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" /><div><label htmlFor="name" className="mb-1 ml-1 block text-left text-sm font-medium text-foreground/80">Name</label><input id="name" name="name" value={form.name} onChange={update} maxLength="100" required className="w-full rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground" /></div><div><label htmlFor="email" className="mb-1 ml-1 block text-left text-sm font-medium text-foreground/80">Email</label><input id="email" name="email" type="email" value={form.email} onChange={update} maxLength="254" required className="w-full rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground" /></div><div><label htmlFor="message" className="mb-1 ml-1 block text-left text-sm font-medium text-foreground/80">Message</label><textarea id="message" name="message" value={form.message} onChange={update} maxLength="5000" rows="5" required className="w-full resize-none rounded-lg border border-foreground/20 bg-background px-4 py-3 text-foreground" /></div><button type="submit" disabled={loading} className="w-full rounded-lg bg-[hsl(260_60%_45%)] px-6 py-3 font-medium text-white hover:bg-[hsl(260_60%_40%)] disabled:opacity-70 md:w-auto">{loading ? "Sending..." : "Send Message"}</button></form></div></div></div>
}
export default Contact

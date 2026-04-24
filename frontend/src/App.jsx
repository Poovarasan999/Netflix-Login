import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = 'https://netflix-login-7ve0.onrender.com'

function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.email.trim() || !form.password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, form)
      if (response.data.success) {
        navigate('/dashboard')
      }
    } catch (requestError) {
      const apiError = requestError.response?.data?.message
      setError(apiError || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/4e5f4fca-4f9a-4515-95be-ec2f34dce8bc/web/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg')] bg-cover bg-center opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 py-8">
        <h1 className="text-3xl font-bold text-[#e50914] sm:text-4xl">NETFLIX</h1>

        <div className="mx-auto my-auto w-full max-w-md rounded bg-black/75 px-8 py-10 shadow-2xl sm:px-12">
          <h2 className="mb-7 text-3xl font-semibold">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded border border-zinc-600 bg-zinc-800/80 px-4 py-3 text-sm outline-none transition focus:border-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded border border-zinc-600 bg-zinc-800/80 px-4 py-3 text-sm outline-none transition focus:border-white"
            />

            {error ? (
              <p className="rounded bg-red-600/20 px-3 py-2 text-sm text-red-300">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded bg-[#e50914] py-3 text-sm font-semibold transition hover:bg-[#c11119] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="mt-8 rounded-md border border-yellow-400/40 bg-yellow-400/10 p-3 text-sm">
            <p className="font-semibold text-yellow-300">Demo credentials (highlighted):</p>
            <p className="mt-1 text-zinc-100">
              Email: <span className="rounded bg-yellow-300 px-2 py-0.5 font-semibold text-black">poovarasan@netflixclone.com</span>
            </p>
            <p className="mt-1 text-zinc-100">
              Password: <span className="rounded bg-yellow-300 px-2 py-0.5 font-semibold text-black">Remember@9</span>
            </p>
          </div>
        </div>

        <div className="mt-6 w-full rounded-2xl border border-zinc-700/70 bg-zinc-950/85 p-5 text-sm text-zinc-100">
          <p className="text-base font-semibold text-white">Project Flow Timeline</p>
          <p className="mt-1 text-xs text-zinc-400">How this Netflix clone is built</p>

          <div className="relative mt-5 pb-1">
            <div className="hidden lg:block absolute left-6 right-6 top-5 h-px bg-zinc-700" />
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-zinc-700/70 bg-zinc-900/70 p-3 transition hover:border-red-500/40">
                <span className="mb-2 block h-3 w-3 rounded-full border border-red-400/60 bg-red-500" />
                <p className="text-xs uppercase tracking-wide text-red-300">Step 01</p>
                <p className="mt-1 font-semibold text-white">Frontend Setup</p>
                <p className="mt-1 text-zinc-300">React + Vite + Tailwind CSS for responsive Netflix-like UI.</p>
              </div>

              <div className="rounded-lg border border-zinc-700/70 bg-zinc-900/70 p-3 transition hover:border-red-500/40">
                <span className="mb-2 block h-3 w-3 rounded-full border border-red-400/60 bg-red-500" />
                <p className="text-xs uppercase tracking-wide text-red-300">Step 02</p>
                <p className="mt-1 font-semibold text-white">Form + API Integration</p>
                <p className="mt-1 text-zinc-300">Email/password handled with React state and sent via Axios.</p>
              </div>

              <div className="rounded-lg border border-zinc-700/70 bg-zinc-900/70 p-3 transition hover:border-red-500/40">
                <span className="mb-2 block h-3 w-3 rounded-full border border-red-400/60 bg-red-500" />
                <p className="text-xs uppercase tracking-wide text-red-300">Step 03</p>
                <p className="mt-1 font-semibold text-white">Backend Authentication</p>
                <p className="mt-1 text-zinc-300">Node.js + Express + CORS with static mock credential validation.</p>
              </div>

              <div className="rounded-lg border border-zinc-700/70 bg-zinc-900/70 p-3 transition hover:border-red-500/40">
                <span className="mb-2 block h-3 w-3 rounded-full border border-red-400/60 bg-red-500" />
                <p className="text-xs uppercase tracking-wide text-red-300">Step 04</p>
                <p className="mt-1 font-semibold text-white">User Experience</p>
                <p className="mt-1 text-zinc-300">Validation, error messages, and success redirect to Dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-7 shadow-2xl">
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-pink-600/10 blur-3xl" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">Netflix Profile</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome back</h2>
              <p className="mt-2 text-zinc-300">user@netflixclone.com</p>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-300">
              Active Session
            </span>
          </div>
          <div className="relative z-10 mt-6 flex gap-3">
            <button className="rounded-md bg-[#e50914] px-5 py-2 text-sm font-semibold transition hover:bg-[#c11119]">
              Continue Watching
            </button>
            <button className="rounded-md border border-zinc-600 px-5 py-2 text-sm font-semibold transition hover:bg-zinc-800">
              Manage Profile
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-red-500/30 bg-gradient-to-b from-red-500/15 to-zinc-900 p-5 shadow-lg">
            <p className="text-sm text-zinc-400">Current Plan</p>
            <p className="mt-2 text-2xl font-bold">Premium Ultra HD</p>
            <p className="mt-1 text-sm text-zinc-300">Next billing: 30 Apr 2026</p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 shadow-lg">
            <p className="text-sm text-zinc-400">Watchlist</p>
            <p className="mt-2 text-2xl font-bold">18 Titles</p>
            <p className="mt-1 text-sm text-zinc-300">3 new releases added this week</p>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-5 shadow-lg">
            <p className="text-sm text-zinc-400">Devices</p>
            <p className="mt-2 text-2xl font-bold">2 / 4 in use</p>
            <p className="mt-1 text-sm text-zinc-300">TV Living Room, Mobile App</p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
          <h3 className="text-xl font-semibold">Continue Watching</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4 transition hover:-translate-y-0.5 hover:border-red-400/40">
              <p className="font-medium">Stranger Things</p>
              <p className="mt-1 text-sm text-zinc-300">S2:E4 - 26 min left</p>
            </div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4 transition hover:-translate-y-0.5 hover:border-red-400/40">
              <p className="font-medium">Money Heist</p>
              <p className="mt-1 text-sm text-zinc-300">S1:E9 - 14 min left</p>
            </div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4 transition hover:-translate-y-0.5 hover:border-red-400/40">
              <p className="font-medium">Dark</p>
              <p className="mt-1 text-sm text-zinc-300">S2:E5 - 19 min left</p>
            </div>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4 transition hover:-translate-y-0.5 hover:border-red-400/40">
              <p className="font-medium">Breaking Bad</p>
              <p className="mt-1 text-sm text-zinc-300">S3:E7 - 22 min left</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

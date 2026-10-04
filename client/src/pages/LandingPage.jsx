import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiFolder,
  FiAward,
  FiFileText,
  FiUsers,
  FiDownload
} from 'react-icons/fi'
import bannerImg from '../assets/banner_illustration.jpg'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4fa] text-neutral-800 font-sans antialiased selection:bg-brand-500 selection:text-white">
      {/* Top Navigation */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-2xl font-black tracking-tight text-neutral-900">certify</span>
          <span className="text-2xl font-black text-brand-600">.</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-600">
          <a href="#features" className="hover:text-brand-600 transition-colors">Platform Features</a>
          <a href="#preview" className="hover:text-brand-600 transition-colors">Interface</a>
          <a href="#accreditation" className="hover:text-brand-600 transition-colors">Accreditation</a>
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            to="/teacher/login"
            className="text-xs font-bold text-neutral-700 hover:text-brand-600 px-4 py-2 rounded-full transition-colors"
          >
            Faculty Portal
          </Link>
          <Link
            to="/student/login"
            className="btn-pill text-xs px-5 py-2.5 shadow-brand"
          >
            Student Portal →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-200/80 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
              Institutional Certificate Repository
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1] mb-6"
          >
            Every student achievement, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600">
              verified and organized.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A high-speed institutional digital credential repository designed for universities,
            faculty coordinators, and students. Instant upload, category tagging, and tamper-proof verification.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              to="/teacher/login"
              className="btn-pill text-sm py-3.5 px-8 shadow-brand hover:scale-102 transition-transform w-full sm:w-auto"
            >
              Sign In as Faculty
            </Link>
            <Link
              to="/student/login"
              className="btn-secondary text-sm py-3.5 px-8 bg-white border border-neutral-200/80 hover:bg-neutral-50 shadow-soft w-full sm:w-auto font-semibold"
            >
              Student Portal Access
            </Link>
          </motion.div>

          {/* Interactive UI Mockup Preview */}
          <motion.div
            id="preview"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mx-auto max-w-5xl rounded-3xl bg-white p-3 sm:p-5 shadow-2xl border border-neutral-200/80 overflow-hidden"
          >
            {/* Mock Dashboard Topbar */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3 mb-4 px-2">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-mono text-neutral-400 pl-2">certify.institutional.hub</span>
              </div>
              <span className="text-xs font-bold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                Live Cloud Sync
              </span>
            </div>

            {/* Folder Previews */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="bg-brand-600 text-white rounded-2xl p-5 shadow-brand">
                <span className="text-[10px] font-bold text-brand-200 uppercase tracking-wider block mb-2">
                  SHARED WITH
                </span>
                <div className="flex -space-x-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-white/30 border border-white inline-block" />
                  <span className="w-6 h-6 rounded-full bg-white/40 border border-white inline-block" />
                  <span className="w-6 h-6 rounded-full bg-white/50 border border-white inline-block" />
                </div>
                <span className="text-[10px] text-brand-200 uppercase font-bold">FOLDER</span>
                <h4 className="text-base font-bold text-white">Computer Science 2026</h4>
                <p className="text-xs text-brand-200 mt-0.5">18 Student Portfolios</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  SHARED WITH
                </span>
                <div className="flex -space-x-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-neutral-300 border border-white inline-block" />
                  <span className="w-6 h-6 rounded-full bg-neutral-400 border border-white inline-block" />
                </div>
                <span className="text-[10px] text-neutral-400 uppercase font-bold">FOLDER</span>
                <h4 className="text-base font-bold text-neutral-800">Information Science</h4>
                <p className="text-xs text-neutral-400 mt-0.5">14 Student Portfolios</p>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  SHARED WITH
                </span>
                <div className="flex -space-x-2 mb-4">
                  <span className="w-6 h-6 rounded-full bg-neutral-300 border border-white inline-block" />
                  <span className="w-6 h-6 rounded-full bg-neutral-400 border border-white inline-block" />
                </div>
                <span className="text-[10px] text-neutral-400 uppercase font-bold">FOLDER</span>
                <h4 className="text-base font-bold text-neutral-800">Hackathons & MOOCs</h4>
                <p className="text-xs text-neutral-400 mt-0.5">42 Verified Awards</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-20 px-6 bg-white border-t border-neutral-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-neutral-900 tracking-tight mb-3">
              Built for institutional excellence
            </h2>
            <p className="text-sm text-neutral-500">
              Modern engineering designed to make certificate auditing, accreditation visits, and student achievement tracking effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100/90 shadow-card hover:shadow-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
                <FiFolder className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Automated Student Folders
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Students are organized cleanly by University Seat Number (USN), academic department, and semester.
              </p>
              <div className="flex items-center text-xs font-bold text-brand-600">
                <FiCheckCircle className="mr-1.5 w-4 h-4" /> Instant folder search & filter
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100/90 shadow-card hover:shadow-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <FiShield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Bcrypt & JWT Protected
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Enterprise security with salted bcrypt password hashing and token-based authentication for students and faculty.
              </p>
              <div className="flex items-center text-xs font-bold text-emerald-600">
                <FiCheckCircle className="mr-1.5 w-4 h-4" /> Role-isolated endpoints
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100/90 shadow-card hover:shadow-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <FiDownload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">
                Drag & Drop PDF Storage
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                Upload certificates directly in browser, categorise with tags (Course, Workshop, Hackathon), and download on demand.
              </p>
              <div className="flex items-center text-xs font-bold text-blue-600">
                <FiCheckCircle className="mr-1.5 w-4 h-4" /> In-browser PDF renderer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200/80 bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center">
            <span className="font-black text-neutral-900 text-sm">certify</span>
            <span className="font-black text-brand-600 text-sm">.</span>
            <span className="ml-2 font-medium">© {new Date().getFullYear()} Student Certificate Repository.</span>
          </div>
          <div className="flex items-center space-x-6 font-medium">
            <Link to="/teacher/login" className="hover:text-brand-600">Faculty Portal</Link>
            <Link to="/student/login" className="hover:text-brand-600">Student Portal</Link>
            <Link to="/teacher/signup" className="hover:text-brand-600">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
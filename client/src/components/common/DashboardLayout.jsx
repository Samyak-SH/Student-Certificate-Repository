import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCompass,
  FiFolder,
  FiShare2,
  FiInbox,
  FiTrash2,
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiPlus,
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiAward,
  FiCheckCircle,
  FiShield
} from 'react-icons/fi'
import bannerImg from '../../assets/banner_illustration.jpg'

const DashboardLayout = ({
  userRole = 'teacher',
  userName = 'Faculty Member',
  userEmail = 'faculty@college.edu',
  activeTab = 'drive',
  onTabChange,
  searchQuery = '',
  onSearchChange,
  actionButtonText = 'UPLOAD NEW FILE',
  onActionClick,
  stats = [],
  bannerTitle = 'Unlock More Power!',
  bannerText = 'Upgrade to CertifyHub Pro for instant verification & bulk exports.',
  bannerButtonText = 'UPGRADE NOW',
  onBannerClick,
  departments = ['Computer Science', 'Information Science', 'Electronics & Comm.', 'Mechanical Eng.'],
  selectedDepartment = '',
  onDepartmentSelect,
  children
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileStatsOpen, setMobileStatsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('jwt_token_teacher')
    localStorage.removeItem('jwt_token_student')
    sessionStorage.clear()
    navigate('/')
  }

  // Circular Progress Helper
  const CircularProgress = ({ percentage = 75, stroke = '#5d5fef' }) => {
    const radius = 22
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke="#e7eaf3"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke={stroke}
            strokeWidth="4.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-xs font-bold text-neutral-800">
          {percentage}%
        </span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f4fa] text-neutral-800 p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center font-sans antialiased">
      {/* Outer Dashboard Canvas Frame */}
      <div className="w-full max-w-[1600px] min-h-[92vh] bg-white rounded-3xl shadow-2xl border border-neutral-200/60 overflow-hidden flex flex-col">
        
        {/* Mobile Header Bar (< lg) */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-neutral-100 bg-white">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-neutral-600 hover:text-brand-600 rounded-xl hover:bg-neutral-100 transition-colors"
              aria-label="Open sidebar"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tight text-neutral-900">certify</span>
              <span className="text-2xl font-black text-brand-600">.</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileStatsOpen(!mobileStatsOpen)}
              className="p-2 text-neutral-600 hover:text-brand-600 rounded-xl hover:bg-neutral-100 transition-colors"
              aria-label="Toggle statistics"
            >
              <FiAward className="w-5 h-5 text-brand-600" />
            </button>
            {actionButtonText && onActionClick && (
              <button
                onClick={onActionClick}
                className="btn-pill text-xs py-2 px-4 shadow-sm"
              >
                <FiPlus className="mr-1 inline" /> {actionButtonText.replace('UPLOAD NEW ', '').replace('NEW ', '')}
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Layout Frame */}
        <div className="flex-1 flex flex-row overflow-hidden relative">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <aside
            className={`
              fixed lg:static inset-y-0 left-0 z-40
              w-64 bg-white border-r border-neutral-100 flex flex-col justify-between
              transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            <div className="p-6 flex flex-col h-full">
              {/* Brand Logo & Close button */}
              <div className="flex items-center justify-between mb-8">
                <div
                  onClick={() => navigate(userRole === 'teacher' ? '/teacher/home' : '/student/home')}
                  className="flex items-center cursor-pointer group"
                >
                  <span className="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-brand-600 transition-colors">
                    certify
                  </span>
                  <span className="text-2xl font-black text-brand-600">.</span>
                </div>
                {mobileMenuOpen && (
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="lg:hidden p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Main Navigation Items */}
              <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                <div>
                  <button
                    onClick={() => {
                      if (onTabChange) onTabChange('drive')
                      if (mobileMenuOpen) setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                      activeTab === 'drive'
                        ? 'bg-brand-50 text-brand-600 font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <FiCompass className={`w-4 h-4 ${activeTab === 'drive' ? 'text-brand-600' : 'text-neutral-400'}`} />
                    <span>My repository</span>
                  </button>
                </div>

                {/* Section: FILES */}
                <div>
                  <p className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-2 px-3">
                    Repository
                  </p>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        if (onTabChange) onTabChange('files')
                        if (mobileMenuOpen) setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        activeTab === 'files'
                          ? 'bg-brand-50 text-brand-600 font-semibold'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      <FiFolder className={`w-4 h-4 ${activeTab === 'files' ? 'text-brand-600' : 'text-neutral-400'}`} />
                      <span>{userRole === 'teacher' ? 'Student folders' : 'My certificates'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onTabChange) onTabChange('sharing')
                        if (mobileMenuOpen) setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        activeTab === 'sharing'
                          ? 'bg-brand-50 text-brand-600 font-semibold'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      <FiShare2 className={`w-4 h-4 ${activeTab === 'sharing' ? 'text-brand-600' : 'text-neutral-400'}`} />
                      <span>Shared & Verified</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onTabChange) onTabChange('requests')
                        if (mobileMenuOpen) setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        activeTab === 'requests'
                          ? 'bg-brand-50 text-brand-600 font-semibold'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                      }`}
                    >
                      <FiInbox className={`w-4 h-4 ${activeTab === 'requests' ? 'text-brand-600' : 'text-neutral-400'}`} />
                      <span>Submissions</span>
                    </button>
                  </div>
                </div>

                {/* Section: DEPARTMENTS / PLACES */}
                {departments && departments.length > 0 && (
                  <div>
                    <p className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase mb-2 px-3">
                      Departments
                    </p>
                    <div className="space-y-1">
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => {
                            if (onDepartmentSelect) onDepartmentSelect(dept === selectedDepartment ? '' : dept)
                            if (mobileMenuOpen) setMobileMenuOpen(false)
                          }}
                          className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-sm transition-all ${
                            selectedDepartment === dept
                              ? 'bg-neutral-100 text-brand-600 font-semibold'
                              : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                          }`}
                        >
                          <FiFolder className={`w-3.5 h-3.5 ${selectedDepartment === dept ? 'text-brand-600' : 'text-neutral-400'}`} />
                          <span className="truncate">{dept}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom User Profile Card */}
              <div className="pt-4 border-t border-neutral-100 mt-4">
                <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-neutral-50 transition-colors">
                  <div
                    onClick={() => navigate(userRole === 'teacher' ? '/teacher-profile' : '/student-profile')}
                    className="flex items-center space-x-3 cursor-pointer min-w-0"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm border-2 border-brand-200">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-800 truncate leading-tight">
                        {userName}
                      </p>
                      <p className="text-[11px] font-medium text-brand-600 uppercase tracking-wide">
                        {userRole === 'teacher' ? 'Faculty Admin' : 'Student'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FiLogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Backdrop for Mobile Sidebar */}
          {mobileMenuOpen && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-30 bg-neutral-900/30 backdrop-blur-xs transition-opacity"
            />
          )}

          {/* ================= CENTER MAIN CONTENT ================= */}
          <main className="flex-1 flex flex-col overflow-y-auto bg-neutral-50/50 p-4 sm:p-6 lg:p-8">
            
            {/* Top Toolbar (Back/Forward, Search, Action Button) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              {/* Back / Forward and Breadcrumb */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate(-1)}
                  className="w-8 h-8 rounded-full bg-white shadow-xs border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:border-neutral-300 transition-colors"
                  title="Go Back"
                >
                  <FiArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate(1)}
                  className="w-8 h-8 rounded-full bg-white shadow-xs border border-neutral-200/80 flex items-center justify-center text-neutral-500 hover:text-neutral-800 hover:border-neutral-300 transition-colors"
                  title="Go Forward"
                >
                  <FiArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider pl-1">
                  Certify Hub / {userRole === 'teacher' ? 'Teacher Portal' : 'Student Portal'}
                </span>
              </div>

              {/* Action Button (Pill shaped, reference signature) */}
              {actionButtonText && onActionClick && (
                <div className="flex items-center">
                  <button
                    onClick={onActionClick}
                    className="btn-pill shadow-brand transition-transform hover:scale-102 flex items-center text-sm font-semibold tracking-wide"
                  >
                    <FiPlus className="w-4 h-4 mr-2" />
                    <span>{actionButtonText}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Injected Page Content */}
            <div className="flex-1">
              {children}
            </div>
          </main>

          {/* ================= RIGHT STATS PANEL ================= */}
          <aside
            className={`
              w-80 bg-white border-l border-neutral-100 p-6 flex flex-col justify-between overflow-y-auto
              ${mobileStatsOpen ? 'fixed inset-y-0 right-0 z-40 shadow-2xl block' : 'hidden xl:flex'}
            `}
          >
            {mobileStatsOpen && (
              <div className="flex justify-end mb-2 xl:hidden">
                <button
                  onClick={() => setMobileStatsOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Top Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                  placeholder="Search your content"
                  className="w-full pl-4 pr-10 py-2.5 bg-neutral-100/80 border-0 rounded-2xl text-xs text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all outline-none"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-600">
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-neutral-900 mb-4">
                Statistic
              </h3>

              {/* Stats Cards */}
              <div className="space-y-3">
                {stats.length > 0 ? (
                  stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-neutral-50/80 border border-neutral-100 rounded-2xl p-4 flex items-center justify-between hover:bg-white hover:shadow-card transition-all"
                    >
                      <div>
                        <p className="text-xs font-medium text-neutral-500 leading-tight mb-1">
                          {stat.label}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-medium">
                          {stat.subtext || 'repository stats'}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <span className="text-lg font-black text-neutral-900">
                            {stat.value}
                          </span>
                        </div>
                        <CircularProgress
                          percentage={stat.percentage || 75}
                          stroke={stat.color || '#5d5fef'}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-neutral-50/80 border border-neutral-100 rounded-2xl p-4 flex items-center justify-between hover:bg-white hover:shadow-card transition-all">
                      <div>
                        <p className="text-xs font-medium text-neutral-500 leading-tight mb-1">
                          Certificates this week
                        </p>
                        <p className="text-[11px] text-neutral-400 font-medium">per day</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black text-neutral-900">69</span>
                        <CircularProgress percentage={69} stroke="#5d5fef" />
                      </div>
                    </div>

                    <div className="bg-neutral-50/80 border border-neutral-100 rounded-2xl p-4 flex items-center justify-between hover:bg-white hover:shadow-card transition-all">
                      <div>
                        <p className="text-xs font-medium text-neutral-500 leading-tight mb-1">
                          Available storage
                        </p>
                        <p className="text-[11px] text-neutral-400 font-medium">gb left</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black text-neutral-900">12</span>
                        <CircularProgress percentage={82} stroke="#3b82f6" />
                      </div>
                    </div>

                    <div className="bg-neutral-50/80 border border-neutral-100 rounded-2xl p-4 flex items-center justify-between hover:bg-white hover:shadow-card transition-all">
                      <div>
                        <p className="text-xs font-medium text-neutral-500 leading-tight mb-1">
                          Verified records
                        </p>
                        <p className="text-[11px] text-neutral-400 font-medium">today</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-black text-neutral-900">49</span>
                        <CircularProgress percentage={94} stroke="#10b981" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Promo / Feature Card */}
            <div className="mt-auto bg-gradient-to-b from-brand-50/60 to-brand-100/40 border border-brand-100/80 rounded-3xl p-4 flex flex-col items-center text-center">
              <div className="w-full h-28 overflow-hidden rounded-2xl mb-3 bg-white/60">
                <img
                  src={bannerImg}
                  alt="CertifyHub Collaboration"
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-sm font-bold text-neutral-900 mb-1">
                {bannerTitle}
              </h4>
              <p className="text-[11px] text-neutral-500 leading-relaxed mb-4 px-2">
                {bannerText}
              </p>

              <button
                onClick={onBannerClick}
                className="btn-pill w-full py-2.5 text-xs font-semibold uppercase tracking-wider bg-brand-600 hover:bg-brand-700 shadow-md"
              >
                {bannerButtonText}
              </button>
            </div>
          </aside>

          {/* Backdrop for Mobile Stats */}
          {mobileStatsOpen && (
            <div
              onClick={() => setMobileStatsOpen(false)}
              className="xl:hidden fixed inset-0 z-30 bg-neutral-900/30 backdrop-blur-xs transition-opacity"
            />
          )}

        </div>
      </div>
    </div>
  )
}

export default DashboardLayout

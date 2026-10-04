import React from 'react'
import { motion } from 'framer-motion'
import {
  FiFileText,
  FiAward,
  FiDownload,
  FiEye,
  FiMoreHorizontal,
  FiShare2,
  FiCheckCircle
} from 'react-icons/fi'

const FileListRow = ({
  title = 'Certificate Title',
  category = 'Course',
  date = '2026-10-04',
  extension = 'pdf',
  onView,
  onDownload,
  onShare,
  isHighlighted = false
}) => {
  // Format readable date
  const formattedDate = React.useMemo(() => {
    try {
      const d = new Date(date)
      if (isNaN(d.getTime())) return date
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.')
    } catch {
      return date
    }
  }, [date])

  // Get extension color
  const getBadgeColor = (ext) => {
    const e = ext.toLowerCase().replace('.', '')
    switch (e) {
      case 'pdf':
        return 'text-red-600 bg-red-50 border-red-100'
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'text-blue-600 bg-blue-50 border-blue-100'
      case 'psd':
      case 'photoshop':
        return 'text-indigo-600 bg-indigo-50 border-indigo-100'
      case 'sketch':
        return 'text-amber-600 bg-amber-50 border-amber-100'
      default:
        return 'text-brand-600 bg-brand-50 border-brand-100'
    }
  }

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={`
        group flex items-center justify-between py-3.5 px-4 rounded-2xl transition-all duration-200 cursor-pointer
        ${
          isHighlighted
            ? 'bg-white shadow-card border border-neutral-100'
            : 'hover:bg-white hover:shadow-card hover:border-neutral-100/80 border border-transparent'
        }
      `}
    >
      {/* Left: Icon + Title */}
      <div className="flex items-center space-x-4 min-w-0 flex-1">
        <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 border border-brand-100 group-hover:scale-105 transition-transform">
          <FiAward className="w-5 h-5 text-brand-600" />
        </div>
        <div className="min-w-0 flex-1 pr-4">
          <h4 className="text-sm font-semibold text-neutral-800 truncate leading-tight group-hover:text-brand-600 transition-colors">
            {title}
          </h4>
          <span className="text-xs text-neutral-400 capitalize inline-block mt-0.5">
            {category}
          </span>
        </div>
      </div>

      {/* Center 1: Category Tag */}
      <div className="hidden md:block w-36 px-2 text-left">
        <span className="text-xs text-neutral-500 font-medium capitalize">
          {category}
        </span>
      </div>

      {/* Center 2: Date */}
      <div className="hidden sm:block w-28 text-left">
        <span className="text-xs text-neutral-400 font-medium">
          {formattedDate}
        </span>
      </div>

      {/* Center 3: File Extension */}
      <div className="w-20 text-center">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-lg text-[11px] font-bold border uppercase ${getBadgeColor(
            extension
          )}`}
        >
          .{extension.replace('.', '')}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-1 pl-4 shrink-0 text-neutral-400">
        {onView && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onView()
            }}
            className="p-1.5 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            title="Preview"
          >
            <FiEye className="w-4 h-4" />
          </button>
        )}
        {onDownload && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDownload()
            }}
            className="p-1.5 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            title="Download"
          >
            <FiDownload className="w-4 h-4" />
          </button>
        )}
        {onShare && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onShare()
            }}
            className="p-1.5 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            title="Share"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default FileListRow

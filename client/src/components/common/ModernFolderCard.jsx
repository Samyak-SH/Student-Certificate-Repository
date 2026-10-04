import React from 'react'
import { motion } from 'framer-motion'
import { FiFolder, FiMoreVertical } from 'react-icons/fi'

const ModernFolderCard = ({
  title = 'Designs',
  type = 'FOLDER',
  isActive = false,
  avatars = [],
  fileCount,
  onClick,
  onMoreClick,
  tag
}) => {
  // Default mock avatars if none provided
  const displayAvatars = avatars.length > 0 ? avatars : [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=faces',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces',
  ]

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative rounded-3xl p-6 cursor-pointer transition-all duration-300 min-w-[200px] flex-1
        ${
          isActive
            ? 'bg-brand-600 text-white shadow-brand'
            : 'bg-white text-neutral-800 border border-neutral-100/90 shadow-card hover:shadow-hover'
        }
      `}
    >
      {/* Top row: SHARED WITH & avatar stack */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <span
            className={`text-[10px] font-bold tracking-wider uppercase block mb-2 ${
              isActive ? 'text-brand-200' : 'text-neutral-400'
            }`}
          >
            SHARED WITH
          </span>
          <div className="flex items-center -space-x-2">
            {displayAvatars.slice(0, 3).map((av, idx) => (
              <img
                key={idx}
                src={av}
                alt="user"
                className={`w-7 h-7 rounded-full object-cover border-2 ${
                  isActive ? 'border-brand-600' : 'border-white'
                }`}
              />
            ))}
            {displayAvatars.length > 3 && (
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                  isActive
                    ? 'bg-brand-700 text-white border-brand-600'
                    : 'bg-neutral-100 text-neutral-600 border-white'
                }`}
              >
                +{displayAvatars.length - 3}
              </div>
            )}
          </div>
        </div>

        {onMoreClick && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMoreClick()
            }}
            className={`p-1.5 rounded-full transition-colors ${
              isActive ? 'hover:bg-brand-700/60 text-white/80' : 'hover:bg-neutral-100 text-neutral-400'
            }`}
          >
            <FiMoreVertical className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bottom row: Type label and Title */}
      <div>
        <span
          className={`text-[10px] font-bold tracking-wider uppercase block mb-0.5 ${
            isActive ? 'text-brand-200' : 'text-neutral-400'
          }`}
        >
          {type}
        </span>
        <div className="flex items-baseline justify-between gap-2">
          <h3
            className={`text-sm sm:text-base font-bold truncate leading-tight ${
              isActive ? 'text-white' : 'text-neutral-900'
            }`}
            title={title}
          >
            {title}
          </h3>
          {fileCount !== undefined && (
            <span
              className={`text-xs font-medium shrink-0 ${
                isActive ? 'text-brand-200' : 'text-neutral-400'
              }`}
            >
              {fileCount} {fileCount === 1 ? 'file' : 'files'}
            </span>
          )}
        </div>
        {tag && (
          <span
            className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-md ${
              isActive
                ? 'bg-brand-500/60 text-white'
                : 'bg-neutral-100 text-neutral-600'
            }`}
          >
            {tag}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default ModernFolderCard

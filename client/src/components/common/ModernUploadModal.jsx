import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiUploadCloud,
  FiFileText,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi'
import toast from 'react-hot-toast'

const ModernUploadModal = ({
  isOpen = false,
  onClose,
  onSubmit,
  initialCategory = 'course'
}) => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState(initialCategory)
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  const tags = [
    'course',
    'workshop',
    'internship',
    'hackathon',
    'skill',
    'NSS',
    'sports'
  ]

  if (!isOpen) return null

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (
        droppedFile.type === 'application/pdf' ||
        droppedFile.type.startsWith('image/')
      ) {
        setFile(droppedFile)
        if (!title) {
          // auto fill title from filename without extension
          const cleanName = droppedFile.name.replace(/\.[^/.]+$/, '')
          setTitle(cleanName)
        }
      } else {
        toast.error('Please upload a PDF or Image certificate.')
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0]
      setFile(selected)
      if (!title) {
        const cleanName = selected.name.replace(/\.[^/.]+$/, '')
        setTitle(cleanName)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      toast.error('Please enter a certificate title.')
      return
    }
    if (!file) {
      toast.error('Please select or drop a certificate file.')
      return
    }

    try {
      setIsSubmitting(true)
      await onSubmit({ title, tag, file })
      toast.success('Certificate uploaded successfully!')
      onClose()
    } catch (err) {
      console.error(err)
      toast.error('Failed to upload certificate. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-neutral-100"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-neutral-900">
              Upload Certificate
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Add a new credential or achievement to the repository
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Certificate Title */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Certificate Title
            </label>
            <input
              type="text"
              placeholder="e.g. AWS Certified Cloud Practitioner"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="input-field"
            />
          </div>

          {/* Category Tag Selector */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    tag === t
                      ? 'bg-brand-600 text-white shadow-brand scale-102'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Accessible Drag & Drop File Zone */}
          <div>
            <span className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
              Certificate File (PDF or Image)
            </span>
            <label
              htmlFor="cert-file-input"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                block border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all
                ${
                  isDragging
                    ? 'border-brand-500 bg-brand-50/70 scale-101'
                    : file
                    ? 'border-emerald-400 bg-emerald-50/40'
                    : 'border-neutral-200 hover:border-brand-400 hover:bg-neutral-50/60'
                }
              `}
            >
              <input
                id="cert-file-input"
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                className="sr-only"
              />

              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-left min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <FiCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs font-bold text-neutral-800 truncate">
                        {file.name}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready to upload
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setFile(null)
                      if (fileInputRef.current) fileInputRef.current.value = ''
                    }}
                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs"
                    title="Remove file"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <FiUploadCloud className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-neutral-800">
                    Click to browse or drag and drop file here
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Supports PDF, PNG, JPG up to 10MB
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn-secondary text-xs px-5 py-2.5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-pill text-xs px-6 py-2.5 flex items-center justify-center min-w-[120px]"
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              {isSubmitting ? 'Uploading...' : 'Upload Now'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ModernUploadModal

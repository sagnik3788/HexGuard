"use client"

import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, Upload, AlertCircle, CheckCircle, XCircle } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CoolUploadPage() {
  const [file, setFile] = useState<File | null>(null) // Ensure file state can be File or null
  const [uploadProgress, setUploadProgress] = useState(0)
  // const [uploadStatus, setUploadStatus] = useState(null)
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'success' | 'error' | null>(null)
  const [showParticles, setShowParticles] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0] || null 
    setFile(uploadedFile) 
    if (uploadedFile) {
      simulateUpload(uploadedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.bin', '.exe', '.dll'],
      'application/x-msdownload': ['.exe', '.dll']
    },
    maxSize: 50 * 1024 * 1024, // 50MB max size
  })
  
  const simulateUpload = (file: unknown) => {
    setUploadStatus('uploading')
    setUploadProgress(0)
    const totalSize = (file as File).size
    let uploadedSize = 0
    const chunkSize = totalSize / 100 // Simulate 100 chunks

    const upload = setInterval(() => {
      if (uploadedSize < totalSize) {
        uploadedSize += chunkSize
        const progress = Math.round((uploadedSize / totalSize) * 100)
        setUploadProgress(progress)
      } else {
        clearInterval(upload)
        setUploadProgress(100)
        setTimeout(() => {
          setUploadStatus('success')
          setShowParticles(true)
        }, 500)
      }
    }, 50)
  }

  useEffect(() => {
    if (showParticles) {
      const timer = setTimeout(() => setShowParticles(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showParticles])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <header className="container mx-auto flex items-center justify-between mb-12">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold">HexGuard</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            History
          </Button>
          <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Settings
          </Button>
        </nav>
      </header>

      <main className="container mx-auto relative">
        <motion.h1 
          className="text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Upload Binary File for Analysis
        </motion.h1>
        
        <motion.div 
          className="max-w-2xl mx-auto bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-blur-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
              isDragActive ? 'border-cyan-400 bg-cyan-400 bg-opacity-10' : 'border-gray-600 hover:border-cyan-400'
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ rotate: isDragActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            </motion.div>
            <AnimatePresence mode="wait">
              {isDragActive ? (
                <motion.p
                  key="drag-active"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg"
                >
                  Drop the file here...
                </motion.p>
              ) : (
                <motion.p
                  key="drag-inactive"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg"
                >
                  Drag & drop a file here, or click to select a file
                </motion.p>
              )}
            </AnimatePresence>
            <p className="text-sm text-gray-400 mt-2">Supported file types: .bin, .exe, .dll (Max 50MB)</p>
          </div>

          {file && (
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <h2 className="text-xl font-semibold mb-4">File: {file.name}</h2> */}
              <h2 className="text-xl font-semibold mb-4">
             File: {file ? (file as File).name : 'No file selected'}
               </h2>

              <Progress value={uploadProgress} className="h-2 mb-2 bg-cyan-600" />
              <p className="text-sm text-gray-400">{uploadProgress}% Uploaded</p>

              {uploadStatus === 'uploading' && (
                <div className="flex items-center justify-center mt-4">
                  <motion.div
                    className="rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="ml-2">Scanning for malware...</span>
                </div>
              )}

              {uploadStatus === 'success' && (
                <motion.div 
                  className="flex items-center justify-center mt-4 text-green-500"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <CheckCircle className="h-6 w-6 mr-2" />
                  <span>Upload successful! Analysis in progress.</span>
                </motion.div>
              )}

              {uploadStatus === 'error' && (
                <motion.div 
                  className="flex items-center justify-center mt-4 text-red-500"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <XCircle className="h-6 w-6 mr-2" />
                  <span>Upload failed. Please try again.</span>
                </motion.div>
              )}
            </motion.div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="h-5 w-5 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Only upload files you have permission to analyze.</p>
                  <p>HexGuard ensures your data privacy and security.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              onClick={() => {
                const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                if (fileInput) {
                  fileInput.click();
                }
              }}
              className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 transform hover:scale-105"
            >
              Select File
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showParticles && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(10)].map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute bg-cyan-400 rounded-full opacity-50"
                  style={{
                    width: `${Math.random() * 20}px`,
                    height: `${Math.random() * 20}px`,
                    top: `${Math.random() * 100}vh`,
                    left: `${Math.random() * 100}vw`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    y: ["0%", "-50%", "0%"],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

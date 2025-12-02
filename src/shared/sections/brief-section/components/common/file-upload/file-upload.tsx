import React, { useRef } from 'react'
import styles from './file-upload.module.scss'

interface FileUploadProps {
  uploadedFiles: File[]
  onFilesUpload: (files: File[]) => void
}

export const FileUpload: React.FC<FileUploadProps> = ({
  uploadedFiles,
  onFilesUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    onFilesUpload([...uploadedFiles, ...files])
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    onFilesUpload([...uploadedFiles, ...files])
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    onFilesUpload(newFiles)
  }

  return (
    <div className={styles.fileUpload}>

      <h4 className={styles.sectionTitle}>Project files:</h4>
      <div className={styles.fileUploadWrapper}>

      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className={styles.dropZoneContent}>
          <div className={styles.uploadIcon}>📎</div>
          <p className={styles.dropZoneText}>
            Drag & drop files here or click to browse
          </p>
          <p className={styles.dropZoneSubtext}>
            Supported formats: PDF, DOC, DOCX, images
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className={styles.fileInput}
          accept=".pdf,.doc,.docx,image/*"
        />
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className={styles.fileList}>
          <h4 className={styles.fileListTitle}>Uploaded Files</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className={styles.fileItem}>
              <span className={styles.fileName}>{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      </div>

    </div>
  )
}
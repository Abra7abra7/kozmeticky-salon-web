'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { FiUpload, FiX, FiCheck } from 'react-icons/fi';

type ImageUploaderProps = {
  onImageUploadAction: (imageUrl: string) => void;
  currentImageUrl?: string;
  label?: string;
  className?: string;
};

export default function ImageUploader({
  onImageUploadAction,
  currentImageUrl,
  label = 'Nahrať obrázok',
  className = '',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Prosím, nahrajte iba obrázky.');
      return;
    }
    
    // Create local preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Start upload process
    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nastala chyba pri nahrávaní obrázka.');
      }
      
      const data = await response.json();
      onImageUploadAction(data.imageUrl);
      setUploadSuccess(true);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setUploadError(error.message || 'Nastala chyba pri nahrávaní obrázka.');
    } finally {
      setIsUploading(false);
    }
  }, [onImageUploadAction]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.bmp', '.tiff']
    },
    maxFiles: 1,
  });
  
  const removeImage = () => {
    setPreviewUrl(null);
    onImageUploadAction('');
    setUploadSuccess(false);
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      
      <div className="space-y-2">
        {previewUrl ? (
          <div className="relative rounded-lg overflow-hidden border border-gray-200">
            <div className="relative aspect-video w-full">
              <Image 
                src={previewUrl} 
                alt="Náhľad obrázka" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                type="button"
                onClick={removeImage}
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Odstrániť obrázok"
              >
                <FiX size={16} />
              </button>
              {uploadSuccess && (
                <div className="p-1 bg-green-500 text-white rounded-full">
                  <FiCheck size={16} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
              ${isUploading ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <FiUpload className="h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive
                  ? 'Pustite obrázok sem...'
                  : 'Kliknite alebo pretiahnite obrázok sem'}
              </p>
              <p className="text-xs text-gray-500">
                Podporované formáty: JPG, PNG, GIF, WebP (max 5MB)
              </p>
            </div>
          </div>
        )}
        
        {isUploading && (
          <div className="text-sm text-gray-500 flex items-center">
            <div className="mr-2 h-4 w-4 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
            Nahrávanie...
          </div>
        )}
        
        {uploadError && (
          <p className="text-sm text-red-500">{uploadError}</p>
        )}
        
        {uploadSuccess && (
          <p className="text-sm text-green-500">Obrázok bol úspešne nahraný</p>
        )}
      </div>
    </div>
  );
}

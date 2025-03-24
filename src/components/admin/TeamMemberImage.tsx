'use client';

import { useState } from 'react';

interface TeamMemberImageProps {
  name: string;
  imageSrc: string;
}

export default function TeamMemberImage({ name, imageSrc }: TeamMemberImageProps) {
  const [imgSrc, setImgSrc] = useState(imageSrc);
  const initials = name.split(' ').map(n => n[0]).join('');
  
  const handleError = () => {
    setImgSrc(`https://via.placeholder.com/150?text=${initials}`);
  };

  return (
    <img 
      src={imgSrc} 
      alt={name} 
      className="h-32 w-32 rounded-full object-cover border-4 border-white"
      onError={handleError}
    />
  );
}

'use client';

import Image from 'next/image';

export default function Loader({ fullScreen = true, message = '...' }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative inline-block">
            {/* Outer spinning ring */}
            <div className="w-28 h-28 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600"></div>
            {/* Favicon in center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center">
              <Image 
                src="/favicon.png" 
                alt="Loading" 
                width={80} 
                height={80} 
                className="animate-pulse"
                priority
              />
            </div>
          </div>
          {message && (
            <p className="mt-6 text-sm font-medium text-gray-600 animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="relative inline-block">
          {/* Outer spinning ring */}
          <div className="w-24 h-24 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600"></div>
          {/* Favicon in center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center">
            <Image 
              src="/favicon.png" 
              alt="Loading" 
              width={64} 
              height={64} 
              className="animate-pulse"
              priority
            />
          </div>
        </div>
        {message && (
          <p className="mt-4 text-sm font-medium text-gray-600 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}


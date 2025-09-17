'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/libs/utils';

interface BackgroundImageProps {
    imageSrc: string | StaticImageData;
    imageAlt?: string;
    className?: string;
    objectPosition?: string;
}

export function BackgroundImage({
    imageSrc,
    imageAlt = 'Background Image',
    className = '',
    objectPosition = 'object-left',
}: BackgroundImageProps) {
    return (
        <div
            className={cn(
                'relative w-full h-full md:h-screen',
                className,
            )}
        >
            <Image
                src={imageSrc}
                alt={imageAlt}
                className={cn('object-cover', objectPosition)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
    );
}

// Add displayName for easier component detection
BackgroundImage.displayName = 'BackgroundImage';

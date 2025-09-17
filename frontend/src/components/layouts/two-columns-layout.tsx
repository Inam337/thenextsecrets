'use client';

import React from 'react';
import { cn } from '@/libs/utils';
import { AppConstants } from '@/common/app-constants';

/**
 * TwoColumnsLayout - Simple two-column layout for login and register pages
 * 
 * Features:
 * - Flexible image positioning (left, right, or none)
 * - Responsive design (image hidden on mobile)
 * - Automatic content centering when no image
 */
interface TwoColumnsLayoutProps {
    children?: React.ReactNode;
    imagePosition?: typeof AppConstants.TwoColumnsLayout.ImagePosition.LEFT |
    typeof AppConstants.TwoColumnsLayout.ImagePosition.RIGHT |
    typeof AppConstants.TwoColumnsLayout.ImagePosition.NONE;
    backgroundImageComponent?: React.ReactNode;
    formComponent?: React.ReactNode;
    className?: string;
}

export default function TwoColumnsLayout({
    children,
    imagePosition = AppConstants.TwoColumnsLayout.ImagePosition.LEFT,
    backgroundImageComponent,
    formComponent,
    className = '',
}: TwoColumnsLayoutProps) {

    const showImage = imagePosition !== AppConstants.TwoColumnsLayout.ImagePosition.NONE;
    const isLeftPosition = imagePosition === AppConstants.TwoColumnsLayout.ImagePosition.LEFT;
    const isRightPosition = imagePosition === AppConstants.TwoColumnsLayout.ImagePosition.RIGHT;

    // Use props if provided, otherwise fall back to children
    const backgroundImage = backgroundImageComponent || React.Children.toArray(children)[0];
    const formContent = formComponent || React.Children.toArray(children)[1];

    return (
        <div className={cn('min-h-screen flex flex-col md:flex-row', className)}>
            {/* Left Column */}
            <div
                className={cn(
                    'w-full md:w-1/2',
                    showImage ? 'hidden md:block' : 'flex flex-col items-center justify-center bg-blue-100',
                    isLeftPosition && showImage ? 'md:order-1' : '',
                    isRightPosition && showImage ? 'md:order-1' : '',
                    !showImage ? 'md:w-full' : ''
                )}
            >
                {showImage ? (
                    // Show image in left column when imagePosition="left", form when imagePosition="right"
                    isLeftPosition ? backgroundImage : formContent
                ) : (
                    // Show form centered when no image
                    formContent
                )}
            </div>

            {/* Right Column */}
            <div
                className={cn(
                    'w-full md:w-1/2',
                    showImage ? 'hidden md:block' : 'hidden',
                    isLeftPosition && showImage ? 'md:order-2 flex flex-col items-center justify-center p-6' : '',
                    isRightPosition && showImage ? 'md:order-2' : ''
                )}
            >
                {showImage ? (
                    // Show form in right column when imagePosition="left", image when imagePosition="right"
                    isLeftPosition ? formContent : backgroundImage
                ) : null}
            </div>
        </div>
    );
}
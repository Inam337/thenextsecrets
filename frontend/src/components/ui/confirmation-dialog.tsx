import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/libs/utils';

export type ConfirmationDialogType = 'delete' | 'warning' | 'info' | 'success';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type?: ConfirmationDialogType;
  title: string;
  description: string;
  details?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonVariant?:
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
  isLoading?: boolean;
}

const dialogConfig = {
  delete: {
    icon: AlertTriangle,
    iconColor: 'tex-primary-600',
    titleColor: 'text-primary-600',
    confirmButtonVariant: 'destructive' as const,
    defaultConfirmText: 'Delete',
    defaultCancelText: 'Cancel',
  },
  warning: {
    icon: AlertCircle,
    iconColor: 'text-primary-600',
    titleColor: 'text-primary-600',
    confirmButtonVariant: 'default' as const,
    defaultConfirmText: 'Continue',
    defaultCancelText: 'Cancel',
  },
  info: {
    icon: Info,
    iconColor: 'text-primary-600',
    titleColor: 'text-primary-600',
    confirmButtonVariant: 'default' as const,
    defaultConfirmText: 'OK',
    defaultCancelText: 'Cancel',
  },
  success: {
    icon: CheckCircle,
    iconColor: 'text-primary-600',
    titleColor: 'text-primary-600',
    confirmButtonVariant: 'default' as const,
    defaultConfirmText: 'OK',
    defaultCancelText: 'Cancel',
  },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  type = 'delete',
  title,
  description,
  details,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmButtonVariant,
  isLoading = false,
}: ConfirmationDialogProps) {
  const config = dialogConfig[type];
  const IconComponent = config.icon; // Check if current locale is RTL
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle
            className={cn(
              `flex items-center gap-2 ${config.titleColor}`,
            )}
          >
            <IconComponent className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
            {details && (
              <>
                <br />
                <span className="font-medium text-gray-900">{details}</span>
              </>
            )}
            {type === 'delete' && (
              <>
                <br />
                <span className="text-sm text-gray-600">
                  {'This action cannot be undone.'}
                </span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full sm:w-auto cursor-pointer"
            disabled={isLoading}
          >
            {cancelText || config.defaultCancelText}
          </Button>
          <Button
            variant={confirmButtonVariant || config.confirmButtonVariant}
            onClick={onConfirm}
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading
              ? 'Loading...'
              : confirmText || config.defaultConfirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

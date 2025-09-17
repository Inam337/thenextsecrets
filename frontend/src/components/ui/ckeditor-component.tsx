'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  RemoveFormat,
  Heading,
  Font,
  FontSize,
  FontFamily,
  FontColor,
  FontBackgroundColor,
  Alignment,
  Indent,
  IndentBlock,
  List,
  TodoList,
  Link,
  AutoLink,
  LinkImage,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageUpload,
  HorizontalLine,
  SpecialCharacters,
  SpecialCharactersEssentials,
  PageBreak,
  SelectAll,
  FindAndReplace,
  WordCount,
  TextTransformation,
  PasteFromOffice,
  GeneralHtmlSupport,
} from 'ckeditor5';

import { cn } from '@/libs/utils';

import 'ckeditor5/ckeditor5.css';

interface CKEditorComponentProps {
  value?: string;
  onChange?: (data: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  initialData?: string;
  licenseKey?: string;
}

export function CKEditorComponent({
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  initialData = '<p>Start typing...</p>',
  licenseKey = 'GPL',
}: CKEditorComponentProps) {
  const handleChange = (event: unknown, editor: { getData: () => string }) => {
    const data = editor.getData();

    onChange?.(data);
  };

  return (
    <div className={cn('ckeditor-container', className)}>
      <CKEditor
        editor={ClassicEditor}
        data={value || initialData}
        onChange={handleChange}
        disabled={disabled}
        config={{
          licenseKey,
          ui: {
            poweredBy: {
              side: null,
            },
          },
          plugins: [
            // Essentials
            Essentials,
            Paragraph,

            // Text Formatting
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Subscript,
            Superscript,
            RemoveFormat,

            // Headings
            Heading,

            // Font Features
            Font,
            FontSize,
            FontFamily,
            FontColor,
            FontBackgroundColor,

            // Alignment & Indentation
            Alignment,
            Indent,
            IndentBlock,

            // Lists
            List,
            TodoList,

            // Links
            Link,
            AutoLink,
            LinkImage,

            // Tables
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,

            // Images
            Image,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            ImageResize,
            ImageUpload,
            HorizontalLine,

            // Special Characters
            SpecialCharacters,
            SpecialCharactersEssentials,

            // Page Features
            PageBreak,

            // Utilities
            SelectAll,
            FindAndReplace,
            WordCount,
            TextTransformation,
            PasteFromOffice,
            GeneralHtmlSupport,
          ],
          toolbar: {
            items: [
              'undo', 'redo',
              '|',
              'heading',
              '|',
              'bold', 'italic', 'underline', 'strikethrough',
              '|',
              'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
              '|',
              'alignment',
              '|',
              'bulletedList', 'numberedList', 'todoList',
              '|',
              'outdent', 'indent',
              '|',
              'link', 'blockQuote', 'insertTable',
              '|',
              'imageUpload', 'mediaEmbed',
              '|',
              'horizontalLine', 'pageBreak',
              '|',
              'specialCharacters',
              '|',
              'findAndReplace', 'selectAll',
              '|',
              'subscript', 'superscript', 'code',
              '|',
              'removeFormat',
            ],
            shouldNotGroupWhenFull: true,
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
              { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
              { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
              { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
            ],
          },
          fontFamily: {
            options: [
              'default',
              'Arial, Helvetica, sans-serif',
              'Courier New, Courier, monospace',
              'Georgia, serif',
              'Lucida Sans Unicode, Lucida Grande, sans-serif',
              'Tahoma, Geneva, sans-serif',
              'Times New Roman, Times, serif',
              'Trebuchet MS, Helvetica, sans-serif',
              'Verdana, Geneva, sans-serif',
            ],
            supportAllValues: true,
          },
          fontSize: {
            options: [9, 11, 13, 'default', 17, 19, 21],
            supportAllValues: true,
          },
          fontColor: {
            colors: [
              { color: 'hsl(0, 0%, 0%)', label: 'Black' },
              { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
              { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
              { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
              { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
              { color: 'hsl(0, 75%, 60%)', label: 'Red' },
              { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
              { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
              { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
              { color: 'hsl(120, 75%, 60%)', label: 'Green' },
              { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
              { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
              { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
              { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
              { color: 'hsl(270, 75%, 60%)', label: 'Purple' },
            ],
          },
          fontBackgroundColor: {
            colors: [
              { color: 'hsl(0, 0%, 0%)', label: 'Black' },
              { color: 'hsl(0, 0%, 30%)', label: 'Dim grey' },
              { color: 'hsl(0, 0%, 60%)', label: 'Grey' },
              { color: 'hsl(0, 0%, 90%)', label: 'Light grey' },
              { color: 'hsl(0, 0%, 100%)', label: 'White', hasBorder: true },
              { color: 'hsl(0, 75%, 60%)', label: 'Red' },
              { color: 'hsl(30, 75%, 60%)', label: 'Orange' },
              { color: 'hsl(60, 75%, 60%)', label: 'Yellow' },
              { color: 'hsl(90, 75%, 60%)', label: 'Light green' },
              { color: 'hsl(120, 75%, 60%)', label: 'Green' },
              { color: 'hsl(150, 75%, 60%)', label: 'Aquamarine' },
              { color: 'hsl(180, 75%, 60%)', label: 'Turquoise' },
              { color: 'hsl(210, 75%, 60%)', label: 'Light blue' },
              { color: 'hsl(240, 75%, 60%)', label: 'Blue' },
              { color: 'hsl(270, 75%, 60%)', label: 'Purple' },
            ],
          },
          table: {
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells',
              'tableProperties',
              'tableCellProperties',
            ],
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'imageResize',
            ],
          },
          link: {
            decorators: {
              openInNewTab: {
                mode: 'manual',
                label: 'Open in a new tab',
                attributes: {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
              },
            },
          },
          placeholder,
        }}
      />
    </div>
  );
}

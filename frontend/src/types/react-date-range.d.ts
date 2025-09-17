declare module 'react-date-range' {
  import { Component } from 'react';

  export interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface DateRangeProps {
    ranges: Range[];
    onChange: (ranges: { selection: Range }) => void;
    showSelectionPreview?: boolean;
    moveRangeOnFirstSelection?: boolean;
    editableDateInputs?: boolean;
    showDateDisplay?: boolean;
    rangeColors?: string[];
    maxDate?: Date;
  }

  export class DateRange extends Component<DateRangeProps> {}
}

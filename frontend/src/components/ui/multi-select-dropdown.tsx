'use client';

import React from 'react';
import Select, {
  MultiValue,
  CSSObjectWithLabel,
  MultiValueProps,
  GroupBase,
  StylesConfig,
  components,
  ClearIndicatorProps,
} from 'react-select';

import { CommonIconNames, IconColors } from '@/components/icons/types';
import { CommonIcon } from '@/components/icons';

export interface SelectOption {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: SelectOption[];
  selectedValues: SelectOption[];
  onSelectionChange: (selected: SelectOption[]) => void;
  placeholder?: string;
  className?: string;
  width?: string;
}

export default function MultiSelectDropdown({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = 'Select options',
  className = '',
  width = 'w-64',
}: MultiSelectDropdownProps) {
  const customStyles: StylesConfig<SelectOption, true, GroupBase<SelectOption>> = {
    control: (provided: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
      ...provided,
      'minHeight': '36px',
      'height': '36px',
      'width': width === 'w-64' ? '300px' : width,
      'border': state.isFocused ? '1px solid #059669' : '1px solid #d1d5db',
      'borderRadius': '6px',
      'boxShadow': state.isFocused ? '0 0 0 1px #059669' : 'none',
      '&:hover': {
        border: '1px solid #059669',
      },
    }),
    valueContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height: 'auto',
      minHeight: '36px',
      padding: '0px 8px',
      flexWrap: 'wrap',
      gap: '4px',
    }),
    input: (provided: CSSObjectWithLabel) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    indicatorsContainer: (provided: CSSObjectWithLabel) => ({
      ...provided,
      height: '36px',
    }),
    clearIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      'cursor': 'pointer',
      'color': '#9ca3af',
      'padding': 6,
      ':hover': { color: '#111827' },
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      maxHeight: '300px', // 6 items * 32px each
      overflow: 'hidden',
    }),
    menuList: (provided: CSSObjectWithLabel) => ({
      ...provided,
      maxHeight: '300px',
      overflow: 'auto',
    }),
    option: (provided: CSSObjectWithLabel, state: { isSelected: boolean; isFocused: boolean }) => ({
      ...provided,
      'backgroundColor': state.isFocused ? '#f3f4f6' : 'transparent',
      'color': '#374151',
      'cursor': 'pointer',
      'padding': '10px 12px',
      'fontSize': '12px',
      '&:hover': {
        backgroundColor: '#f3f4f6',
      },
    }),
    multiValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor: '#059669',
      color: 'white',
    }),
    multiValueLabel: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: 'white',
      fontSize: '12px',
    }),
    multiValueRemove: (provided: CSSObjectWithLabel) => ({
      ...provided,
      'color': 'white',
      '&:hover': {
        backgroundColor: '#dc2626',
        color: 'white',
      },
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color: '#9ca3af',
      fontSize: '14px',
    }),
  };
  const ICON_CLOSE_SIZE = 8;
  const ICON_TICK_SIZE = 12;
  const CustomMultiValue = (props: MultiValueProps<SelectOption, true, GroupBase<SelectOption>>) => {
    const { data, index, getValue } = props;
    const selectedValues = getValue();

    // Show only first 2 items as tags, hide the rest
    if (index >= 2) {
      return null;
    }

    // If this is the second item and there are more than 2 total items, show "+X more"
    if (index === 1 && selectedValues.length > 2) {
      return (
        <div className="bg-primary text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
          <span>
            +
            {selectedValues.length - 2}
            {' '}
            more
          </span>
        </div>
      );
    }

    // Return the default multi-value component for first 2 items
    return (
      <div className="bg-primary text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1">
        <span>{data.label}</span>
        <div
          onClick={(e) => {
            e.stopPropagation();
            props.removeProps.onClick(e);
          }}
          className="ml-1 hover:bg-green-800 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
          style={{ cursor: 'pointer' }}
        >
          <CommonIcon
            width={ICON_CLOSE_SIZE}
            height={ICON_CLOSE_SIZE}
            name={CommonIconNames.CLOSE_ICON}
            fill={IconColors.WHITE_COLOR_ICON}
          />
        </div>
      </div>
    );
  };

  const formatOptionLabel = (option: SelectOption, { context }: { context: string }) => {
    if (context === 'value') {
      return option.label;
    }

    return (
      <div className="flex items-center justify-between w-full">
        <span>{option.label}</span>
        {selectedValues.some(selected => selected.value === option.value) && (
          <CommonIcon
            width={ICON_TICK_SIZE}
            height={ICON_TICK_SIZE}
            name={CommonIconNames.TICK_ICON}
            fill={IconColors.PRIMARY_COLOR_ICON}
          />
        )}
      </div>
    );
  };

  const handleChange = (selected: MultiValue<SelectOption>) => {
    // Ensure we always pass an array, even if selected is null or undefined
    const selectedArray = selected || [];

    onSelectionChange([...selectedArray]);
  };

  const CustomClearIndicator = (
    props: ClearIndicatorProps<SelectOption, true, GroupBase<SelectOption>>,
  ) => {
    return (
      <components.ClearIndicator
        {...props}
      >
        <div
          className="flex items-center justify-center cursor-pointer"
          style={{ cursor: 'pointer' }}
        >
          <CommonIcon
            width={12}
            height={12}
            name={CommonIconNames.CLOSE_ICON}
            fill={IconColors.GRAY_COLOR_ICON}
          />
        </div>
      </components.ClearIndicator>
    );
  };

  return (
    <div className={className}>
      <Select
        isMulti
        options={options}
        value={selectedValues}
        onChange={handleChange}
        placeholder={placeholder}
        styles={customStyles}
        formatOptionLabel={formatOptionLabel}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={true}
        isSearchable={true}
        menuPlacement="auto"
        classNamePrefix="react-select"
        components={{
          MultiValue: CustomMultiValue,
          ClearIndicator: CustomClearIndicator,
        }}
      />
    </div>
  );
}

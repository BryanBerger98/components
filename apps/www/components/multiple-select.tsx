'use client';

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@components/select';

const MultipleSelect = () => {
  const options = [
    { label: 'United States', value: 'USA' },
    { label: 'Canada', value: 'CA' },
    { label: 'Mexico', value: 'MX' },
    { label: 'France', value: 'FR' },
    { label: 'Germany', value: 'DE' },
    { label: 'United Kingdom', value: 'UK' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Multiple select</h2>
      <MultiSelect aria-label="Countries">
        <MultiSelectTrigger className="w-96">
          <MultiSelectValue placeholder="Select countries" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          {options.map((option) => (
            <MultiSelectItem value={option.value} key={option.value}>
              {option.label}
            </MultiSelectItem>
          ))}
        </MultiSelectContent>
      </MultiSelect>
    </div>
  );
};
export default MultipleSelect;

'use client';

import { useDebounceState } from '@components/hooks';
import { cn } from '@components/utils';
import { ChangeEvent, ReactElement, forwardRef, useEffect } from 'react';
import { Input, InputProps, InputValue } from './input';

type SearchProps = Omit<InputProps, 'type'> & {
  debounceDelay?: number;
  onSearch?: (value: InputValue) => void;
  icon?: ReactElement;
  iconPosition?: 'left' | 'right';
};

export const SearchInput = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const IconComponent = props.icon;

  const [value, setValue] = useDebounceState<InputValue>({
    initialValue: props.defaultValue,
    delay: props.debounceDelay,
  });

  useEffect(() => {
    if (props.onSearch) {
      props.onSearch(value);
    }
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        {...props}
        onChange={handleChange}
        className={cn(props.className, {
          'pl-10': IconComponent,
          'pr-10': IconComponent && props.iconPosition === 'right',
        })}
        ref={ref}
      />
      {IconComponent && (
        <div
          className={cn(
            'absolute inset-y-0 flex items-center text-muted-foreground',
            props.iconPosition === 'right' ? 'right-3' : 'left-3',
          )}
        >
          {IconComponent}
        </div>
      )}
    </div>
  );
});
SearchInput.displayName = 'SearchInput';

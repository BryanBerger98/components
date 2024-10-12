'use client';

import { Button, ButtonProps, InputValue } from '@components/forms';
import { cn } from '@components/utils';
import { PopoverProps } from '@radix-ui/react-popover';
import { CheckIcon, ChevronDown } from 'lucide-react';
import {
  ComponentPropsWithoutRef,
  Dispatch,
  ElementRef,
  HTMLProps,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type MultiSelectValue = Exclude<InputValue, readonly string[]>;

const MultiSelectContext = createContext<{
  values: MultiSelectValue[];
  setValues: Dispatch<SetStateAction<MultiSelectValue[]>>;
  options: { label: ReactNode; value: MultiSelectValue }[];
  setOptions: Dispatch<SetStateAction<{ label: ReactNode; value: MultiSelectValue }[]>>;
} | null>(null);

type MultiSelectProps = PopoverProps & {
  defaultValues?: MultiSelectValue[];
  onValuesChange?: (values: MultiSelectValue[]) => void;
};
export const MultiSelect = ({ defaultValues = [], onValuesChange, ...props }: MultiSelectProps) => {
  const [options, setOptions] = useState<{ label: ReactNode; value: MultiSelectValue }[]>([]);
  const [values, setValues] = useState<MultiSelectValue[]>(defaultValues);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(values);
    }
  }, [values]);

  return (
    <MultiSelectContext.Provider value={{ values, setValues, options, setOptions }}>
      <Popover aria-multiselectable {...props} />
    </MultiSelectContext.Provider>
  );
};

export const MultiSelectTrigger = forwardRef<
  ElementRef<typeof PopoverTrigger>,
  ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ children, className, ...props }, ref) => (
  <PopoverTrigger
    role="combobox"
    className={cn(
      'relative flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className,
    )}
    aria-haspopup="listbox"
    aria-expanded="false"
    {...props}
    ref={ref}
  >
    {children}
    <ChevronDown className="h-4 w-4 text-muted-foreground absolute top-1/2 transform -translate-y-1/2 right-2" />
  </PopoverTrigger>
));

export const MultiSelectContent = forwardRef<
  ElementRef<typeof PopoverContent>,
  ComponentPropsWithoutRef<typeof PopoverContent>
>(({ className, ...props }, ref) => (
  <PopoverContent
    className={cn('w-[--radix-popover-trigger-width] p-1 flex flex-col', className)}
    role="listbox"
    {...props}
    ref={ref}
  />
));

type MultiSelectItemProps = Omit<ButtonProps, 'value' | 'type' | 'role' | 'variant'> & {
  value?: MultiSelectValue;
};
export const MultiSelectItem = forwardRef<HTMLButtonElement, MultiSelectItemProps>(
  ({ value, className, onClick, children, ...props }, ref) => {
    const context = useContext(MultiSelectContext);

    if (!context) {
      throw new Error('MultiSelectItem should be used within a MultiSelect component');
    }

    const { values, setValues, setOptions } = context;

    useEffect(() => {
      setOptions((prevOptions) => {
        if (!prevOptions.some((option) => option.value === value)) {
          return [...prevOptions, { label: children, value }];
        }
        return prevOptions;
      });
    }, [value]);

    const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
      if (value) {
        setValues((prevValues) => {
          if (prevValues.includes(value)) {
            return prevValues.filter((v) => v !== value);
          } else {
            return [...prevValues, value];
          }
        });
      }
      if (onClick) {
        onClick(event);
      }
    };

    const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const nextOption: HTMLElement | null = event.currentTarget.nextElementSibling as HTMLElement;
        if (nextOption) {
          nextOption.focus();
        }
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prevOption: HTMLElement | null = event.currentTarget.previousElementSibling as HTMLElement;
        if (prevOption) {
          prevOption.focus();
        }
      }
    };

    return (
      <Button
        role="option"
        type="button"
        variant="ghost"
        className={cn(
          'justify-start relative py-1.5 pl-8 font-normal h-fit cursor-default rounded-sm focus-visible:ring-0 focus-visible:bg-accent',
          className,
        )}
        onClick={handleSelect}
        onKeyDown={handleOptionKeyDown}
        {...props}
        ref={ref}
      >
        {values.includes(value) && (
          <CheckIcon className="absolute top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 left-2" />
        )}
        {children}
      </Button>
    );
  },
);

type MultiSelectValueProps = HTMLProps<HTMLDivElement> & {
  placeholder?: string;
};
export const MultiSelectValue = forwardRef<HTMLDivElement, MultiSelectValueProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    const context = useContext(MultiSelectContext);

    if (!context) {
      throw new Error('MultiSelectValue should be used within a MultiSelect component');
    }

    const { options, values } = context;

    return (
      <div
        className={cn('text-left w-full text-nowrap overflow-hidden truncate text-ellipsis', className)}
        {...props}
        ref={ref}
      >
        {values?.length ? (
          options
            .filter((option) => values.includes(option.value))
            .map((option) => option.label)
            .join(', ')
        ) : placeholder ? (
          <span className="text-muted-foreground">{placeholder}</span>
        ) : null}
      </div>
    );
  },
);

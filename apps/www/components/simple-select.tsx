import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@components/select';

const SimpleSelect = () => (
  <div className="space-y-4">
    <h2 className="text-lg font-medium">Simple select</h2>
    <Select>
      <SelectTrigger className="max-w-96">
        <SelectValue placeholder="Choose a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
          <SelectItem value="USA">United States</SelectItem>
          <SelectItem value="CA">Canada</SelectItem>
          <SelectItem value="MX">Mexico</SelectItem>
          <SelectItem value="FR">France</SelectItem>
          <SelectItem value="DE">Germany</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);
export default SimpleSelect;

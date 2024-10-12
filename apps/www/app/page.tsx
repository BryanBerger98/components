import { SearchInput } from '@components/forms';
import { SearchIcon } from 'lucide-react';
import MultipleSelect from '../components/multiple-select';
import SimpleSelect from '../components/simple-select';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div className="container py-32 space-y-16">
      <h1 className="text-2xl font-bold underline">Hello world!</h1>
      <div className="space-y-16">
        <SimpleSelect />
        <MultipleSelect />
        <SearchInput icon={<SearchIcon className="w-4 h-4" />} />
      </div>
    </div>
  );
}

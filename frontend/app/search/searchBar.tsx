"use client"

import { InputGroup } from "@heroui/react";
import { SearchSm } from '@untitledui/icons'

interface SearchBarProps {
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  query: string,
  style?: string,
}

export default function SearchBar({ handleSearch, handleOnChange, query, style }: SearchBarProps) {
  return (
    <div className={`flex items-center justify-center ${style}`}>
      <InputGroup fullWidth variant='primary' className='text-grey-400 bg-transparent rounded-sm'>
        <InputGroup.Input placeholder="Search books..." value={query} onChange={handleOnChange} onKeyDown={handleSearch} />
        <InputGroup.Suffix>
          <SearchSm className='size-5' />
        </InputGroup.Suffix>
      </InputGroup>
    </div>
  );
}

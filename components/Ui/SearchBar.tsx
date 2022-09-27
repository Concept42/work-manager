import React, { Dispatch, SetStateAction } from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  setSearchQuery: Dispatch<SetStateAction<string>>
}

function SearchBar({ setSearchQuery }: Props): JSX.Element {
  return (
    <>
      <div className='flex relative ml-10 items-center justify-end  '>
        <SearchIcon className='absolute mr-2' />
        <input
          className='w-[300px] h-full input rounded-full'
          type='text'
          placeholder='Search'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </>
  )
}
export default SearchBar

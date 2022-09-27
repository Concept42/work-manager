import { useState, useEffect } from 'react'

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const search = (data: any[]) => {
    const searchParameters = Object.keys(Object.assign({}, ...data))
    if (searchQuery === '') {
      return data
    }
    if (searchQuery !== '')
      return data.filter((filtered) =>
        searchParameters.some((parameter) => filtered[parameter]?.toString().toLowerCase().includes(searchQuery)),
      )
  }

  useEffect(() => {
    setSearchQuery(searchQuery)
  }, [searchQuery])

  return { setSearchQuery, search }
}
export default useSearch

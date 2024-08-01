import Filter from '@/components/Filter'
import Search from '@/components/Search'
import Tavfsiya from '@/components/Tavfsiya'
import TopElon from '@/components/TopElon'
import React from 'react'

const SearchPage = () => {
  return (
    <>
      <div className="container pt-[50px] max-md:pt-[30px]">
        <div className="flex md:flex-col md:bg-[#ffffffd8] rounded-2xl p-5 max-md:p-0">
          <Search />
          <Filter />
        </div>
        <div className="flex flex-col">
          <h1 className="mt-7 mb-3 font-semibold text-logoKok text-[42px] max-md:text-2xl max-md:mt-[30px] max-md:mb-[6px]">
            Istaganingizni oson toping
          </h1>
          <p className="text-logoKok font-semibold max-md:text-sm">
            Ko’chmas mulklarning katta bozori
          </p>
        </div>
      </div>
      <TopElon />
      <Tavfsiya />
    </>
  )
}

export default SearchPage
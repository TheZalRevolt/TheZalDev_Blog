import { getOramaDB, search as searchOrama } from '@orama/plugin-astro/client';
import React, { useEffect, useState, CSSProperties } from 'react';

// <OramaSearch client:load />
export const OramaSearch = () => {
  const [result, setResult] = useState<any | undefined>(undefined);
  const [showDiv, setShowDiv] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const handleBackgroundColor = () => {
      const body = document.body;
      const computedStyle = getComputedStyle(body);
      const bgColor = computedStyle.backgroundColor;
      setBackgroundColor(bgColor);
    };
    handleBackgroundColor();
  }, []);
  const search = async (searchTerm: string) => {

      if(searchTerm.length > 2){

        const db = await getOramaDB('articles');
        
        const res = await searchOrama(db, { term: searchTerm });
        var hits: {title: string; path: string}[] = res["hits"].map((hit: any) => [hit.document.title, hit.document.path]);

        hits.length > 0 ? setShowDiv(true) : setShowDiv(false);

        setResult(hits);
      }
      else{
        setShowDiv(false);

      }
  };

  const divStyle: CSSProperties = {
    position: 'fixed',
    borderTop: '1px solid white',
    borderRight: '1px solid white',
    borderBottom: '1px solid white',
    borderLeft: '1px solid white',
    borderRadius: '10px',
    opacity: 1,
    padding: '20px',
    zIndex: 2,
    backgroundColor: backgroundColor,
  };

  return (
    <div>
      <div className='w-72'>
      <input type="text" 
      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      style={{height: '60px'}}
      onChange={(e) => search(e.target.value)} />
      {showDiv && 
      <div id='searchResults' style={divStyle}>
      {result.map((element, index) => (
        <React.Fragment key={index}>
          <a href={element[1]}>{element[0]}</a>
          {index !== result.length - 1 && <br />}
          </React.Fragment>
        ))}
        </div>}
      </div>
    </div>
  );
};

export default OramaSearch;
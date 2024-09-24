import axios from "axios"

import { endpointSearch } from "../Config/api"
import { useEffect, useState } from "react";
import Loader from "./Loader";
const Search = ({query}: {query: string}) => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const getNews = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(endpointSearch(query));
            console.log(response.data.articles);
            setIsLoading(false);
            setNews(response.data.articles);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }
    useEffect(() => {
       
        getNews();
    },[query]);
    
  return (
    <>
    {isLoading ? (<Loader />) : (
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
           { news.map((news: any, index: number) => (<div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden" key={index}>
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={news.image} alt="blog"/>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{news.source.name}</h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{news.title}</h1>
                  <p className="leading-relaxed mb-3">{news.description}</p>
                  <div className="flex items-center flex-wrap ">
                    <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" href={news.url}>Learn More
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="m-1" viewBox="0 0 16 16">
      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5"/>
    </svg>{news.publishedAt.split("T")[0]}
                    </span>
                    
                  </div>
                </div>
              </div>
            </div>))}
            
           
          </div>
        </div>
      </section> 
    )}
 </>
  )
}

export default Search
import axios from "axios"
import { endpointPath } from "../Config/api"
import { useEffect, useState } from "react";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../Auth/firebase"
import { doc, setDoc,getDocs, query, where, collection } from "firebase/firestore";
import { auth } from "../Auth/firebase";
import { motion } from "framer-motion";
type SavedArticle = {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
  };
};


const News = ({ country, category }: { country: string; category: string }) => {
  const [news, setNews] = useState<SavedArticle[]>([]);
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const saveArticle = async (article: any) => {
    const user = auth.currentUser;
    if (!user) {
        console.log("User is not signed in");
        toast.error("User is not signed in");
        return;
    }
    try {
        const articleRef = doc(db, "users", user.uid, "savedArticles", article.title); 
        await setDoc(articleRef, {
            title: article.title,
            description: article.description,
            url: article.url,
            image: article.urlToImage || article.image,
            source: article.source.name,
            publishedAt: article.publishedAt,
            savedAt: new Date().toISOString()
        });
        setSavedArticles((prevSavedArticles) => [
          ...prevSavedArticles,
          {
              id: article.title,
              title: article.title,
              description: article.description,
              url: article.url,
              image: article.urlToImage || article.image,
              source: { name: article.source.name },
              publishedAt: article.publishedAt,
          } as SavedArticle
      ]);
        console.log("Article saved successfully!");
        toast.success("Article saved successfully!");
    } catch (error) {
       toast.error("try again");
        console.error("Error saving article: ", error);
    }
};
  // Function to get saved articles
  const getSavedArticles = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User is not authenticated");
      }

      const q = query(collection(db, "savedArticles"), where("userId", "==", user.uid));

      const querySnapshot = await getDocs(q);

      const Articles: SavedArticle[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          title: data.title || "",
          description: data.description || "",
          url: data.url || "",
          image: data.image || "",
          publishedAt: data.publishedAt || "",
          source: {
            name: data.source?.name || "",
          },
        } as SavedArticle;
      });

      setSavedArticles(Articles);
    } catch (error) {
      console.error("Error getting saved articles: ", error);
      return [];
    }
  };

  // Function to get news articles
  const getNews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(endpointPath(country, category));
      setIsLoading(false);
      setNews(response.data.articles);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  // Check if the article is saved
  const isArticleSaved = (articleUrl: string) => {
    return savedArticles.some((savedArticle) => savedArticle.url === articleUrl);
  };

  useEffect(() => {
     getSavedArticles();
    getNews();
   
  }, [category]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {news.map((newsArticle: any, index: number) => (
                <motion.div
                className="p-4 md:w-1/3 "
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" , delay: index * 0.2 }}
                viewport={{ once: true }}>
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden hover:scale-105 transition duration-500">
                    <img
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src={newsArticle.image}
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        {newsArticle.source.name}
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {newsArticle.title}
                      </h1>
                      <p className="leading-relaxed mb-3">{newsArticle.description}</p>
                      <div className="flex items-center flex-wrap ">
                        <a
                          className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                          href={newsArticle.url}
                        >
                          Learn More
                          <svg
                            className="w-4 h-4 ml-2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>

                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <div className="relative group">
                            <button
                              className="ml-4 text-blue-500"
                              onClick={() => saveArticle(newsArticle)}
                            >
                              <img
                                src={isArticleSaved(newsArticle.url) ? "/saved_icon.png" : "/save_icon.png"}
                                className="w-10 h-10"
                                alt={isArticleSaved(newsArticle.url) ? "Saved" : "Save"}
                              />
                            </button>

                            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs rounded py-1 px-2">
                              {isArticleSaved(newsArticle.url) ? "Saved" : "Save"}
                            </span>
                          </div>
                        </span>

                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="m-1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5" />
                          </svg>
                          {newsArticle.publishedAt.split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      <div>
        <Toaster />
      </div>
    </>
  );
};

export default News;

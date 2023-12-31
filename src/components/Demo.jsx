import React from "react";
import { useState, useEffect } from "react";

import { useLazyGetSummaryQuery } from "../feature/article";

import { copy, linkIcon, loader } from "../Assets";




const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    )

    if(articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }

  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

    }
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <form
        className="relative flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <img
          src={linkIcon}
          alt="link_icon"
          className="absolute left-2 my-2 w-5 "
        />
        <input
          type="url"
          placeholder="Enter a Url"
          value={article.url}
          onChange={(e) => {
            setArticle({
              ...article,
              url: e.target.value,
            });
          }}
          required
          className="url_input peer"
        />
        <button
          type="Submit"
          className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
        >
          ↵
        </button>
      </form>
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto ">
        {allArticles.map((item, index) => (
          <div key={`link${index}`} onClick={() => setArticle(item)} className="link_card" >
            <div className="copy_btn">
              <img src={copy} alt="copy_icon" className="w-[40%] h-[40%] object-contain" />
            </div>
            <p className="flex-1 font-satoshi text-blue-7000 font-medium text-sm truncate">
              {item.url}
            </p>
          </div>
        ))}
      </div>
        <div className="my-10 max-w-full flex justify-center items-center">
          {isFetching ? ( <img src={loader} alt="loader" className="w-20 h-20 object-contain" /> ) : error ? (
            <p className="foont-inter font-bold text-black text-center">
              Well, that wasn't supposd to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="foont-inter font-medium text-sm text-gray-700"> {article.summary} </p>
                </div>
              </div>
            )
          )}
        </div>
    </section>
  );
};

export default Demo;

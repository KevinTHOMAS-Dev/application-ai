import React from "react";

import { copy, linkIcon, loader, tick } from "../Assets";
import { useState } from "react";

const Demo = () => {
    
    const [ article, setArticle ] = useState({
        url: "",
        summary: "",
    })

    const handleSubmit = async (e) => {
        e.preventDefault;
        alert("Submitted");
    }

  return (
    <section className="mt-16 w-full max-w-xl">
      <form
        className="relative flex justify-center items-center"
        onSubmit={() => {handleSubmit}}
      >
        <img
          src={linkIcon}
          alt="link_icon"
          className="absolute left-0 my-2 w-5 "
        />
        <input
          type="url"
          placeholder="Enter a Url"
          value={article.url}
          onChange={(e) => {setArticle({
            ...article, url: e.target.value
          })}}
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
    </section>
  );
};

export default Demo;

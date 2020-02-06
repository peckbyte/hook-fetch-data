import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FetchDataApp(props) {
  const [data, setData] = useState<{ hits: any[] }>({ hits: [] });
  const [query, setQuery] = useState("redux");
  const [url, setUrl] = useState(
    "https://hn.algolia.com/api/v1/search?query=mobx"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchdata = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (e) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchdata();
  }, [url]);

  return (
    <>
      <form
        onSubmit={e => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          e.preventDefault(); /* but now browser reloading when clicking the submit button,because that's the native behavior of the browser when submitting a form*/
        }}
      >
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit">search</button>
      </form>

      {isError && <div>something went wrong</div>}
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

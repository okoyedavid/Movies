import { useEffect, useRef } from "react";
import useKey from "./useKey";

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  function hool() {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  }

  // useEffect(() => {
  //   function callBack(e) {
  //     if (document.activeElement === inputEl.current) return;
  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQuery("");
  //     }
  //   }
  //   document.addEventListener("keydown", callBack);

  //   return () => document.removeEventListener("keydown", callBack);
  // }, [setQuery]);

  useKey("Enter", hool);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default Search;

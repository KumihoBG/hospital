import React, { useState, useEffect } from "react";
import '../CoronavirusData/CoronavirusData.css';
import { getCovidStats } from '../../api/api.js';
import News from "../News/News.js";

function CoronavirusData() {
    let [news, setNews] = useState([]);
    useEffect(() => {
        async function fetchWebData() {
            try {
                const res = await getCovidStats();
                setNews(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="news-container">
        {news.length > 0 &&
            <News news={news} />
        }
    </div>
  )
}

export default CoronavirusData;
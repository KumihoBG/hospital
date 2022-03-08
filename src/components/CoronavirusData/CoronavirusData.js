import React, { useState, useEffect } from "react";
import '../CoronavirusData/CoronavirusData.css';
import { getCovidStats } from '../../api/api.js';

function CoronavirusData() {
    let [stats, setStats] = useState([]);
    useEffect(() => {

        window.scrollTo(0, 0);

        async function fetchWebData() {
            try {
                const res = await getCovidStats();
                const result = setStats(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchWebData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="news-container"></div>
  )
}

export default CoronavirusData;
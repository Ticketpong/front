import React, { useEffect, useState } from "react";

const ApiDataFetcher = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://www.kopis.or.kr/openApi/restful/pblprfr?service=b82c2ae6ed6c45fc9ee2b22742eb9bbc&stdate=20240401&eddate=20240402&cpage=1&rows=10&newsql=Y"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "text/xml");
        const items = xmlDoc.getElementsByTagName("db");
        const jsonData = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const jsonDataItem = {
            mt20id: item.querySelector("mt20id").textContent,
            prfnm: item.querySelector("prfnm").textContent,
            prfpdfrom: item.querySelector("prfpdfrom").textContent,
            prfpdto: item.querySelector("prfpdto").textContent,
            fcltynm: item.querySelector("fcltynm").textContent,
            poster: item.querySelector("poster").textContent,
            area: item.querySelector("area").textContent,
            genrenm: item.querySelector("genrenm").textContent,
            openrun: item.querySelector("openrun").textContent,
            prfstate: item.querySelector("prfstate").textContent,
          };
          jsonData.push(jsonDataItem);
        }
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.map((item) => (
        <div key={item.mt20id}>
          <img src={item.poster} alt={item.prfnm} />
          <h2>{item.prfnm}</h2>
          <p>
            {item.fcltynm} - {item.area}
          </p>
          <p>{item.genrenm}</p>
          <p>
            {item.prfpdfrom} ~ {item.prfpdto}
          </p>
          <p>{item.prfstate}</p>
        </div>
      ))}
    </div>
  );
};

export default ApiDataFetcher;

'use client'
import React, {useEffect, useState} from 'react';
import {IData} from "@/components/RestaurantsList";

interface IHistoryItem {
  zipCode: string,
  info: IData
}

const HistoryBar: React.FC =  () => {
  const [historyList, setHistoryList] = useState<IHistoryItem[]>([]);

  const handleHistoryList = async () => {
    const response = await fetch('/api/openai');
    const data = await response.json();

    return data;

  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await handleHistoryList();

      if(response) {
        setHistoryList(response);
      } else {
        setHistoryList([{
          zipCode: '98036',
          info: {
            name: "Washington Burrito",
            address: "19509 44th Avenue West, Lynnwood, WA 98036",
            rating: "4.5",
            cuisines: ["Mexican", "Latin American", "New Mexican"],
            url: "https://www.google.com/maps/place/Washington+Burrito",
            img: "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=PHOTO_REFERENCE&key=YOUR_API_KEY"
          }
        }]);
      }
    }

    fetchData();
  }, []);

  console.log(historyList, 'history list');
  return (
    <div>
      {historyList.length && historyList.map((item, i) => (<div key={i}>{item.zipCode}</div>))}
    </div>
  );
};

export default HistoryBar;
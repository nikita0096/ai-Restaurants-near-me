'use client';

import React, {useState} from 'react';
import RestaurantsList, {IData} from "@/components/RestaurantsList";

const mockData = [
  {
    "name": "Basil Bistro",
    "address": "17525 Hwy 99 Ste E, Lynnwood, WA 98037",
    "rating": "4.7",
    "cuisines": [
      "Vietnamese"
    ],
    "url": "https://www.restaurantji.com/wa/lynnwood/basil-bistro-/",
    "img": "https://cdn6.localdatacdn.com/images/9453648/m_basil_bistro_photo.jpg?q=68f9051b2f087"
  },
  {
    "name": "Indigo Kitchen and Alehouse",
    "address": "2902 164th St SW F3, Lynnwood, WA 98087",
    "rating": "4.6",
    "cuisines": [
      "American",
      "Bars",
      "New American"
    ],
    "url": "https://www.restaurantji.com/wa/lynnwood/indigo-kitchen-and-alehouse-/",
    "img": "https://cdn6.localdatacdn.com/images/3712098/m_indigo_kitchen_and_alehouse_photo.jpg?q=6901c14fd09fe"
  },
  {
    "name": "Kizuki Ramen & Izakaya (Alderwood)",
    "address": "3000 184th St SW Suite 947, Lynnwood, WA 98037",
    "rating": "4.6",
    "cuisines": [
      "Ramen",
      "Izakaya",
      "Vegan"
    ],
    "url": "https://www.restaurantji.com/wa/lynnwood/kizuki-ramen-and-izakaya-alderwood-/",
    "img": "https://cdn6.localdatacdn.com/images/7293524/d_kizuki_ramen_izakaya_alderwood_photo.jpg?q=688c3ae59912a"
  },
  {
    "name": "Q Sushi Bar & Kitchen",
    "address": "20101 44th Ave W Suite E, Lynnwood, WA 98036",
    "rating": "4.6",
    "cuisines": [
      "Sushi Bars",
      "Japanese"
    ],
    "url": "https://www.restaurantji.com/wa/lynnwood/q-sushi-bar-and-kitchen-/",
    "img": "https://cdn6.localdatacdn.com/images/6196499/m_q_sushi_bar_kitchen_photo.jpg?q=68c8c509c138e"
  },
  {
    "name": "Chili Basil Thai Grill (+ Hometaste Kitchen)",
    "address": "18505 Alderwood Mall Pkwy UNIT F, Lynnwood, WA 98037",
    "rating": "4.7",
    "cuisines": [
      "Thai",
      "Vegan"
    ],
    "url": "https://www.restaurantji.com/wa/lynnwood/chili-basil-thai-grill-/",
    "img": "https://chilibasil.com/assets/img/hero.jpg"
  }
]

const InputField: React.FC = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState<IData[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        zipCode: value,
        prompt: `
          find me 5 restaurants, rating 4.5+ around my location ${value} zip code
            each restaurant return data in JSON format:
            "name": "",
            "address": "",
            "rating": "",
            "cuisines": [],
            "url": "",
            "img": ""
          Return only pure JSON no explanations no markdowns!
      `
      }),
    });

    const data = await res.json();

    const parseData= JSON.parse(data);
    setData(parseData.restaurants);
    setLoading(false);
    console.log("data", parseData);
  }
  return (
    <div>
      <div className='flex items-center justify-center gap-2'>
        <input
          className='border-2 border-white rounded-lg w-1/2 p-2'
          value={value}
          placeholder='Enter your zip code'
          onChange={(e) => setValue(e.target.value)}
          type="text"/>
        <button
          className='border-2 border-white rounded-lg p-2 w-1/4'
          onClick={handleSubmit}
        >Find
        </button>
      </div>
      <RestaurantsList data={data} loading={loading}/>
    </div>
  );
};

export default InputField;
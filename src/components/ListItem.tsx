"use client";

import React, {useState} from 'react';
import {IData} from "@/components/RestaurantsList";
import Image from 'next/image'
import Link from "next/link";
import { Star } from "@deemlol/next-icons";
interface ItemListProps {
  item: IData
}

const placeholder = 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg';

const ListItem: React.FC<ItemListProps> = ({item}) => {
  const [image, setImage] = useState(item.img);

  return (
    <li className='flex items-center border rounded-xl shadow-sm w-full'>
      <div
        className=" border rounded-xl dark:bg-gray-800 dark:border-gray-700 h-full w-full">
        <Link
          href={item.url}
        >
          <Image
            style={{
              width: "100%",
              height: "320px",
              objectFit: "cover",
              borderRadius: '10px'
            }}
            className='object-cover'
            src={image}
            alt={item.name}
            width={385}
            height={250}
            priority
            onError={() => setImage(placeholder)}
          />
        </Link>
        <div className="p-5">
          <a href={item.url}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.address}</p>
          <div className="mb-3 font-bold text-gray-700 dark:text-gray-400">
            Cuisines: {item.cuisines.map((item, i) => (
            <p className="font-noramal" key={i}>{item}</p>))}
          </div>
          <div className='flex flex-row gap-2'>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Rate: {item.rating}</p>
            <Star size={24} color="#FFFFFF" />
          </div>
          <a href={item.url}
             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Get location
          </a>
        </div>
      </div>

    </li>
  );
};

export default ListItem;
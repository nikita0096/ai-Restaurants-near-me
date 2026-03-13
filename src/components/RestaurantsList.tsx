import React from 'react';
import ListItem from "@/components/ListItem";
import Loading from "@/app/loading";

export interface IData {
  name: string;
  address: string;
  rating: string;
  cuisines: string[];
  url: string;
  img: string;
}

type RestLis = IData[];

interface RestListProps {
  data: RestLis
  loading: boolean;
}

const RestaurantsList: React.FC<RestListProps> = ({data, loading}) => {
  return (
    <ul className='grid grid-cols-3 grid-rows-2 gap-10 m-10 justify-center'>
      {data?.length !== 0 && (
        data.map((item, i) => <ListItem key={i} item={item}/>)
      )}
      {loading && [0,1,2,3,4].map((item, i) => (<Loading key={i} />))}
    </ul>
  );
};

export default RestaurantsList;
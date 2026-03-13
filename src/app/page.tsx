'use client'
import InputField from "@/components/InputField";
import HistoryBar from "@/components/HistoryBar";
import {useCallback} from "react";

export default function Home() {
  return (
    <div className=" font-sans">
      <h1 className='text-center text-3xl m-5'>Restaurant near me</h1>
      <InputField/>
      <HistoryBar/>
    </div>
  );
}

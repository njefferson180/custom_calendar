"use client"

import Date from "@/components/calendar/Date";
import DateRange from "@/components/calendar/DateRange";
import { useState } from "react";

export default function Home() {

  const [selectedDateValue, setSelectedDateValue] = useState<any>();

  function handleDateRangeChange(data: any) {
    setSelectedDateValue(data);
  }

  console.log("date", selectedDateValue)

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-2 gap-[40px]">
        <div className="border border-gray-200 rounded-[10px] px-[16px] py-[26px]">
          <Date onChange={handleDateRangeChange} model={"model_1"} showResetButton={false} />
        </div>
        <div className="border border-gray-200 rounded-[10px] px-[16px] py-[26px]">
          <DateRange onChange={handleDateRangeChange} model={"model_2"} showResetButton={true} />
        </div>
      </div>
    </div>
  );
}

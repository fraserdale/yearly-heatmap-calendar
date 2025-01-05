import React from "react";
import { YearlyHeatmap } from "../../../src";

export const MondayStart = () => {
  const generateData = () => {
    const data: { date: Date; value: number }[] = [];
    const startDate = new Date(new Date().getFullYear(), 0, 1);
    const endDate = new Date(new Date().getFullYear(), 11, 31);

    console.log(startDate, endDate);
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      if (Math.random() > 0.3) {
        // 70% chance of having activity
        data.push({
          date: new Date(d), // Create new Date instance to avoid reference issues
          value: Math.floor(Math.random() * 12),
        });
      } else {
        // Always push a date entry, with 0 value for no activity
        data.push({
          date: new Date(d),
          value: 0,
        });
      }
    }
    return data.sort((a, b) => a.date.getTime() - b.date.getTime()); // Sort by date
  };
  const data = generateData();
  return (
    <YearlyHeatmap
      data={data}
      startOfWeek={1}
      tooltipContent={(value, date) =>
        `${value} contributions on ${date.toLocaleDateString()}`
      }
    />
  );
};

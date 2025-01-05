import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

export interface YearlyHeatmapProps {
  data: {
    date: Date;
    value: number;
  }[];
  year?: number;
  startOfWeek?: number;
  colorScale?: string[];
  yearSoFar?: boolean;
  tooltipContent?: (value: number, date: Date) => React.ReactNode;
}

export function YearlyHeatmap({
  data,
  colorScale = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  year = new Date().getFullYear(),
  startOfWeek = 0,
  yearSoFar = false,
  tooltipContent,
}: YearlyHeatmapProps) {
  const getColor = (value: number): string => {
    const maxValue = Math.max(...data.map((d) => d.value));
    if (value === 0) return colorScale[0];

    const threshold1 = maxValue * 0.25;
    const threshold2 = maxValue * 0.5;
    const threshold3 = maxValue * 0.75;

    if (value <= threshold1) return colorScale[1];
    if (value <= threshold2) return colorScale[2];
    if (value <= threshold3) return colorScale[3];
    return colorScale[4];
  };

  const getDaysArray = () => {
    const days: Date[] = [];
    const yearStartDate = new Date(year, 0, 1); // Start from January 1st
    // set this variable to the start of the week of yearStartDate
    const yearStartDateStartOfWeek = new Date(
      yearStartDate.getFullYear(),
      yearStartDate.getMonth(),
      yearStartDate.getDate() - yearStartDate.getDay() + startOfWeek
    );

    const yearEndDate = new Date(year, 11, 31); // End on December 31st
    let yearEndDateEndOfWeek = new Date(
      yearEndDate.getFullYear(),
      yearEndDate.getMonth(),
      yearEndDate.getDate() + (6 - yearEndDate.getDay())
    );
    if (yearSoFar) {
      yearEndDateEndOfWeek = new Date();
    }

    while (yearStartDateStartOfWeek <= yearEndDateEndOfWeek) {
      days.push(new Date(yearStartDateStartOfWeek));
      yearStartDateStartOfWeek.setDate(yearStartDateStartOfWeek.getDate() + 1);
    }
    return days;
  };

  const days = getDaysArray();

  const getValue = (date: Date) => {
    const dataPoint = data.find(
      (d) => d.date.toISOString() === date.toISOString()
    );

    return dataPoint ? dataPoint.value : 0;
  };

  const headerConfig = days
    .filter((date) => date.getDay() === startOfWeek)
    .reduce(
      (
        acc: { monthId: number; year: number; text: string; span: number }[],
        date
      ) => {
        const monthId = date.getMonth();
        const year = date.getFullYear();
        const existingMonth = acc.find(
          (m) => m.monthId === monthId && m.year === year
        );

        if (existingMonth) {
          existingMonth.span++;
        } else {
          acc.push({
            monthId,
            year,
            text: new Date(year, monthId, 1).toLocaleString("default", {
              month: "short",
            }),
            span: 1,
          });
        }

        return acc;
      },
      []
    );

  return (
    <TooltipProvider>
      <div
        style={{
          overflowX: "auto",
        }}
      >
        <table style={{ fontFamily: "monospace", borderSpacing: "2px" }}>
          <thead>
            <th colSpan={1}></th>
            {headerConfig.map(({ monthId, text, span }) => (
              <th key={monthId} align="left" colSpan={span}>
                {span > 1 ? text : ""}
              </th>
            ))}
          </thead>
          {[...Array(7)]
            .map((_, index) => {
              const adjustedDay = (index + startOfWeek) % 7;
              const dayName = [1, 3, 5].includes(index)
                ? new Date(0, 0, index + startOfWeek).toLocaleString(
                    "default",
                    {
                      weekday: "short",
                    }
                  )
                : "";
              return { day: adjustedDay, name: dayName };
            })
            .map(({ day, name }) => (
              <tr key={day}>
                <td style={{ paddingRight: "10px" }}>{name}</td>
                {days
                  .filter((d) => d.getDay() === day)
                  .map((date) => (
                    <td key={date.toISOString()}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="heatmap-cell"
                            style={{
                              border: "#666666 1px solid",
                              backgroundColor: getColor(getValue(date)),
                              width: "12px",
                              height: "12px",
                              borderRadius: "2px",
                              position: "relative",
                            }}
                          ></div>
                        </TooltipTrigger>
                        {tooltipContent && (
                          <TooltipContent>
                            {tooltipContent(getValue(date), date)}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </td>
                  ))}
              </tr>
            ))}
        </table>
      </div>
    </TooltipProvider>
  );
}

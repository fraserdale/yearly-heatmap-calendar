# React Yearly Heatmap

A React component for displaying a yearly activity heatmap, similar to GitHub's contribution graph.

## Usage

```tsx
function App() {
  const data = [
    { date: "2023-01-01", value: 5 },
    { date: "2023-01-02", value: 2 },
    // ... more data
  ];

  return (
    <YearlyHeatmap
      data={data}
      colorScale={["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]}
      tooltipContent={(value, date) =>
        `${value} contributions on ${date.toDateString()}`
      }
    />
  );
}
```

## Props

| Prop           | Type                                             | Default                                                   | Description                                                                    |
| -------------- | ------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------ |
| data           | `Array<{ date: string, value: number }>`         | Required                                                  | Array of objects containing date strings (YYYY-MM-DD) and corresponding values |
| colorScale     | `string[]`                                       | `['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']` | Array of colors for different value ranges                                     |
| startDate      | `Date`                                           | First day of current year                                 | Start date for the heatmap                                                     |
| endDate        | `Date`                                           | Current date                                              | End date for the heatmap                                                       |
| tooltipContent | `(value: number, date: Date) => React.ReactNode` | undefined                                                 | Function to customize tooltip content                                          |

## License

MIT

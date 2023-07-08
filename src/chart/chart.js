import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";

const Chart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      chartRef.current?.getEchartsInstance().resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const years = [
    2548, 2549, 2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559,
    2560, 2561, 2562, 2563, 2564,
  ];

  const cases = [0, 1, 0, 4, 4, 10, 9, 5, 2, 51, 32, 15, 14, 0, 0, 35, 79];

  const option = {
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => `${value} คดี`,
    },
    xAxis: {
      type: "category",
      name: "ปี",
      data: years,
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: "value",
      name: "จำนวนคดี",
      alignTicks: true,
      axisLine: {
        show: true,
      },
    },
    series: [
      {
        data: cases,
        type: "bar",
        itemStyle: {
          color: "black",
        },
      },
    ],
  };

  return (
    <ReactEcharts
      ref={chartRef}
      option={option}
      style={{ maxWidth: "550px", margin: "auto auto" }}
    />
  );
};

export default Chart;

import React, { useEffect, useState } from "react";
//import ApexCharts from "react-apexcharts";
import CanvasJSReact from "@canvasjs/react-charts";
//import { color } from "framer-motion";
//import "./Admin.css";
//const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = [
  "#FFDD82",
  "#47B881",
  "#F7A47A",
  "#98C6CF",
  "#1F8297",
  "#166c7d",
  "#0F4B57",
  "#5B98A4",
  "#F64C4C",
  "#8AB5BE",
  "#B9D2D8",
  "#E9F3F5",
];
export const DonutChart = ({
  title,
  labels,
  series,
  height,
  bgColor,
  fontColor,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontColor: fontColor,
    },
    backgroundColor: bgColor,
    dataPointWidth: 12,
    data: [
      {
        indexLabelPlacement: "inside",
        type: "doughnut",
        innerRadius: "70%", // Increase this value to decrease the thickness
        radius: "75%",
        startAngle: 60,
        showInLegend: true,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",

        indexLabelFontColor: "transparent",
        color: colors,
        legendText: "{label}- #percent%",
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          color: colors[index % colors.length],
        })),
      },
    ],
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: 10,
      fontColor: fontColor,
    },
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{
        width: "100%",
        height: height,
        bgColor: bgColor,
        fontColor: fontColor,
      }}
    />
  );
};
export const Doughnut = ({
  title,
  labels,
  series,
  height,
  width,
  bgColor,
  showNo,
}) => {
  const totalValue = series.reduce((acc, value) => acc + value, 0);
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontColor: "black",
    },
    labels: labels,
    backgroundColor: bgColor,
    data: [
      {
        type: "doughnut",
        startAngle: 20,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        showInLegend: true,
        color: colors,
        indexLabelPlacement: "inside",
        // indexLabel: "{label} - #percent%",
        indexLabelFontSize: 0,
        indexLabelFontColor: "white",
        indexLabelFontFamily: "Montserrat",
        indexLabelFontWeight: 500,

        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          legendText: labels[index],
          color: colors[index + (3 % colors.length)],
        })),
      },
    ],
    legend: {
      fontSize: 12,
      horizontalAlign: "center",
      verticalAlign: "bottom",
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontColor: "black",
    },
    subtitles: showNo
      ? [
          {
            text: `${totalValue}`,
            verticalAlign: "center",
            fontSize: 14,
            dockInsidePlotArea: true,
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontColor: "black",
          },
        ]
      : [],
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: height, width: "100%", bgColor: bgColor }}
    />
  );
};

export const GroupedColumnChart = ({
  title,
  titleOptions = {},
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
  color,
  labelFontSize = 8,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 12,
          fontFamily: "Montserrat",
          fontWeight: titleOptions.fontWeight || "bold",
          color: titleOptions.color || "#333",
          horizontalAlign: titleOptions.align || "center",
          padding: titleOptions.padding || { bottom: 10 },
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: labelFontSize,
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: labelFontSize,
        },

        data: series.map((data, index) => ({
          type: "column",
          name: categories[index],
          showInLegend: false,
          dataPoints: data.map((value, i) => ({
            y: value,
            label: categories[i],
            indexLabel: `{y}`, // Show value on each bar
            indexLabelFontSize: 10, // Font size for the value
            indexLabelPlacement: "outside", // Position the value inside the bar
            color: colors[i % colors.length], // Assign color to each bar
          })),
          color: colors[index % colors.length],
        })),
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const GroupedBarChart = ({
  title,
  categories,
  series,
  height,
  xtitle,
  ytitle,
  color,
  labelFontSize = 8,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontColor: "black",
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: labelFontSize,
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: labelFontSize,
        },
        toolTip: {
          shared: true, // Enable shared tooltip
          content: function (e) {
            // Create custom tooltip content
            const year = e.entries[0].dataPoint.label;
            const domestic = e.entries[0].dataPoint.y;
            const international = e.entries[1].dataPoint.y;
            return `Year: ${year}<br/>Domestic Tourists: ${domestic}<br/>International Tourists: ${international}`;
          },
        },
        data: series.map((data, index) => ({
          type: "column",
          name: categories[index],
          showInLegend: true,
          color: color[index % color.length],
          dataPoints: data.map((value, i) => ({
            y: value,
            label: `${2020 + i}`,
            indexLabel: `{y}`,
            indexLabelFontSize: 10,
            indexLabelPlacement: "outside",
          })),
        })),
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const BarChart = ({
  title,
  categories,
  series,
  height,
  xtitle,
  ytitle,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontColor: "black",
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: 8,
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: 8,
        },
        data: series.map((data, index) => ({
          type: "bar",
          name: categories[index],
          showInLegend: false,
          dataPoints: data.map((value, i) => ({
            y: value,
            label: categories[i],
            indexLabel: `{y}`, // Show value on each bar
            indexLabelFontSize: 10, // Font size for the value
            indexLabelPlacement: "outside", // Position the value outside the bar
            color: colors[i % colors.length], // Assign color to each bar
          })),
          color: colors[index % colors.length],
        })),
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const ColumnChart = ({
  title,
  titleOptions = {},
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,

          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontColor: "black",
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: 8,
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: 8,
          indexLabelFontFamily: "Montserrat",
        },
        data: [
          {
            type: "column",
            showInLegend: false,
            dataPoints: series.map((value, index) => ({
              y: value,
              label: categories[index],
              indexLabel: `{y}`,
              indexLabelFontSize: 10,
              indexLabelPlacement: "outside",
              color: colors[index % colors.length],
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const CombinationChart = ({
  title,
  categories,
  totalSites,
  maintainedSites,
  height,
}) => {
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;

  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: "500",
          fontColor: "black",
        },
        axisX: {
          gridThickness: 0,
          labelFontSize: 10,
        },
        axisY: {
          gridThickness: 0,
          labelFontSize: 10,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: "column",
            name: "Total Cultural Sites",
            showInLegend: true,
            color: "#4D7479",
            dataPoints: totalSites.map((value, i) => ({
              y: value,
              label: categories[i],
            })),
          },
          {
            type: "line",
            name: "Maintained Sites",
            showInLegend: true,
            lineThickness: 2,
            markerType: "circle",
            color: "#F7A47A",
            dataPoints: maintainedSites.map((value, i) => ({
              y: value,
              label: categories[i],
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const ParetoChart = ({
  title,
  categories,
  data,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  const [lineDataPoints, setLineDataPoints] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lineDataPoints.length >= categories.length) {
        setLineDataPoints([]);
      } else {
        const nextIndex = lineDataPoints.length;
        setLineDataPoints((prevPoints) => [
          ...prevPoints,
          { label: categories[nextIndex], y: data[nextIndex] },
        ]);
      }
    }, 300); // Adjust the interval time to control the animation speed

    return () => clearInterval(interval);
  }, [categories, data, lineDataPoints]);

  const chartData = categories.map((category, index) => ({
    label: category,
    y: data[index],
  }));

  const options = {
    height: height,
    width: width,

    animationEnabled: true,
    title: {
      text: title,
      fontSize: 13,
      fontWeight: "800",
      fontFamily: "Montserrat",
    },
    axisX: {
      title: xtitle,
      gridThickness: 0,
    },
    axisY: {
      title: ytitle,
      gridThickness: 0,
    },

    data: [
      {
        type: "column",
        name: "Score",
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontWeight: "bold",
        indexLabelFontSize: 10,
        dataPoints: chartData,
        color: colors[2],
      },
      {
        type: "line",
        name: "Trend",
        showInLegend: true,
        indexLabelPlacement: "outside",
        indexLabelFontWeight: "bold",
        indexLabelFontSize: 10,
        dataPoints: lineDataPoints,
        color: colors[4],
      },
    ],
  };

  return (
    <div className="esg-chart z-index-low">
      <CanvasJSChart options={options} />
    </div>
  );
};

export const LineChart = ({
  title,
  categories,
  data,
  xtitle,
  ytitle,
  fontColor,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: "500",
      fontColor: fontColor,
    },
    axisX: {
      title: xtitle,
      labelFontSize: 10,
      interval: 1,
    },
    axisY: {
      title: ytitle,
      labelFontSize: 10,
      gridThickness: 0,
    },

    data: data.map((series, index) => ({
      type: "line",
      name: categories[index],
      showInLegend: false,
      markerType: "circle",
      markerSize: 5,
      dataPoints: data.map((value, i) => ({
        y: value,
        label: categories[i], // Assuming categories array represents labels on the X-axis
      })),
      color: colors[index % colors.length], // Cycles through colors array
    })),
  };

  return (
    <div className="chart-container z-index">
      <CanvasJSChart
        options={options}
        containerProps={{ height: 200, width: "100%" }}
      />
    </div>
  );
};

export const PieChart = ({ title, labels, series, height }) => {
  return (
    <div className="z-index-low">
      <CanvasJSChart
        options={{
          animationEnabled: true,
          title: {
            text: title,
            fontSize: 10,
          },
          legend: {
            horizontalAlign: "right",
            verticalAlign: "center",
            fontSize: 8,
          },
          data: [
            {
              type: "pie",
              startAngle: 75,
              toolTipContent: "<b>{label}</b>: {y} (#percent%)",
              showInLegend: false,
              legendText: "{label}",
              indexLabelFontSize: 8,
              indexLabelFontWeight: "bold",
              indexLabelPlacement: "inside",
              dataPoints: labels.map((label, index) => ({
                y: series[index],
                label: label,
                color: colors[index % colors.length],
              })),
            },
          ],
        }}
        containerProps={{ height: height, width: "100%" }}
      />
    </div>
  );
};

export const CustomBarChart = ({
  title,
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  const options = {
    title: {
      text: title,
      fontSize: 12,
      fontFamily: "Montserrat",
      fontWeight: "800",
    },
    axisX: {
      title: xtitle,
      interval: 1,
      gridThickness: 0, // Remove gridlines on X-axis
    },
    axisY: {
      // title: ytitle,
      includeZero: true,
      gridThickness: 0, // Remove gridlines on Y-axis
    },
    toolTip: {
      shared: true, // Display both series in the tooltip
    },
    data: [
      {
        type: "column",
        name: "Female", // This will show "Female" in the tooltip
        dataPoints: categories.map((category, index) => ({
          label: category,
          y: series[index].female,
          color: "rgb(184, 184, 184)", // color for female
        })),
      },
      {
        type: "column",
        name: "Male", // This will show "Male" in the tooltip
        dataPoints: categories.map((category, index) => ({
          label: category,
          y: series[index].male,
          color: "#00a269", // color for male
        })),
      },
    ],
    width,
    height,
  };

  return (
    <div style={{ width, height }}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export const DecompositionTree = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: "Root", y: 100 },
    { label: "Branch 1", y: 60, parent: "Root" },
    { label: "Branch 2", y: 40, parent: "Root" },
    { label: "Leaf 1.1", y: 30, parent: "Branch 1" },
    { label: "Leaf 1.2", y: 30, parent: "Branch 1" },
    { label: "Leaf 2.1", y: 40, parent: "Branch 2" },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.parent === selectedCategory ||
      (!selectedCategory && !category.parent)
  );

  const options = {
    animationEnabled: true,
    title: {
      text: "Decomposition Tree",
    },
    width: 400,
    data: [
      {
        type: "column",
        dataPoints: filteredCategories.map((category) => ({
          label: category.label,
          y: category.y,
          click: () => setSelectedCategory(category.label),
        })),
      },
    ],
  };

  return (
    <div>
      <button onClick={() => setSelectedCategory(null)}>Reset</button>
      <CanvasJSChart options={options} />
    </div>
  );
};

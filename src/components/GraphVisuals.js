import React, { useEffect, useState } from "react";
//import ApexCharts from "react-apexcharts";
import CanvasJSReact from "@canvasjs/react-charts";
//import { color } from "framer-motion";
//import "./Admin.css";
//const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = [
  "#26575D",
  "#1F8297",
  "#4D7479",
  "#4C9BAC",
  "#98C6CF",
  "#F7A47A",
  "#47B881",
  "#FFDD82",
  "#F64C4C",
  "#0F4B57",
  "#166c7d",
  "#5B98A4",
  "#8AB5BE",
  "#B9D2D8",
  "#E9F3F5",
];
export const DonutChart = ({ title, labels, series, height, width }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: "600",
    },
    dataPointWidth: 12,
    data: [
      {
        type: "doughnut",
        innerRadius: "70%", // Increase this value to decrease the thickness
        radius: "75%",
        startAngle: 60,
        showInLegend: true,
        toolTipContent: "<b>{label}</b>: {y} (#percent%)",
        indexLabelPlacement: "inside",
        indexLabelFontColor: "transparent",
        color: colors,
        legendText: "{label}- #percent%",
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          color: colors[index % colors.length],
          indexLabel: null,
        })),
      },
    ],
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      fontFamily: "Montserrat",
      fontWeight: "normal",
      fontSize: 12,
    },
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{
        width: width,
        height: height,
      }}
    />
  );
};

export const GroupedBarChart = ({
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
          fontFamily: "DM Sans",
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

export const BarChart = ({
  title,
  titleOptions = {},
  categories,
  series,
  height,
  width,
  xtitle,
  ytitle,
  color,
  labelFontSize = 8, // Add a prop for font size
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 12,
          fontFamily: titleOptions.fontFamily || "Arial",
          fontWeight: titleOptions.fontWeight || "bold",
          color: titleOptions.color || "#333",
          horizontalAlign: titleOptions.align || "center",
          padding: titleOptions.padding || { bottom: 10 },
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: labelFontSize, // Set the font size for category labels
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: labelFontSize,
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
      fontFamily: "DM Sans",
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

export const LineBar = ({
  title,
  categories,
  chartSeries,
  height,
  width,
  xtitle,
  ytitle,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 13,
    },
    axisX: {
      title: xtitle,
    },
    axisY: [
      {
        title: {
          text: ytitle,
        },
      },
      {
        opposite: true,
        title: {
          text: "",
        },
      },
    ],
    data: chartSeries.map((series, index) => ({
      type: "line",
      name: categories[index],
      showInLegend: true,
      dataPoints: series.map((value, i) => ({
        y: value,
        label: categories[i],
      })),
      color: colors[index % colors.length],
    })),
  };

  return (
    <div className="chart-container z-index">
      <CanvasJSChart options={options} height={height} width={width} />
    </div>
  );
};

export const PieChart = ({ title, labels, series, height }) => {
  return (
    <div className="z-index-low">
      <CanvasJSChart
        options={{
          height: height,
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
              showInLegend: true,
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
      />
    </div>
  );
};
// export const LineChart = ({
//   title,
//   group,
//   categories,
//   series,
//   height,
//   width,
//   xtitle,
//   ytitle,
// }) => {
//   return (
//     <div className="chart-container z-index-low">
//       <ApexCharts
//         className="chart"
//         options={{
//           chart: {
//             type: "line",
//             height: height,
//             group: group,
//             toolbar: {
//               show: true,
//             },
//           },
//           title: {
//             text: title,
//             align: "center",
//             offsetY: 10,
//             offsetX: -60,
//             style: {
//               fontSize: "0.7vw",
//             },
//           },
//           xaxis: {
//             tickPlacement: "on",
//             type: "category",
//             categories: categories,
//             title: {
//               text: xtitle,
//               style: {
//                 fontSize: "0.5vw",
//                 fontWeight: 800,
//               },
//               offsetY: 10,
//             },
//             labels: {
//               style: {
//                 fontSize: "0.5vw", // Adjust the font size of categories
//               },
//             },
//           },
//           yaxis: {
//             title: {
//               text: ytitle,
//               style: {
//                 fontSize: "0.5vw",
//                 fontWeight: 800,
//               },
//             },
//           },
//           colors,
//           stroke: {
//             width: 1,
//           },
//         }}
//         series={series}
//         type="line"
//         height={height}
//         width={width}
//       />
//     </div>
//   );
// };

// Function to render an area chart
// export const AreaChart = ({
//   title,
//   categories,
//   series,
//   height,
//   width,
//   xtitle,
//   ytitle,
// }) => {
//   return (
//     <div className="chart-container z-index-low">
//       <ApexCharts
//         className="chart"
//         options={{
//           chart: {
//             type: "area",
//             height: height,
//             group: "same",
//             toolbar: {
//               show: true,
//             },
//           },
//           title: {
//             text: title,
//             align: "center",
//             offsetY: 20,
//             style: {
//               fontSize: "1vw",
//             },
//           },
//           xaxis: {
//             tickPlacement: "on",
//             type: "category",
//             categories: categories,
//             title: {
//               text: xtitle,
//             },
//           },
//           yaxis: {
//             title: {
//               text: ytitle,
//             },
//           },
//           colors, // Include the colors array here
//         }}
//         series={series}
//         type="area"
//         height={height}
//         width={width}
//       />
//     </div>
//   );
// };
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
      fontFamily: "DM Sans",
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
const DecompositionTree = () => {
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

export default DecompositionTree;

import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const colors = [
  "#FFDD82", // Light Yellow
  "#47B881", // Green
  "#F7A47A", // Light Orange
  "#4D7479", //Dusty Teal
  "#98C6CF", // Light Blue
  "#1F8297", // Dark Cyan
  "#166c7d", // Dark Teal
  "#0F4B57", // Dark Slate Blue
  "#5B98A4", // Slate Blue
  "#F64C4C", // Red
  "#8AB5BE", // Soft Blue-Green
  "#B9D2D8", // Pale Cyan
  "#E9F3F5", // Very Light Cyan
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
      fontWeight: 600,
      fontColor: fontColor,
      horizontalAlign: "left",
      padding: { bottom: 20 },
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
      fontWeight: 500,
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
      fontWeight: 600,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 20 },
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
        dataPoints: series.map((value, index) => ({
          y: value,
          label: labels[index],
          legendText: labels[index],
          color: colors[index + (4 % colors.length)],
        })),
      },
    ],
    legend: {
      fontSize: 12,
      horizontalAlign: "center",
      verticalAlign: "bottom",
      fontFamily: "Montserrat",
      fontWeight: 500,
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
            fontWeight: 500,
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
          fontWeight: 600,
          fontColor: "black",
          horizontalAlign: "left",
          padding: { bottom: 20 },
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        data: [
          {
            type: "bar",
            showInLegend: false,
            dataPoints: series.map((value, index) => ({
              y: value,
              label: categories[index],
              indexLabel: `{y}`,
              indexLabelFontSize: 10,
              indexLabelPlacement: "outside",
              indexLabelFontFamily: "Montserrat",
              //color: colors[index % colors.length],
              color: colors[index + (4 % colors.length)],
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const GroupedBarChart = ({
  title,
  dataSeries,
  labels,
  height,
  xtitle,
  ytitle,
  dataPointWidth,
}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 20 },
    },
    axisX: {
      title: xtitle,
      gridThickness: 0,
      labelFontSize: 8,
      labelFontFamily: "Montserrat",
    },
    axisY: {
      title: ytitle,
      gridThickness: 0,
      labelFontSize: 8,
      labelFontFamily: "Montserrat",
    },
    legend: {
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 10,
    },
    toolTip: {
      shared: true, // Enable shared tooltip
      //   content: function (e) {
      //     // Create custom tooltip content
      //     const year = e.entries[0].dataPoint.label;
      //     const domestic = e.entries[0].dataPoint.y;
      //     const international = e.entries[1].dataPoint.y;
      //     return `Year: ${year}<br/>Domestic Tourists: ${domestic}<br/>International Tourists: ${international}`;
      //   },
      // },
      content: function (e) {
        // Dynamically generate the tooltip content
        let content = `Year: ${e.entries[0].dataPoint.label}<br/>`; // Get year from the first dataPoint label
        e.entries.forEach((entry) => {
          const category = entry.dataSeries.name; // Get the category (domestic/international or any other)
          const value = entry.dataPoint.y; // Get the value for this category
          content += `${category}: ${value}<br/>`; // Add category and value dynamically
        });
        return content; // Return the dynamically generated content
      },
    },
    dataPointWidth: dataPointWidth,
    data: dataSeries.map((data, index) => {
      return {
        type: "bar",
        name: data.name,
        color: colors[index + (2 % colors.length)],
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: "#00403c",
        indexLabelFontSize: 10,
        indexLabelFontFamily: "Montserrat",
        dataPoints: data.data?.map((val, index) => ({
          label: labels[index],
          y: val,
        })),
      };
    }),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const StackedBarChart = ({
  title,
  categories,
  series,
  height,
  labels,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontColor: "black",
          horizontalAlign: "left",
          padding: { bottom: 20 },
        },
        axisY: {
          includeZero: true,
          gridThickness: 0,
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        axisX: {
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        legend: {
          fontSize: 12,
          fontFamily: "Montserrat",
          fontWeight: 500,
        },
        data: categories.map((category, index) => ({
          type: "stackedBar",
          name: category,
          showInLegend: true,
          color: colors[index % colors.length],
          dataPoints: labels.map((year, i) => ({
            label: year,
            y: series[i][index],
          })),
        })),
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const ModifiedBarChart = ({
  title,
  categories,
  series,
  height,
  xtitle,
  ytitle,
}) => {
  const data = []; // Array to hold data series

  // Create a data series for each category
  series.forEach((dataPoints, index) => {
    dataPoints.forEach((value, i) => {
      data.push({
        type: "bar",
        name: `${categories[index]}: ${value}`, // Unique name for the legend
        legendText: `${categories[index]}: ${value}`, // Unique text for the legend
        y: value,
        color: colors[index % colors.length], // Assign color to each bar
        indexLabel: `${categories[index]}: ${value}`, // Display category with its value
        indexLabelFontSize: 10,
        indexLabelPlacement: "outside", // Position the value outside the bar
        indexLabelFontFamily: "Montserrat",
        cornerRadius: 30,
      });
    });
  });

  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontColor: "#4C4C4C",
          horizontalAlign: "left", // Left-align the title
          padding: { bottom: 20 },
        },
        backgroundColor: "transparent",
        dataPointWidth: 20,
        axisX: {
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 0,
          labelFormatter: function () {
            return " ";
          },
        },
        axisY: {
          title: ytitle,
          gridThickness: 0.25,
          labelFontSize: 8, // Hide labels by setting font size to 0
          labelFontFamily: "Montserrat",
          lineThickness: 0.5, // Hide the X-axis line
          tickLength: 0, // Remove ticks on the X-axis
        },
        data: series.map((data, index) => ({
          showInLegend: false,
          type: "bar",
          name: categories[index],
          dataPoints: data.map((value, i) => ({
            legendText: `${categories[index]}: ${value}`,
            y: value,
            label: categories[i],
            indexLabel: `${categories[i]}: {y}`, // Include categories in indexLabel
            indexLabelFontSize: 10, // Font size for the value
            indexLabelPlacement: "outside", // Position the value outside the bar
            indexLabelFontFamily: "Montserrat",
            //indexLabelFontWeight: "400",
            color: colors[i % colors.length], // Assign color to each bar
            //cornerRadius: 30,
          })),
          color: colors[index % colors.length],
        })),
        legend: {
          horizontalAlign: "center",
          verticalAlign: "bottom",
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 10,
          fontColor: "black",
        },
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const ColumnChart = ({
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
          fontWeight: 600,
          fontColor: "black",
          horizontalAlign: "left",
          padding: { bottom: 20 },
        },
        axisX: {
          title: xtitle,
          gridThickness: 0,
          labelFontSize: 8,
          labelFontFamily: "Montserrat",
        },
        axisY: {
          title: ytitle,
          gridThickness: 0,
          labelFontSize: 8,
          labelFontFamily: "Montserrat",
        },
        legend: {
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 10,
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
              indexLabelFontFamily: "Montserrat",
              // color: colors[index % colors.length],
              color: colors[index + (4 % colors.length)],
            })),
          },
        ],
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const ModifiedColumnChart = ({
  title,
  categories,
  series,
  height,
  labelFontSize,
}) => {
  return (
    <div className="flex flex-column align-items-center justify-content-between w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            title: {
              text: title,
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontColor: "black",
              horizontalAlign: "left",
              padding: { bottom: 10 },
            },
            axisX: {
              // title: xtitle,
              gridThickness: 0,
              labelFontSize: 0,
              labelFontFamily: "Montserrat",
              tickLength: 0,
              lineThickness: 0,
              interval: 1,
            },
            axisY: {
              // title: ytitle,
              gridThickness: 0,
              labelFontSize: 0,
              tickLength: 0,
              lineThickness: 0,
              labelFormatter: function () {
                return " ";
              },
            },
            legend: {
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: 10,
            },
            dataPointWidth: 50,
            // data: categories.map((category, index) => ({
            //   type: "column",
            //   showInLegend: true,
            //   legendText: category, // Show the category in the legend
            //   dataPoints: [
            //     {
            //       y: series[index],
            //       label: category,
            //       indexLabel: `{y}`,
            //       indexLabelFontSize: 10,
            //       indexLabelPlacement: "outside",
            //       indexLabelFontFamily: "Montserrat",
            //       color: colors[index + (4 % colors.length)],
            //     },
            //   ],
            //   dataPointWidth: 40,
            //   color: colors[index + (4 % colors.length)],
            // })),
            data: [
              {
                type: "column",
                showInLegend: false,
                dataPoints: series.map((value, index) => ({
                  y: value,
                  label: categories[index],
                  // legendText: categories[index],
                  indexLabel: `{y}`,
                  indexLabelFontSize: 10,
                  indexLabelPlacement: "outside",
                  indexLabelFontFamily: "Montserrat",
                  // color: colors[index % colors.length],
                  color: colors[index + (4 % colors.length)],
                })),
              },
            ],
          }}
          containerProps={{ height: height, width: "100%" }}
        />
      </div>
      {/* Custom Legends */}
      <div className="flex gap-2">
        {series.map((value, index) => (
          <div
            key={index}
            className="flex align-items-center"
          >
            <div
              className="mr-1 border-circle"
              style={{
                width: "0.5rem",
                height: "0.5rem",
                backgroundColor: colors[index + (4 % colors.length)],
              }}
            ></div>
            <span className="text-xs text-center">{categories[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GroupedColumnChart = ({
  title,
  dataSeries,
  labels,
  dataPointWidth,
  height,
}) => {
  // const colors = ["#98C6CF", "#1F8297", "#166c7d", "#e9f3f5"];
  console.log(dataSeries);
  const options = {
    animationEnabled: true,
    title: {
      text: title,
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontSize: 14,
      padding: { bottom: 20 },
      fontColor: "black",
      horizontalAlign: "left",
    },
    axisY: {
      //title: "Score",
      gridThickness: 0,
      labelFontSize: 8,
      labelFontFamily: "Montserrat",
    },
    axisX: {
      // interval: 1,
      gridThickness: 0,
      labelFontSize: 8,
      labelFontFamily: "Montserrat",
    },

    toolTip: {
      shared: true,
      cornerRadius: 4,
    },
    legend: {
      // horizontalAlign: "center",
      // verticalAlign: "bottom",
      fontFamily: "Montserrat",
      fontWeight: 500,
      fontSize: 10,
      fontColor: "black",
    },
    dataPointWidth: dataPointWidth,
    data: dataSeries.map((data, index) => {
      console.log(data);
      return {
        type: "column",
        name: data.name,
        color: colors[index + (2 % colors.length)],
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "outside",
        indexLabelFontColor: "#00403c",
        indexLabelFontSize: 10,
        indexLabelFontFamily: "Montserrat",
        dataPoints: data.data?.map((val, index) => ({
          label: labels[index],
          y: val,
        })),
      };
    }),
  };

  return (
    <CanvasJSChart
      options={options}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const StackedColumnChart = ({
  title,
  categories,
  series,
  height,
  labels,
}) => {
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontColor: "black",
          horizontalAlign: "left",
          padding: { bottom: 20 },
        },
        axisY: {
          includeZero: true,
          gridThickness: 0,
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        axisX: {
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        legend: {
          fontSize: 12,
          fontFamily: "Montserrat",
          fontWeight: 500,
        },
        data: categories.map((category, index) => ({
          type: "stackedColumn",
          name: category,
          showInLegend: true,
          color: colors[index % colors.length],
          dataPoints: labels.map((year, i) => ({
            label: year,
            y: series[i][index],
          })),
        })),
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
          fontWeight: 600,
          fontColor: "black",
          horizontalAlign: "left",
          padding: { bottom: 20 },
        },
        axisX: {
          gridThickness: 0,
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        axisY: {
          gridThickness: 0,
          labelFontSize: 10,
          labelFontFamily: "Montserrat",
        },
        toolTip: {
          shared: true,
        },
        legend: {
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 10,
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
      fontSize: 14,
      fontFamily: "Montserrat",
      fontWeight: 600,
      fontColor: "black",
      horizontalAlign: "left",
      padding: { bottom: 20 },
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
        // name: "Score",
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelPlacement: "inside",
        indexLabelFontWeight: "bold",
        indexLabelFontSize: 10,
        indexLabelFontFamily: "Montserrat",
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
        indexLabelFontFamily: "Montserrat",
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
      fontWeight: 600,
      fontColor: fontColor,
      horizontalAlign: "left",
      padding: { bottom: 20 },
    },
    axisX: {
      title: xtitle,
      labelFontSize: 10,
      interval: 1,
      labelFontFamily: "Montserrat",
    },
    axisY: {
      title: ytitle,
      labelFontSize: 10,
      gridThickness: 0,
      labelFontFamily: "Montserrat",
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

export const PieChart = ({
  title,
  categories,
  series,
  height,
  horizontal,
  vertical,
}) => {
  const total = series.reduce((acc, value) => acc + value, 0);
  return (
    <CanvasJSChart
      options={{
        animationEnabled: true,
        title: {
          text: title,
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: 600,
          fontColor: "black",
          horizontalAlign: "left",
          padding: {bottom: 10}
        },

        data: [
          {
            type: "pie",
            startAngle: 280,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: true,
            legendText: "{label}",
            color: colors,
            indexLabelFontSize: 10,
            indexLabelPlacement: "inside",
            indexLabel: "#percent%",
            indexLabelFontColor: "white",
            dataPoints: series.map((value, index) => ({
              y: value,
              label: categories[index],
              // color: colors[index % colors.length],
              color: colors[index + (4 % colors.length)],
              percent: ((value / total) * 12).toFixed(2),
            })),
          },
        ],
        legend: {
          fontSize: 10,
          horizontalAlign: horizontal,
          verticalAlign: vertical,
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontColor: "black",
        },
      }}
      containerProps={{ height: height, width: "100%" }}
    />
  );
};

export const ModifiedPieChart = ({ title, categories, series, height }) => {
  const total = series.reduce((acc, value) => acc + value, 0);
  return (
    <div className="flex flex-column align-items-center justify-content-around w-full">
      <div className="flex w-full">
        <CanvasJSChart
          options={{
            animationEnabled: true,
            title: {
              text: title,
              fontSize: 14,
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontColor: "black",
              horizontalAlign: "left",
              padding: { bottom: 40 },
            },
            backgroundColor: "transparent",
            legend: {
              enabled: false, // Disable default legend
            },
            data: [
              {
                type: "pie",
                startAngle: 90,
                toolTipContent: "<b>{label}</b>: #percent%",
                showInLegend: false, // Disable showInLegend since we're using custom legends
                radius: 180,
                indexLabel: "{y} ha", // Show label and value
                indexLabelFontSize: 14,
                indexLabelPlacement: "outside",
                indexLabelFontFamily: "Montserrat",
                indexLabelFontWeight: 500,
                dataPoints: series.map((value, index) => ({
                  y: value,
                  label: categories[index],
                  color: colors[index % colors.length],
                  percent: ((value / total) * 100).toFixed(2),
                })),
              },
            ],
          }}
          containerProps={{ height: height, width: "100%" }}
        />
      </div>

      {/* Custom Legends */}
      <div className="flex flex-wrap">
        {series.map((value, index) => (
          <div
            key={index}
            className="flex align-items-center mb-1"
            style={{ width: "50%" }}
          >
            <div
              className="mr-2"
              style={{
                width: "0.7rem",
                height: "0.7rem",
                backgroundColor: colors[index % colors.length],
              }}
            ></div>
            <span className="text-lg">{categories[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GaugeChart = ({ title, gaugeValue, maxValue, height }) => {
  const createGaugeOptions = () => {
    // Calculation for the unoccupied (remaining) value
    const unoccupied = {
      y: maxValue - gaugeValue,
      color: "#fff", // Color for the unoccupied portion
      toolTipContent: null, // Disable tooltip for this section
      highlightEnabled: false,
      click: function () {
        unoccupied.exploded = true; // Explode effect on click
      },
    };

    // The filled portion of the gauge
    const data = {
      y: gaugeValue,
      color: "#1F8297", // Default color for the gauge
      click: function () {
        data.exploded = true; // Explode effect on click
      },
    };

    return {
      animationEnabled: true,
      title: {
        text: title,
        fontSize: 14,
        fontFamily: "Montserrat",
        fontWeight: 500,
        fontColor: "black",
        horizontalAlign: "left",
      },
      backgroundColor: "transparent",
      subtitles: [
        {
          text: `${gaugeValue}%`, // Display the gauge value in the center
          verticalAlign: "center",
          fontSize: 14,
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontColor: "black",
        },
      ],
      data: [
        {
          type: "doughnut",
          startAngle: 0, // Half-circle effect
          endAngle: 180,
          radius: "200%", // Adjust the radius to make the gauge bigger
          innerRadius: "80%", // Adjust the inner radius to control the thickness of the gauge
          dataPoints: [
            { y: maxValue, color: "transparent", toolTipContent: null }, // Full background (transparent)
            data, // Filled section
            unoccupied, // Empty section
          ],
        },
      ],
    };
  };

  return (
    <CanvasJSChart
      options={createGaugeOptions()} // Pass the dynamically created gauge options
      containerProps={{ height: height, width: "100%" }} // Adjust height and width of the chart
    />
  );
};

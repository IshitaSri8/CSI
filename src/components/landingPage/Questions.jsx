import React from "react";

const Questions = ({ question, points, textTheme }) => {
  const textClass = textTheme === "white" ? "text-300" : "text-500";
  return (
    <div className="p-8 m-4 flex gap-7">
      {/* First Column with Fixed Question */}
      <div className="flex-1">
        <p className="text-6xl font-semibold">{question}</p>
      </div>

      {/* Second Column with Scrollable Answers */}
      <div
        className="flex-1 overflow-hidden"
        style={{ position: "relative", paddingLeft: "20px" }}
      >
        <div
          className="p-5 mt-3"
          style={{
            maxHeight: "30rem",
            overflowY: "auto", // Allow vertical scrolling
            scrollbarWidth: "none", // For Firefox
            msOverflowStyle: "none", // For Internet Explorer and Edge
          }}
        >
          <ul>
            {points &&
              points.length > 0 &&
              points.map((point, index) => (
                <li key={index} className="mb-4 text-4xl">
                  <span className={`font-bold ${textClass} text-5xl`}>
                    {`${index + 1}. `}
                  </span>
                  {/* <hr className="my-2" /> */}
                  <p className="text-2xl font-semibold">{point.subheading}</p>
                  <p>{point.content}</p> {/* Main point content */}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Questions;

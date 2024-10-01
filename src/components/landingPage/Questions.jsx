import React from 'react';

const Questions = ({ question, point1, point2, point3 }) => {
    return (
        <div className="p-6 flex gap-7">
            {/* First Column with Fixed Question */}
            <div className="flex-1">
                <p className="text-5xl font-semibold">{question}</p>
            </div>

            {/* Second Column with Scrollable Answers */}
            <div className="flex-1 overflow-hidden" style={{ position: 'relative', paddingLeft: '20px' }}>
                <div
                    className="p-2"
                    style={{
                        maxHeight: '20rem',
                        overflowY: 'auto', // Allow vertical scrolling
                        scrollbarWidth: 'none', // For Firefox
                        msOverflowStyle: 'none', // For Internet Explorer and Edge
                    }}
                >
                    <ul>
                        {point1 && point1.length > 0 && (
                            <li className="mb-4 text-xl">
                                 <span className="font-bold text-4xl">01. </span>
                                 <hr className="my-2" />
                                 {point1[0]}
                                 </li>
                        )}
                        {point2 && point2.length > 0 && (
                            <li className="mb-4 text-xl">
                                 <span className="font-bold text-4xl">02. </span>
                                 <hr className="my-2" />
                                 {point2[0]}
                                 </li>
                        )}
                        {point3 && point3.length > 0 && (
                             <li className="mb-4 text-xl">
                             <span className="font-bold text-4xl">03. </span>
                             <hr className="my-2" />
                             {point3[0]}
                         </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Questions;

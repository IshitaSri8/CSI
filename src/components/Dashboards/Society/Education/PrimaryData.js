export const primaryData = {
  enrollment: "75800",
  institutions: 1200,

  enrollmentRatioTarget: "3/8",
  enrollmentRatioCurrent: "2/7",
  enrollmentRatioTargetValue: 3/8,
  enrollmentRatioCurrentValue:2/7,

  dropoutRatioTarget: "5/4",
  dropoutRatioCurrent: "7/9",
  dropoutRatioTargetValue: 5/4,
  dropoutRatioCurrentValue:7/9,

  teacherStudentRatioTarget: "1/25",
  teacherStudentRatioCurrent: "1/36",
  teacherStudentRatioTargetValue: 1/25,
  teacherStudentRatioCurrentValue:1/36,

  genderLabels: ["Male", "Female"],
  genderData: [45, 55],

  institutionsLabels: ["Public", "Private"],
  institutionsData: [70, 30],

  years: ["2018", "2019", "2020", "2021"],
  enrollmentTrendData: [
    { name: "Male", data: [50, 55, 60, 65] },
    { name: "Female", data: [40, 45, 50, 55] },
  ],
  dropoutTrendData: [
    { name: "Male", data: [10, 9, 8, 7] },
    { name: "Female", data: [7, 4, 9, 5] },
  ],
  teacherStudentRatioTrend: [1/40, 1/45, 1/60, 1/52],

  institutionsAnalysisLabels: ["Nursery", "Primary", "Aanganwari"],
  institutionsAnalysisData: [
    { name: "Target", data: [478, 239, 239] },
    { name: "Existing", data: [239, 103, 103] },
  ],

  
};

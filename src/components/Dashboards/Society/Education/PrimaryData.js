export const primaryData = {
  enrollment: "75000*",
  institutions: 196,
  parityIndex: 0.8,

  enrollmentTarget: 100,
  enrollmentCurrent: 77.8,

  dropoutRatioTargetValue: 0.28,
  dropoutRatioCurrentValue: 0.3,

  teacherStudentRatioTarget: "1:25",
  teacherStudentRatioCurrent: "1:36",
  teacherStudentRatioTargetValue: 1/25,
  teacherStudentRatioCurrentValue:1/36,

  genderLabels: ["Male", "Female"],
  genderData: [45, 55],

  institutionsLabels: ["Government", "Private"],
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
  teacherStudentRatioTrend: [40, 45, 60, 52],

  institutionsAnalysisLabels: ["Nursery", "Primary", "Aanganwari"],
  institutionsAnalysisData: [
    { name: "Target", data: [478, 239, 239] },
    { name: "Existing", data: [146, 50, 50] },
  ],

  
};

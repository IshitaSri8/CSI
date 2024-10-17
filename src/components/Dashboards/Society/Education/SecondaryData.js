export const secondaryData = {
  enrollment: "55000",
  institutions: 650,
  parityIndex: 0.7,
  
  enrollmentRatioTarget: "3:8",
  enrollmentRatioCurrent: "2:7",
  enrollmentRatioTargetValue: 3/8,
  enrollmentRatioCurrentValue:2/7,

  dropoutRatioTarget: "5:4",
  dropoutRatioCurrent: "7:9",
  dropoutRatioTargetValue: 5/4,
  dropoutRatioCurrentValue:7/9,

  teacherStudentRatioTarget: "1:25",
  teacherStudentRatioCurrent: "1:36",
  teacherStudentRatioTargetValue: 1/25,
  teacherStudentRatioCurrentValue:1/36,

  genderLabels: ["Male", "Female"],
  genderData: [67, 23],

  institutionsLabels: ["Government", "Private"],
  institutionsData: [36, 64],

  years: ["2018", "2019", "2020", "2021"],
  enrollmentTrendData: [
    { name: "Male", data: [120, 126, 135, 150] },
    { name: "Female", data: [68, 75, 75, 90] },
  ],
  dropoutTrendData: [
    { name: "Male", data: [5, 4, 6, 8] },
    { name: "Female", data: [8, 6, 3, 5] },
  ],
  teacherStudentRatioTrend: [40, 45, 60, 52],

  institutionsAnalysisLabels: ["Junior High School", "Inter College"],
  institutionsAnalysisData: [
    { name: "Target", data: [159, 119] },
    { name: "Existing", data: [69, 52] },
  ],

};

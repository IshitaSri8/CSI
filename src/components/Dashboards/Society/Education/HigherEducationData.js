export const higherEducationData = {
  enrollment: "4600*",
  institutions: 16,
  parityIndex: 0.9,
  
  enrollmentTarget: 44,
  enrollmentCurrent: 39,

  dropoutRatioTargetValue: 0.28,
  dropoutRatioCurrentValue: 0.3,

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

  institutionsAnalysisLabels: ["Degree College", "Engineering College", "Medical College", "Dental College"],
  institutionsAnalysisData: [
    { name: "Target", data: [15, 1, 1, 1] },
    { name: "Existing", data: [6, 1, 1, 1] },
  ],

};

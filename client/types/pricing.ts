export interface pricingType {
  _id: string;
  packageName: string;
  accessToAllCourses?: boolean;
  accessToPastPapers: boolean;
  accessToPdfSolutions: boolean;
  accessToRestrictedVideos: boolean;
  accessToVideoSolutions?: boolean;
  downloadableAnswers?: boolean;
  downloadablePapers?: boolean;
  downloadableVideos?: boolean;
}

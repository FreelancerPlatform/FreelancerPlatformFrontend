//import ApplicantViewApplicationsPage from "./components/ApplicantViewApplicationsPage";

const job = require("./mock-data/jobs.json");
const jobInfo = require("./mock-data/jobInfo.json");
const applicant = require("./mock-data/applicants.json");
const application = require("./mock-data/applications.json");

export const login = (credential, role) => {};

// Register (permit all)
export const register = (credential, role) => {
  console.log(credential);
};

export const getJobsByType = (job_type) => {
  return job;
};

export const getJobById = (job_ID) => {
  return jobInfo;
};

export const getJobRecommendations = () => {
  return job;
};

export const getJobsByEmployer = () => {
  return job;
};
export const closeJob = (job_ID) => {};

export const getApplicationsByJob = (job_Id) => {
  return application;
};

export const createApplication = (job_id) => {};

export const getProfile = (email) => {
  return applicant;
};

export const getApplications = () => {
  return application;
};

export const withdrawApplication = (application_ID) => {};

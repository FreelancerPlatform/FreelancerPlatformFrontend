const job = require('./mock-data/jobs.json');
const applicant = require('./mock-data/applicants.json');
const application = require('./mock-data/applications.json')

export const getJobsByEmployer = () => {
    return job;
};

export const getApplicantsByJob = (jobID) => {
    return application;
};

export const closeJob = (jobID) => {

};

export const getProfile = (email) => {
    return applicant;
};

export const getApplicationsByJob = (jobID) => {
    return application;
}
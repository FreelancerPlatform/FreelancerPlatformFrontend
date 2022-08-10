const job = require('./mock-data/jobs.json');
const applicant = require('./mock-data/applicants.json');

export const getJobsByEmployer = () => {
    return job;
};

export const getApplicantsByJob = (jobId) => {
    return applicant;
};
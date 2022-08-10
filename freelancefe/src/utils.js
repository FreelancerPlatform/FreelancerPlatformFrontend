const job = require('./mock-data/jobs.json');
const applicant = require('./mock-data/applicants.json');

const domain = "locahost:8080";

export const login = (credential, asEmployer) => {
    const loginUrl = `${domain}/authenticate/${asEmployer ? "employer" : "applicant"}`;
    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to log in");
        }

        return response.json();
    });
};

export const register = (credential, asEmployer) => {
    const registerUrl = `${domain}/register/${asEmployer ? "employer" : "applicant"}`;
    return fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to register");
        }
    });
};

export const getJobsByEmployer = () => {
    const authToken = localStorage.getItem("authToken");
    const listJobsUrl = `${domain}/jobs/`;

    return fetch(listJobsUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to get job list");
        }

        return response.json();
    });

    //return job;
};

export const getApplicantsByJob = (jobId) => {
    const authToken = localStorage.getItem("authToken");
    const getApplicantByJobUrl = `${domain}/jobs/applicants/${jobId}`;
   
    return fetch(getApplicantByJobUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw Error("Fail to get applicants by job");
      }
   
      return response.json();
    });
};

export const deleteJob = (jobId) => {
    const authToken = localStorage.getItem("authToken");
    const deleteJobUrl = `${domain}/jobs/${jobId}`;

    return fetch(deleteJobUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error("Fail to delete job");
        }
    });
};


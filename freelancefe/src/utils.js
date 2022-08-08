const domain = "the url you deployed your backend to";
// ...

export const getJobsByType = (job_type) => {
  const authToken = localStorage.getItem("authToken");
  const getJobsUrl = `${domain}/jobs/${job_type}`;
  //if (job_type) { // when job_type is not empty, get jobs from one category
    //getJobsUrl.searchParams.append("job_type", job_type);
  //}
 
  return fetch(getJobsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to find jobs");
    }
    return response.json();
  });
};

export const getJobRecommendations = () => {
    const authToken = localStorage.getItem("authToken");
    const getRecommendedJobsUrl = `${domain}/recommendation`;
    return fetch(getRecommendedJobsUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    }).then((response) => {
        if (response.status !== 200) {
            throw Error('Failed to get recommended jobs');
        }

        return response.json();
    });
};

export const getApplications = () => {
  const authToken = localStorage.getItem("authToken");
  const listApplicationsUrl = `${domain}/applications`;
 
  return fetch(listApplicationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to get submitted applications");
    }
 
    return response.json();
  });
};

export const createApplication = (job_id) => {
  const authToken = localStorage.getItem("authToken");
  const createApplicationUrl = `${domain}/applications/${job_id}`;
 
  return fetch(createApplicationUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(data),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to submit application");
    }
  });
};

export const withdrawApplication = (application_ID) => {
  const authToken = localStorage.getItem("authToken");
  const withdrawApplicationUrl = `${domain}/applications/${application_ID}`;
 
  return fetch(withdrawApplicationUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Fail to withdraw application");
    }
  });
};


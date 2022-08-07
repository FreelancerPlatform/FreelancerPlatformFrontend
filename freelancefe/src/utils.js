const domain = "the url you deployed your backend to";
// ...

export const getJobsByType = (job_type) => {
  const authToken = localStorage.getItem("authToken");
  const getJobsUrl = new URL(`${domain}/jobs/${job_type}`);
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
    const getRecommendedJobsUrl = new URL(`${domain}/recommendation`);
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

export const createApplication = (job_id) => {
  const authToken = localStorage.getItem("authToken");
  const createApplicationUrl = new URL(`${domain}/applications/${job_id}`);
 
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



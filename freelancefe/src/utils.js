const domain = "http://localhost:8080";

// Login token-based authentication (permit all)
export const login = (credential, role) => {
  // typeof dropdown menu input == string? depends on login page
  const loginUrl = `${domain}/authenticate/${role}`; // role: "employer" || "applicant"
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to log in");
    }

    return response.json();
  });
};

// Register (permit all)
export const register = (credential, role) => {
  const registerUrl = `${domain}/register/${role}`; // role: "employer" || "applicant"
  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credential),
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to register");
    }
  });
};

// job controller (permit all)
export const getJobsByType = (job_type) => {
  const authToken = localStorage.getItem("authToken");
  const getJobsUrl = `${domain}/jobs/${job_type}`; // if (!job_type) return all jobs

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

export const getJobById = (job_ID) => {
  const authToken = localStorage.getItem("authToken");
  const getJobUrl = `${domain}/jobs/job_info/${job_ID}`;

  return fetch(getJobUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to find job");
    }
    return response.json();
  });
};

// employer controller (permit employer)
export const getJobsByEmployer = () => {
  const authToken = localStorage.getItem("authToken");
  const listJobsUrl = `${domain}/employer/jobs`;

  return fetch(listJobsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get job list");
    }

    return response.json();
  });
};

export const uploadJob = (data) => {
  const authToken = localStorage.getItem("authToken");
  const uploadJobUrl = `${domain}/employer/job`;
  // console.log(JSON.stringify(data));
  // console.log(data);

  return fetch(uploadJobUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    // body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to upload job");
    }
  });
};

export const getApplicationsByJob = (job_Id) => {
  const authToken = localStorage.getItem("authToken");
  const getApplicationsByJobUrl = `${domain}/employer/applications/${job_Id}`;

  return fetch(getApplicationsByJobUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get applications by job");
    }

    return response.json();
  });
};

export const hireApplicant = (application_ID) => {
  const authToken = localStorage.getItem("authToken");
  const hireApplicantUrl = `${domain}/employer/hire/${application_ID}`;

  return fetch(hireApplicantUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    //body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to update application status");
    }
  });
};

export const rateApplicant = (application_ID, rate) => {
  const authToken = localStorage.getItem("authToken");
  const rateApplicantUrl = `${domain}/employer/rate/${application_ID}/${rate}`;

  return fetch(rateApplicantUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    //body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to rate applicant");
    }
  });
};

export const closeJob = (job_ID) => {
  const authToken = localStorage.getItem("authToken");
  const closeJobUrl = `${domain}/employer/close/${job_ID}`;

  return fetch(closeJobUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    //body: data,
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to close job");
    }
  });
};

// application controller (permit applicant)
export const getApplications = () => {
  const authToken = localStorage.getItem("authToken");
  const listApplicationsUrl = `${domain}/applications`;

  return fetch(listApplicationsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get submitted applications");
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

// get recommendation based on skill (permit applicant)
export const getJobRecommendations = () => {
  const authToken = localStorage.getItem("authToken");
  const getRecommendedJobsUrl = `${domain}/recommendation`;
  return fetch(getRecommendedJobsUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get recommended jobs");
    }

    return response.json();
  });
};

// profile controller (permit applicant/employer)
export const getProfile = (email) => {
  const authToken = localStorage.getItem("authToken");
  const getProfileUrl = `${domain}/profile/${email}`;

  return fetch(getProfileUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (response.status !== 200) {
      throw Error("Failed to get profile");
    }

    return response.json();
  });
};

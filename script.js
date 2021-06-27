const FindJobButton = document.querySelector(".button-container");

const searchInput = document.getElementById("filter-job");

//Find the job button click

FindJobButton.addEventListener("click", () => {
  getJobs().then((jobs) => {
    let filteredJob = filterJobs(jobs, searchInput.value.toLowerCase());
    showJobs(filteredJob);
  });
});

const getJobs = () => {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      //       console.log(data);
      return data;
    });
};

const showJobs = (jobs) => {
  console.log(jobs);
  //jobContainer
  let jobContainer = document.querySelector(".jobs-container");
  let jobHtml = "";
  jobs.forEach((job) => {
    jobHtml += `

  <div class="job-tile">
    <div class="top">
      <img
	src="${job.logo}"
	alt=""
      />
      <span class="material-icons more_horiz">more_horiz</span>
    </div>
    <div class="rolename">
      <span>${job.roleName}</span>
    </div>
    <div class="description">
${job.requirements.content}
    </div>
    <!-- Button -->
    <div class="buttons">
      <div class="button btn-apply">Apply now</div>
      <div class="button btn-message">message</div>
    </div>
  </div>

`;
  });
  jobContainer.innerHTML = jobHtml;
};

getJobs().then((data) => showJobs(data));

//Filter jobs
const filterJobs = (jobs, searchText) => {
  if (searchText) {
    let filteredItems = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredItems;
  } else {
    return jobs;
  }
};

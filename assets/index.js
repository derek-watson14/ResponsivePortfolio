const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// * Github Data:
async function getRepoNames() {
  let userRepos = await $.ajax({
    url: `https://api.github.com/users/derek-watson14/repos?per_page=100`,
    method: "GET",
  });
  return userRepos;
}

async function getRepoCommits(repo, page = 1) {
  let commits = $.ajax({
    url: `https://api.github.com/repos/derek-watson14/${repo}/commits?per_page=100&author=derek-watson14&page=${page}`,
    method: "GET",
  });
  return commits;
}

const getDates = (commits) => {
  return commits.map(({ commit }) => {
    let date = commit.author.date.split("-");
    return `${date[0]}-${date[1]}`;
  });
};

async function getAllCommitDates() {
  const commitDates = [];
  const userRepos = await getRepoNames();
  const repoNames = userRepos.map((repo) => repo.name);

  for (const repo of repoNames) {
    const commits = await getRepoCommits(repo);
    commitDates.push(...getDates(commits));
    if (commits.length === 100) {
      const more = await getRepoCommits(repo, 2);
      commitDates.push(...getDates(more));
    }
  }

  return commitDates;
}

getAllCommitDates().then(function (data) {
  let tally = data.sort().reduce((tally, date) => {
    date = date.split("-");
    const displayFormat = `${months[date[1] - 1]} ${date[0]}`;
    tally[displayFormat] = (tally[displayFormat] || 0) + 1;
    return tally;
  }, {});

  // TODO Account for months with 0 commits on chart
  // TODO display indicator while loading

  let chartLabels = Object.keys(tally);
  let chartValues = Object.values(tally);

  // * Chart
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "Monthly Commits",
          data: chartValues,
          backgroundColor: "rgba(253, 198, 157, 0.2)",
          borderColor: "#ffe0b7",
          borderWidth: 1,
        },
      ],
    },
  });
});

let example = [
  "2020-06-17",
  "2020-06-17",
  "2020-06-17",
  "2020-06-17",
  "2020-06-17",
  "2020-06-17",
  "2020-06-17",
  "2020-06-17",
  "2020-06-16",
  "2020-06-15",
  "2020-06-11",
  "2020-06-11",
  "2020-06-11",
  "2020-06-29",
  "2020-06-27",
  "2020-06-27",
  "2020-06-27",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-26",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-25",
  "2020-06-24",
  "2020-06-24",
  "2020-06-24",
  "2020-06-24",
  "2020-06-24",
  "2020-06-23",
  "2020-06-23",
  "2020-06-22",
  "2020-06-22",
  "2020-06-11",
  "2019-07-22",
  "2019-07-19",
  "2019-07-19",
  "2019-07-19",
  "2019-07-18",
  "2019-07-18",
  "2019-07-18",
  "2019-07-18",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-16",
  "2019-07-03",
  "2019-07-03",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-28",
  "2019-06-27",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-20",
  "2019-06-17",
  "2019-06-15",
  "2019-06-15",
  "2019-06-15",
  "2019-06-15",
  "2019-06-15",
  "2019-06-15",
  "2019-06-12",
  "2019-06-12",
  "2019-06-12",
  "2019-06-11",
  "2019-06-11",
  "2019-06-11",
  "2019-06-11",
  "2019-06-11",
  "2019-06-11",
  "2019-06-11",
  "2019-06-11",
  "2019-06-02",
  "2019-06-02",
  "2019-06-02",
  "2019-06-02",
  "2019-06-01",
  "2019-06-01",
  "2019-06-01",
  "2019-06-01",
  "2019-06-01",
  "2019-06-01",
  "2019-06-01",
  "2019-05-28",
  "2019-03-04",
  "2020-06-11",
  "2019-03-04",
  "2019-03-04",
  "2020-06-08",
  "2020-06-03",
  "2020-06-03",
  "2020-06-03",
  "2020-06-11",
  "2019-04-14",
  "2019-11-27",
  "2019-11-27",
  "2019-11-27",
  "2019-11-27",
  "2019-11-27",
  "2019-11-27",
  "2019-11-27",
  "2019-11-27",
  "2019-11-12",
  "2020-06-13",
  "2020-06-12",
  "2020-06-11",
  "2020-06-11",
  "2020-06-11",
  "2020-06-11",
  "2020-06-11",
  "2020-05-31",
  "2020-05-31",
  "2020-05-31",
  "2020-05-31",
  "2019-12-15",
  "2019-12-15",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2019-12-12",
  "2020-06-11",
  "2019-04-18",
  "2019-04-17",
  "2019-04-15",
  "2019-04-14",
  "2019-04-12",
  "2019-04-12",
  "2019-04-10",
  "2019-04-09",
  "2019-04-08",
  "2019-04-07",
];

// // https://bl.ocks.org/sbrudz/ed6454e3d25640d19a41
// // * Returns sorted data in day bins
// let tally = example.sort().reduce((tally, date) => {
//   tally[date] = (tally[date] || 0) + 1;
//   return tally;
// }, {});

// let chartLabels = Object.keys(tally);
// let chartValues = Object.values(tally);

// console.log(tally, chartLabels, chartValues);

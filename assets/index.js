// ! IDEA:
// * My learning process in three charts:
// * 1. Git commit history
// * 2. Number of lines per language
// * 3. Coding Journey Timeline

// * Create empty bins
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
function loopMonths(start, stop, year, obj) {
  for (let j = start; j < stop; j++) {
    obj[`${months[j]} '${year}`] = 0;
  }
}
function createEmptyBins() {
  const bins = {};
  const d = new Date();
  const start = { year: 19, month: 2 };
  const current = { year: d.getFullYear() - 2000, month: d.getMonth() };
  for (let year = start.year; year <= current.year; year++) {
    switch (year) {
      case start.year:
        loopMonths(start.month, 12, year, bins);
        break;
      case current.year:
        loopMonths(0, current.month + 1, year, bins);
        break;
      default:
        loopMonths(0, 12, year, bins);
    }
  }
  return bins;
}

// * Get Github Data:
async function getRepoNames() {
  let userRepos = await $.ajax({
    url: `https://api.github.com/users/derek-watson14/repos?per_page=100`,
    method: "GET",
  });
  const repoNames = userRepos.map((repo) => repo.name);
  return repoNames;
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

async function getAllCommitDates(repoNames) {
  const commitDates = [];

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

async function getRawLanguageStats(repoName) {
  const repoStats = await $.ajax({
    url: `https://api.github.com/repos/derek-watson14/${repoName}/languages`,
    method: "GET",
  });
  return repoStats;
}

async function organizeCommitDates(repoNames) {
  const commitDates = await getAllCommitDates(repoNames);
  let dateTally = commitDates.sort().reduce((tally, date) => {
    date = date.split("-");
    const displayFormat = `${months[date[1] - 1]} '${date[0].slice(2)}`;
    tally[displayFormat] = (tally[displayFormat] || 0) + 1;
    return tally;
  }, createEmptyBins());
  const data = Object.values(dateTally);
  const labels = Object.keys(dateTally);
  return { data, labels };
}

async function getLanguageStats(repoNames) {
  const statsByRepo = {};
  const statsByLanguage = {};
  for (const repo of repoNames) {
    const repoStats = await getRawLanguageStats(repo);
    statsByRepo[repo] = repoStats;
  }
  for (const [key, value] of Object.entries(statsByRepo)) {
    if (!$.isEmptyObject(value)) {
      for (const [lang, amount] of Object.entries(value)) {
        if (statsByLanguage[lang]) {
          statsByLanguage[lang] += amount;
        } else {
          statsByLanguage[lang] = amount;
        }
      }
    }
  }
  const data = Object.values(statsByLanguage);
  const labels = Object.keys(statsByLanguage);
  return { data, labels };
}

// * Draw Charts
async function drawBarChart(repoNames) {
  const { data, labels } = await organizeCommitDates(repoNames);
  $("#commitsLoader").hide();
  var ctx = document.getElementById("commitsChart");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Monthly Commits",
          data,
          backgroundColor: "#4b6892",
          borderColor: "#fefefe",
          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        labels: {
          fontColor: "#f5f1e9",
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "#f5f1e9",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              fontColor: "#f5f1e9",
            },
          },
        ],
      },
    },
  });
}

async function drawPieChart(repoNames) {
  const { data, labels } = await getLanguageStats(repoNames);
  $("#languagesLoader").hide();
  var ctx = document.getElementById("languagesChart");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data,
          // https://www.sessions.edu/color-calculator-results/?colors=4b6892,fdc69d,adc872,92674b,9db8fd,c872ad
          backgroundColor: [
            "#4b6892",
            "#fdc69d",
            "#c872ad",
            "#adc872",
            "#9db8fd",
            "#92674b",
          ],
          label: "Languages",
        },
      ],
      labels,
    },
    options: {
      responsive: true,
      legend: {
        position: "left",
        align: "start",
        labels: {
          fontColor: "#f5f1e9",
        },
      },
    },
  });
}

async function displayGithubData() {
  const repoNames = await getRepoNames();

  drawPieChart(repoNames);
  drawBarChart(repoNames);
}

displayGithubData();

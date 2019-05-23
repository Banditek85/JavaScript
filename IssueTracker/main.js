// Array issue-jev, model
let issues = [];

// Konstruktor funkcija za izdelavo posameznih issue objektov
function Issue(title, severity, description) {
  this.title = title;
  this.severity = severity;
  this.description = description;
}

// Razred ki vsebuje util funkcije
class Utils {
  static storeIssue() {
    const form = document.querySelector("form");
    const issue = new Issue(
      form.elements["issue_title"].value,
      form.elements["issue_severity"].value,
      form.elements["issue_description"].value
    );
    issues.push(issue);
  }

  static displayIssues(arr) {
    const tbody = document.getElementsByTagName("tbody")[0];
    const count = document.getElementById("issue_count");
    const tbody_content = arr.map(issue => {
    return `<tr><td>${issue.title}</td>
            <td>${issue.description}</td>
            <td>${issue.severity}</td></tr>`;
    }).join("");
    tbody.innerHTML = tbody_content;
    count.innerHTML = issues.length;
  }
}

// Funkcija doda event listenerje DOM elementom
function addListeners() {
  document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    Utils.storeIssue();
    Utils.displayIssues(issues);
  });
}


// Page load
addListeners();
Utils.displayIssues(issues);
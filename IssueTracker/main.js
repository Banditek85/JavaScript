// Array issue-jev, model
let issues = [];

// Globalna DOM referenca za formo
const form = document.querySelector("form");

// Konstruktor funkcija za izdelavo posameznih issue objektov
function Issue(title, severity, description) {
  this.title = title;
  this.severity = severity;
  this.description = description;
}

// Razred ki vsebuje util funkcije
class Utils {
  static storeIssue() {
    const issue = new Issue(
      form.elements["issue_title"].value,
      form.elements["issue_severity"].value,
      form.elements["issue_description"].value
    );
    issues.push(issue);
  }

  static displayIssues(arr) {
    document.getElementsByTagName("tbody")[0].innerHTML = arr
      .map(issue => {
        return `<tr><td>${issue.title}</td>
                <td>${issue.description}</td>
                <td>${issue.severity}</td></tr>`;
      })
      .join("");

    document.getElementById("issue_count").innerHTML = issues.length;

    for (const element of form.elements) {
      if (
        element["id"] === "issue_title" ||
        element["id"] === "issue_description"
      ) {
        element.value = "";
      }
    }
  }

  static changeTab(tab_name) {
    const components = document.querySelector("#sub_container").children;
    const ul_tabs = document.querySelector(".nav.nav-tabs").children;

    for (const component of components) {
      if (component["id"] === tab_name) 
        component.style.display = "block";
      else component.style.display = "none";
    }

    for (let i = 0; i < ul_tabs.length; i++) {
      if (ul_tabs[i].textContent === tab_name)
        ul_tabs[i].classList.add("active");
      else ul_tabs[i].classList.remove("active");
    }
  }
}

// Funkcija doda event listenerje DOM elementom
function addListeners() {
  document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    Utils.storeIssue();
    Utils.displayIssues(issues);
  });

  document.querySelector(".nav.nav-tabs").addEventListener("click", e => {
    Utils.changeTab(e.target.textContent);
  });
}

// Page load
addListeners();
Utils.displayIssues(issues);

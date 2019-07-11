// Modela za issue-je in arhiv
let issues = [];
let archive = [];

// Globalna DOM referenca za formo
const form = document.querySelector("form");

// Konstruktor funkcija za izdelavo posameznih issue objektov
function Issue(title, severity, description) {
  this.title = title;
  this.severity = severity;
  this.description = description;
}

function drawTable(arr) {
  let result = "";
  arr.forEach(element => {
    let values = Object.values(element);
    let i_result = values.map(function (value) {
      return `<td>${value}</td>`;
    }).join("");
    result += `<tr>${i_result}</tr>`;
  });
  return result;
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
                <td>${issue.severity}</td>
                <td><span class='glyphicon glyphicon-trash'></span></td>
                <td><span class='glyphicon glyphicon-arrow-up'></span></td>
                </tr>`;
      }).join("");

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

  static archiveIssue(p_issue) {
    const table = document.getElementById("archive_tbody");
    const icon_str = "<span class='glyphicon glyphicon-trash'></span>";

    const now = new Date();

    const archived_issue = {
      issue: p_issue.issue,
      description: p_issue.description,
      severity: p_issue.severity,
      archived_at: now.toString(),
      delete: icon_str
    }
    archive.push(archived_issue);
    table.innerHTML = drawTable(archive);
  }

  static changeTab(tab_name) {
    const components = document.querySelector("#sub_container").children;
    const ul_tabs = document.querySelector(".nav.nav-tabs").children;

    for (const component of components) {
      if (component["id"] === tab_name) component.style.display = "block";
      else component.style.display = "none";
    }

    for (let i = 0; i < ul_tabs.length; i++) {
      if (ul_tabs[i].textContent === tab_name)
        ul_tabs[i].classList.add("active");
      else ul_tabs[i].classList.remove("active");
    }
  }

  static validate(form) {
    var valid = 1;
    console.log(valid);
    for (const input of form.elements) {
      if (!input.value && input.tagName === "INPUT") {
        input.classList.add("invalid");
        input.placeholder = "You must enter value here!";
        valid = 0;
      } else {
        input.classList.remove("invalid");
        input.placeholder = "";
      }
    }
    return valid;
  }
}

// Funkcija doda event listenerje DOM elementom
function addListeners() {
  document.querySelector("form").addEventListener("submit", e => {
    if (Utils.validate(form)) {
      e.preventDefault();
      Utils.storeIssue();
      Utils.displayIssues(issues);
    }
  });

  document.querySelector(".nav.nav-tabs").addEventListener("click", e => {
    Utils.changeTab(e.target.textContent);
  });

  document.getElementsByTagName("tbody")[0].addEventListener("click", function (event) {
    const clickedIndex = event.target.parentNode.parentNode.rowIndex - 1;

    if (event.target.classList.value.includes("trash")) {
      issues.splice(clickedIndex, 1);
      Utils.displayIssues(issues);

    } else if (event.target.classList.value.includes("arrow")) {

      const current_issue = issues[clickedIndex];

      Utils.archiveIssue(current_issue);
      issues.splice(clickedIndex, 1);
      Utils.displayIssues(issues);
    }
  });

  document.getElementById("archive_tbody").addEventListener("click", function (event) {
    const clickedIndex = event.target.parentNode.parentNode.rowIndex - 1;
    if (event.target.classList.value.includes("trash")) {
      archive.splice(clickedIndex, 1);
      this.innerHTML = drawTable(archive);
    }
  });
}


// Page load
addListeners();
Utils.displayIssues(issues);

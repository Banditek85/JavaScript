// Vhod funkcije je array objektov. Funkcija vrne string, ki se lahko uporabi kot innerHTML property za tbody DOM element (vrednosti ključev vsakega objekta v arrayu).
function drawTable(arr) {

  // Pripravimo result string
  let result = "";

  // Procesiramo array objektov in izvlečemo vrednosti za vsak objekt posebej. Vrednosti wrappamo v <tr> element.
  arr.forEach(element => {
    let values = Object.values(element);
    let i_result = values.map(function(value) {
        return `<td>${value}</td>`;
      }).join("");
    result += `<tr>${i_result}</tr>`;
  });

  console.log(result);
  return result;
}

let mock = [
  {
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "BODY 1"
  },
  {
    "id": 2,
    "title": "qui est esse",
    "body": "BODY 2"
  },
  {
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "BODY 3"
  }
];

let tbody = document.getElementById("tbody");

tbody.innerHTML = drawTable(mock);

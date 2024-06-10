apiURL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events`;

const getEventsAPI = async () => {
  try {
    const data = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events`
    );
    const response = await data.json();
    const displayed = response.data;
    printResults(displayed);
    return displayed;
  } catch (error) {
    console.log(error.message);
  }
};

const printResults = (displayed) => {
  const body = document.querySelector("body");
  displayed.forEach((element) => {
    const h1 = document.createElement("h1");
    h1.textContent = element.name;
    body.append(h1);
    const description = document.createElement("p");
    description.textContent = `Description: ${element.description}`;
    body.append(description);
    const date = document.createElement("p");
    date.textContent = `Date: ${element.date}`;
    body.append(date);
    const location = document.createElement("p");
    location.textContent = `Location: ${element.location}`;
    body.append(location);
    const deleteButton = document.createElement("div");
    deleteButton.innerHTML = `<button class = "remove-button" data-id="${element.id}">Delete</button>`;
    body.append(deleteButton);
    deleteButton.addEventListener("click", () => deleteParty(element.id));
  });
};

// delete button

const deleteParty = async (id) => {
  try {
    const response = await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      console.log("test");
      function refreshPage() {
        window.location.reload();
      }
      refreshPage();
      getEventsAPI();
    } else {
      console.error(error.message, await response.text());
    }
  } catch (error) {
    "error", error;
  }
};

// submit button

const thisForm = document.getElementById("myForm");

const handleSubmit = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  let date = new Date(document.getElementById("date").value);
  date = date.toISOString();
  const location = document.getElementById("location").value;

  const rawData = {
    name: name,
    description: description,
    date: date,
    location: location,
  };
  console.log(rawData);

  const response = await fetch(
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawData),
    }
  );

  const result = await response.json();
  console.log(result);
  getEventsAPI();
};

thisForm.addEventListener("submit", handleSubmit);

getEventsAPI();

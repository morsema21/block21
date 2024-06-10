const init = async () => {
  const url = window.location.href;
  const arr = url.split("#");
  console.log(arr[1]);
  try {
    const data = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events/${arr[1]}`
    );
    const resonse = await data.json();
    showData(response);
  } catch (error) {
    console.log(error.message);
  }
};

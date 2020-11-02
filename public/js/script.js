const url = `${window.location.origin}`;

fetch(`${url}/garageGeo`, {
  method: 'POST',
})
    .then((response) => response.json())
    .then((data) => (console.log(data)));

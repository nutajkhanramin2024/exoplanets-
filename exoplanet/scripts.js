document.getElementById("fetchData").addEventListener("click", () => {
  const exoplanetData = document.getElementById("exoplanetData");
  exoplanetData.innerHTML = "<p>Loading...</p>"; // Loading message

  fetch(
    "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&format=json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the full response data
      exoplanetData.innerHTML = "<h3>Exoplanet Data</h3>";
      data.slice(0, 10).forEach((planet) => {
        const planetInfo = document.createElement("div");
        planetInfo.innerHTML = `
  <p><strong>Name:</strong> ${planet.someNestedProperty.pl_name || "N/A"}</p>
  <p><strong>Discovery Method:</strong> ${
    planet.someNestedProperty.discoverymethod || "N/A"
  }</p>
  <p><strong>Orbital Period:</strong> ${
    planet.someNestedProperty.pl_orbper
      ? planet.someNestedProperty.pl_orbper + " days"
      : "N/A"
  }</p>
`;
        exoplanetData.appendChild(planetInfo);
      });
    })

    .catch((error) => {
      exoplanetData.innerHTML = "<p>Error fetching data. Please try again.</p>";
      console.error("Error fetching data:", error);
    });
});

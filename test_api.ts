async function testSearch() {
  const query = "developer";
  const url = `http://localhost:3000/api/jobs/search?q=${query}`;
  console.log(`Testing API at: ${url}`);
  try {
    const response = await fetch(url);
    console.log(`Status: ${response.status}`);
    const data = await response.json();
    console.log("Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testSearch();
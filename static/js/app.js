<script src="https://d3js.org/d3.v7.min.js"></script>
function fetchData() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
      // Handle the fetched data here
      console.log(data); // For debugging, log the data to the console
    }).catch(function(error) {
      console.error("Error fetching data:", error);
    });
  }
  fetchData(); // Call this function to fetch the data
  function fetchData() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {
      // Handle the fetched data here
      console.log(data); // For debugging, log the data to the console
      
      // You can perform further data processing and visualization here
    }).catch(function(error) {
      console.error("Error fetching data:", error);
    });
  }
   
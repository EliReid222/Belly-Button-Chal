function fetchData() {
  d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
    .then(function (data) {
      // Fetched data here
      console.log(data); // For debugging

      // Sample IDs and data available
      const dropdown = document.getElementById("selDataset");
      const sampleIds = data.names; 

      sampleIds.forEach((sampleId, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.text = sampleId; // Dropdown text
        dropdown.appendChild(option);
      });

      // Function to initialize the bar chart
      function initBarChart(sampleIndex) {
        // Retrieve data for the selected sample using the index
        const selectedSample = data.samples[sampleIndex];

        // Sort the data to get the top 10 OTUs
        const sortedData = selectedSample.sample_values
          .map((value, index) => ({
            value,
            id: selectedSample.otu_ids[index],
            label: selectedSample.otu_labels[index],
          }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10); // Get the top 10

        // Create a horizontal bar chart using Plotly
        const trace = {
          x: sortedData.map((item) => item.value),
          y: sortedData.map((item) => `OTU ${item.id}`),
          text: sortedData.map((item) => item.label),
          type: "bar",
          orientation: "h",
        };

        const layout = {
          title: "Top 10 OTUs",
        };

        Plotly.newPlot("bar", [trace], layout);
      }

      // Event listener for dropdown change
      dropdown.addEventListener("change", function () {
        const selectedSampleIndex = parseInt(dropdown.value);
        initBarChart(selectedSampleIndex);
        initBubbleChart(selectedSampleIndex);
        displaySampleMetadata(selectedSampleIndex);
      });

      // Function to initialize the bubble chart
      function initBubbleChart(sampleIndex) {
        // Retrieve data for the selected sample using the index
        const selectedSample = data.samples[sampleIndex];

        // Create the bubble chart using Plotly
        const trace = {
          x: selectedSample.otu_ids,
          y: selectedSample.sample_values,
          text: selectedSample.otu_labels,
          mode: 'markers',
          marker: {
            size: selectedSample.sample_values,
            color: selectedSample.otu_ids,
            colorscale: 'Viridis', //
            opacity: 0.7,
          },
        };

        const layout = {
          title: 'Bubble Chart for Sample',
          xaxis: { title: 'OTU IDs' },
          yaxis: { title: 'Sample Values' },
        };

        Plotly.newPlot('bubble', [trace], layout);
      }

      // Function to display sample metadata
      function displaySampleMetadata(sampleIndex) {
        // Retrieve metadata for the selected sample using the index
        const selectedMetadata = data.metadata[sampleIndex];

        // Select the HTML element where you want to display the metadata
        const metadataDisplay = document.getElementById("sample-metadata");

        // Clear any existing content in the element
        metadataDisplay.innerHTML = "";

        // Loop through the metadata object and create HTML elements for each key-value pair
        for (const key in selectedMetadata) {
          if (selectedMetadata.hasOwnProperty(key)) {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${key}:</strong> ${selectedMetadata[key]}`;
            metadataDisplay.appendChild(p);
          }
        }
      }

      // Call functions to initialize charts and metadata for the first sample
      initBarChart(0);
      initBubbleChart(0);
      displaySampleMetadata(0);

    }).catch(function (error) {
      console.error("Error fetching data:", error);
    });
}

fetchData();

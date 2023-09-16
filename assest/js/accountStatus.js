document.addEventListener("DOMContentLoaded", async () => {
  // Sample userCreatedAt date in the format "YYYY-MM-DD"
  const user = JSON.parse(localStorage.getItem("user"));
  // const userCreatedAt = "2022-05-15";
  const userCreatedDate = new Date(user.fechaCuenta);
  console.log("userCreatedDate=", userCreatedDate);

  const currentDate = new Date();

  // Months array in Spanish
  const months = [
    "Seleccione",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  // Get the select element by its ID
  const monthSelect = document.getElementById("month-select");

  // Clear existing options
  while (monthSelect.firstChild) {
    monthSelect.removeChild(monthSelect.firstChild);
  }

  // Add "Seleccione" as the default option
  let defaultOption = document.createElement("option");
  defaultOption.value = "00";
  defaultOption.innerHTML = "Seleccione";
  monthSelect.appendChild(defaultOption);

  // Dynamically generate month options
  for (
    let year = userCreatedDate.getFullYear();
    year <= currentDate.getFullYear();
    year++
  ) {
    for (let month = 1; month <= 12; month++) {
      // Skip months before the user's creation month in the starting year
      if (
        year === userCreatedDate.getFullYear() &&
        month < userCreatedDate.getMonth() + 1
      ) {
        continue;
      }
      // Stop at the month just before the current month
      if (
        year === currentDate.getFullYear() &&
        month > currentDate.getMonth() + 1
      ) {
        break;
      }

      let option = document.createElement("option");
      option.value = month.toString().padStart(2, "0"); // Pads single-digit months with a zero
      option.innerHTML = months[month];
      monthSelect.appendChild(option);
    }
  }
});

document
  .getElementById("download-button")
  .addEventListener("click", downloadPdf);

document.getElementById("print-button").addEventListener("click", openPdf);

async function downloadPdf() {
  const selectedMonth = document.getElementById("month-select").value;

  // Exit if "Seleccione" option is chosen
  if (selectedMonth === "00") {
    return alert("Seleccione un mes para descargar");
  }

  // Use current year
  const currentYear = new Date().getFullYear();

  try {
    const response = await axiosInstance.get("/statements", {
      params: {
        year: currentYear,
        month: selectedMonth,
      },
      responseType: "blob",
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create an Object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create an anchor element and set its attributes, then programmatically click it to download the PDF
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "statements.pdf"); // The download attribute specifies that the link is to be used for downloading a resource
    document.body.appendChild(link);
    link.click();

    // Remove the anchor element from the DOM
    document.body.removeChild(link);

    // Revoke the Object URL to free up resources
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("An error occurred while fetching the statements:", error);
  }
}

async function openPdf() {
  const selectedMonth = document.getElementById("month-select").value;

  // Exit if "Seleccione" option is chosen
  if (selectedMonth === "00") {
    return alert("Seleccione un mes para descargar");
  }

  // Use current year
  const currentYear = new Date().getFullYear();

  try {
    const response = await axiosInstance.get("/statements", {
      params: {
        year: currentYear,
        month: selectedMonth,
      },
      responseType: "blob",
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: "application/pdf" });

    // Create an Object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Open a new window
    const newWindow = window.open();

    // Check if the new window is created successfully (could be blocked by pop-up blockers)
    if (newWindow) {
      // Create an iframe element to embed the PDF
      const iframe = document.createElement("iframe");

      // Set iframe attributes
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.src = url;

      // Append iframe to the new window's document body
      newWindow.document.body.appendChild(iframe);

      // Revoke the Object URL to free up resources
      window.URL.revokeObjectURL(url);
    } else {
      console.error(
        "Could not open a new window. It might be blocked by pop-up blockers."
      );
    }
  } catch (error) {
    console.error("An error occurred while fetching the statements:", error);
  }
}

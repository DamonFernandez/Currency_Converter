// Part 6: Currency Conversion Using an External API

// Selects elements related to the currency conversion section
let currencySection = document.getElementsByTagName("main")[0];
let currencyFormButton = currencySection.getElementsByTagName("button")[0];
let amtToConvertElement = currencySection.getElementsByTagName("input")[0];
let currencyToConvertFromElement =
  currencySection.getElementsByTagName("select")[0];
let currencyToConvertToElement =
  currencySection.getElementsByTagName("select")[1];
let currencyOutput = currencySection.getElementsByTagName("output")[0];

// Function to handle fetch response errors
let handleErrors = (response) => {
  if (response.ok == true) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

// Asynchronously fetches conversion rates from the Free Currency API for the specified base and target currencies
let validateForm = (currencyToConvertFrom, currencyToConvertTo) => {
  if (
    amtToConvertElement.value.trim() != "" &&
    isNaN(Number(amtToConvertElement.value.trim())) == false &&
    currencyToConvertFrom != "none" &&
    currencyToConvertTo != "none" &&
    currencyToConvertTo != currencyToConvertFrom
  ) {
    return true;
  } else {
    alert(
      "That was not a valid input. Please ensure that you choose an base currency, and an currency to convert to that are different, and enter an amount of the base currency"
    );

    return false;
  }
};

// Asynchronously ftches conversion rates from the Free Currency API for the specified base and target currencies
let getData = async (currencyToConvertTo, baseCurrency) => {
  const currencyKey = "fca_live_NVYE6p0UwZ1oAGUDUkljE0QbXXPSeYkpHBnxKjOH";
  const requestUrl = "https://api.freecurrencyapi.com/v1/latest";
  const responseObject = await fetch(
    `${requestUrl}?apikey=${currencyKey}&base_currency=${baseCurrency}&currencies=${currencyToConvertTo}`
  );
  return responseObject;
};
// Calculates the converted amount using the fetched rate
let convertCurrency = (rates, currencyToConvertTo, amt) => {
  const rate = rates.data[currencyToConvertTo]; // Extracts the conversion rate
  let finalResult = rate * amt; // Calculates the converted amount
  return finalResult.toFixed(2); // Returns the result formatted to two decimal places
};

// Adds click event listener to the currency form button
currencyFormButton.addEventListener("click", () => {
  let currencyToConvertFrom = currencyToConvertFromElement.value;
  let currencyToConvertTo = currencyToConvertToElement.value;
  // Validates form inputs before proceeding with the currency conversion
  if (validateForm(currencyToConvertFrom, currencyToConvertTo)) {
    getData(currencyToConvertTo, currencyToConvertFrom)
      .then(handleErrors) // Handles any errors in the fetch request
      .then((data) => {
        let currenciesObject = data;
        // Updates the currencyOutput element with the converted amount
        currencyOutput.textContent = `$${convertCurrency(
          currenciesObject,
          currencyToConvertTo,
          amtToConvertElement.value
        )}  ${currencyToConvertTo}`;
      })
      .catch((error) => {
        console.log(error.message); // Logs any errors to the console
      });
  }
});

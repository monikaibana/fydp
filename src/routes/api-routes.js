var apigClientFactory = require("aws-api-gateway-client").default;

var apigClient = apigClientFactory.newClient({
  invokeUrl: process.env.REACT_APP_BASE_URL,
  region: "us-east-1",
  accessKey: process.env.REACT_APP_ACCESS_KEY,
  secretKey: process.env.REACT_APP_SECRET_KEY
});

export default function createPatient(body) {
  var params = {};
  var pathTemplate = "";
  var method = "POST";
  var additionalParams = {};
  apigClient
    .invokeApi(params, pathTemplate, method, additionalParams, body)
    .then(function(result) {
      console.log("Patient saved.");
    })
    .catch(function(result) {
      console.log(result);
      alert("Error with saving patient, please try again later.");
    });
}

export function getPatientList(body, callback) {
  var params = {};
  var pathTemplate = "";
  var method = "POST";
  var additionalParams = {};
  apigClient
    .invokeApi(params, pathTemplate, method, additionalParams, body)
    .then(function(result) {
      console.log("Patient list retrieved.");
      return callback(result.data);
    })
    .catch(function(result) {
      console.log(result);
      alert("Error with retrieving patient list, please try again later.");
    });
}

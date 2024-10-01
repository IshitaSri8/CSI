import axios from "axios";
 
// Updated model to include email, phone number, state, and city
const jsonModel = ["name", "email", "phone", "state", "city"];
 
const convertToJson = (details) => {
  const json = {};
  for (let i = 0; i < details.length; i++) {
    const key = jsonModel[i];
    const value = details[i];
    json[key] = value;
  }
  return json;
};
 
const sendClientDetails = async (clientDetails) => {
  try {
    // Convert details into JSON structure
    const data = convertToJson(clientDetails);
    await axios.post("http://localhost:8009/clientDetails/save", data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
 
export default sendClientDetails;
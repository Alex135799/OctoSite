import axios from "axios";

export default axios.create({
  baseURL: "https://k301suduv8.execute-api.us-east-1.amazonaws.com/default",
  responseType: "json"
});


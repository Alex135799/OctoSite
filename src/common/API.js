import axios from "axios";

let apiGatewayUrl = "";
let cognitoAuthBase = "https://smellyoctopus.auth.us-east-1.amazoncognito.com/login?"
let cognitoAuthQueryParams = "client_id=6m4jqicvparrk3i6q637tihotm&response_type=code&scope=email+https://smellyoctopus.com/ooglop-bot.queue.session.create+openid+profile&";
let cognitoAuthCallbackUrl = "redirect_uri=https://smellyoctopus.com/callback";
let cognitoUrl = cognitoAuthBase + cognitoAuthQueryParams + cognitoAuthCallbackUrl;
export default axios.create({
  baseURL: "https://k301suduv8.execute-api.us-east-1.amazonaws.com/default",
  responseType: "json"
});


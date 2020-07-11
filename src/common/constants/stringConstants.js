export var queueEmptyString = "No Entries In Queue...";
export var queueLoadingString = "Loading Queue...";
export var queueNoSessionString = "Currently no open sessions...";

let cognitoAuthBase = "https://smellyoctopus.auth.us-east-1.amazoncognito.com/login?"
let cognitoAuthQueryParams = "client_id=6m4jqicvparrk3i6q637tihotm&response_type=token&scope=email+openid+profile&";
let cognitoAuthCallbackUrl = "redirect_uri=https://smellyoctopus.com/login";
export var cognitoUrl = cognitoAuthBase + cognitoAuthQueryParams + cognitoAuthCallbackUrl;

export var backendUrl = "https://k301suduv8.execute-api.us-east-1.amazonaws.com/default/";

export var userCookieName = "octosite.ooglopbot.user"
export var queueSessionCookieName = "octosite.ooglopbot.queue.session"
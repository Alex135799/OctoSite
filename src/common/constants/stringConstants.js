export var queueEmptyString = "No Entries In Queue... (Try refreshing)";
export var queueLoadingString = "Loading Queue...";
export var queueNoSessionString = "Currently no open sessions... (Try refreshing)";
export var queueLoadingSessionsString = "Loading sessions...";

let cognitoAuthBase = "https://smellyoctopus.auth.us-east-1.amazoncognito.com/login?"
let cognitoAuthQueryParams = "client_id=6m4jqicvparrk3i6q637tihotm&response_type=token&scope=email+openid+profile&";
let cognitoAuthCallbackUrl = "redirect_uri=http://localhost:3000/login";
export var cognitoUrl = cognitoAuthBase + cognitoAuthQueryParams + cognitoAuthCallbackUrl;

export var websocketUrl = "wss://0vwmevfi0j.execute-api.us-east-1.amazonaws.com/default";

export var backendUrl = "https://k301suduv8.execute-api.us-east-1.amazonaws.com/default/";

export var userCookieName = "octosite.ooglopbot.user"
export var queueSessionCookieName = "octosite.ooglopbot.queue.session"

export var octoUserId = "8f984c99-3c16-4394-9503-1f20567b224a";
export var octoChannelId = "smellyoctopus";
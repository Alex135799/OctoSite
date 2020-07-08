export var queueSessionLoadingString = "Loading data...";

let cognitoAuthBase = "https://smellyoctopus.auth.us-east-1.amazoncognito.com/login?"
let cognitoAuthQueryParams = "client_id=6m4jqicvparrk3i6q637tihotm&response_type=token&scope=email+https://smellyoctopus.com/ooglop-bot.queue.session.create+openid+profile&";
let cognitoAuthCallbackUrl = "redirect_uri=http://localhost:3000/login";

export var cognitoUrl = cognitoAuthBase + cognitoAuthQueryParams + cognitoAuthCallbackUrl;

export var userCookieName = "octosite.ooglopbot.user"
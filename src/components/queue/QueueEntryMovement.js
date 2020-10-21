import Axios from "axios";
import { backendUrl } from "../../common/constants/stringConstants";

export async function activateEntry(entryList, inactiveList, entry, entryIndex, activeStatus, queueActions) {
  let timeEntered = entry.createdAt;
  let sessionId = entry.sessionId;
  let patchInfo = { "active": activeStatus };
  try {
    await Axios.patch(backendUrl + "queue/entry/" + sessionId + "/" + timeEntered, JSON.stringify(patchInfo));
    queueActions.moveEntry(entryList, inactiveList, entry, entryIndex, activeStatus);
  } catch (error) {
    if (!error.response) {
      console.error(JSON.stringify(error));
    } else {
      queueActions.addSessionError(error.response.data);
    }
  }
}
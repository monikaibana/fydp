import * as moment from "moment";

export default function getDefaultValues(item) {
  console.log(moment("2020-01-01", "YYYY-MM-DD"));
  return {
    surname: item.surname || null,
    givenName: item.givenName || null,
    id: item.id,
    dob: item.dob.replace(/^(\d\d\d\d)-(\d\d)-(\d\d)$/g, "$3/$2/$1"),
    gender: item.gender,
    triageResult: item.triageResult ? item.triageResult.toString() : undefined,
    priority: item.priority ? item.priority.toString() : undefined,
    notes: item.notes,
    appDate: item.appDate ? moment(item.appDate, "YYYY-MM-DD") : undefined,
    appBooked: item.appBooked,
    nextAppDate: item.nextAppDate
      ? moment(item.nextAppDate, "YYYY-MM-DD")
      : null,
    appType: item.appType ? item.appType.toString() : undefined,
    acqTech: item.acqTech ? item.acqTech.toString() : undefined,
    location: item.location ? item.location.toString() : undefined,
    acq: item.acq,
    scoringTech: item.scoringTech ? item.scoringTech.toString() : undefined,
    scoringDate: item.scoringDate
      ? moment(item.scoringDate, "YYYY-MM-DD")
      : null,
    ahi: item.ahi,
    remahi: item.remahi,
    studyScore: item.studyScore ? item.studyScore.toString() : undefined,
    studyTag: item.studyTag ? item.studyTag.toString() : undefined,
    studyLink: item.studyLink,
    refPhysician: item.refPhysician,
    interDoctor: item.interDoctor ? item.interDoctor.toString() : undefined,
    interDate: item.interDate
      ? moment(item.interDate, "YYYY-MM-DD")
      : undefined,
    interRating: item.interRating ? item.interRating.toString() : undefined,
    urgentActionRequired: item.urgentActionRequired,
    comments: item.comments,
    reportDate: item.reportDate
      ? moment(item.reportDate, "YYYY-MM-DD")
      : undefined,
    billed: item.billed,
    status: item.status ? item.status.toString() : undefined
  };
}

export function getPatientId(url) {
  var splitUrl = url.split("/");
  return parseInt(splitUrl[4]);
}

export function getTimeInStatus(item) {
  var lastUpdated = "";
  for (var k = 13; k > 0; k--) {
    var timeVar = "time_" + k.toString();
    if (item[timeVar]) {
      lastUpdated = item[timeVar];
      break;
    }
  }
  const today = new Date();
  const updateDate = new Date(lastUpdated);
  var one_day = 1000 * 60 * 60 * 24;
  var timeInStatus = (today.getTime() - updateDate.getTime()) / one_day;
  if (isNaN(timeInStatus)) {
    return null;
  } else {
    return Math.floor(timeInStatus) - 1;
  }
}

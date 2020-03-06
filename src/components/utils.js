import * as moment from "moment";

export default function getDefaultValues(item) {
  return {
    surname: item.surname || null,
    givenName: item.givenName || null,
    pid: item.id,
    dob: item.dob.replace(/^(\d\d\d\d)-(\d\d)-(\d\d)$/g, "$3/$2/$1"),
    gender: item.gender,
    triageResult: item.triageResult ? item.triageResult.toString() : undefined,
    priority: item.priority ? item.priority.toString() : undefined,
    notes: item.notes,
    appDate: item.appDate ? moment(item.appDate, "YYYY-MM-DD") : undefined,
    appBooked: item.appBooked,
    nextAppDate: item.nextAppDate
      ? moment(item.nextAppDate, "YYYY-MM-DD")
      : undefined,
    appType: item.appType ? item.appType.toString() : undefined,
    acqTech: item.acqTech ? item.acqTech.toString() : undefined,
    location: item.location ? item.location.toString() : undefined,
    acq: item.acq,
    scoringTech: item.scoringTech ? item.scoringTech.toString() : undefined,
    scoringDate: item.scoringDate
      ? moment(item.scoringDate, "YYYY-MM-DD")
      : undefined,
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
    var days = Math.floor(timeInStatus);
    if (days === 0) {
      return days;
    } else {
      return days - 1;
    }
  }
}

function formatValues(item) {
  if (item.acqTech) {
    item.acqTech = parseInt(item.acq);
  }
  if (item.appDate) {
    item.appDate = item.appDate.format("YYYY-MM-DD");
  }
  if (item.dob) {
    item.dob = item.dob.replace(/^(\d\d)\/(\d\d)\/(\d\d\d\d)$/g, "$3-$2-$1");
  }
  if (item.interDate) {
    item.interDate = item.interDate.format("YYYY-MM-DD");
  }
  if (item.interDoctor) {
    item.interDoctor = parseInt(item.interDoctor);
  }
  if (item.interRating) {
    item.interRating = parseInt(item.interRating);
  }
  if (item.location) {
    item.location = parseInt(item.location);
  }
  if (item.nextAppDate) {
    item.nextAppDate = item.nextAppDate.format("YYYY-MM-DD");
  }
  if (item.priority) {
    item.priority = parseInt(item.priority);
  }
  if (item.reportDate) {
    item.reportDate = item.reportDate.format("YYYY-MM-DD");
  }
  if (item.scoringDate) {
    item.scoringDate = item.scoringDate.format("YYYY-MM-DD");
  }
  if (item.scoringTech) {
    item.scoringTech = parseInt(item.scoringTech);
  }
  if (item.status) {
    item.status = parseInt(item.status);
  }
  if (item.studyScore) {
    item.studyScore = parseInt(item.studyScore);
  }
  if (item.studyTag) {
    item.studyTag = parseInt(item.studyTag);
  }
  if (item.triageResult) {
    item.triageResult = parseInt(item.triageResult);
  }
  return item;
}

export function getExpressionValues(values) {
  var exportArr = {};
  const arr = removeUndefinedValues(values);
  const formattedAttrNames = Object.keys(arr);
  const formattedAttrValues = Object.values(formatValues(arr));
  if (formattedAttrNames.length === formattedAttrValues.length) {
    for (var j = 0; j < formattedAttrNames.length; j++) {
      exportArr[`:${formattedAttrNames[j]}`] = formattedAttrValues[j];
    }
  }
  return exportArr;
}

function removeUndefinedValues(values) {
  var arr = {};
  const attrNames = Object.keys(values);
  const attrValues = Object.values(values);
  if (attrNames.length === attrValues.length) {
    for (var i = 0; i < attrNames.length; i++) {
      if (attrValues[i] !== undefined) {
        arr[attrNames[i]] = attrValues[i];
      }
    }
  }
  return arr;
}

export function getUpdateExpression(values) {
  const arr = removeUndefinedValues(values);
  var expression = "set ";
  const attrNames = Object.keys(arr);
  for (var i = 0; i < attrNames.length; i++) {
    if (attrNames[i] === "status") {
      if (i === 0) {
        expression = expression.concat("#st = :status");
      } else {
        expression = expression.concat(", #st = :status");
      }
    } else if (attrNames[i] === "location") {
      if (i === 0) {
        expression = expression.concat("#loc = :location");
      } else {
        expression = expression.concat(", #loc = :location");
      }
    } else {
      if (i === 0) {
        expression = expression.concat(attrNames[i] + " = :" + attrNames[i]);
      } else {
        expression = expression.concat(
          ", " + attrNames[i] + " = :" + attrNames[i]
        );
      }
    }
  }
  return expression;
}

export function getExpressionNames(values) {
  var exportArr = {};
  const arr = removeUndefinedValues(values);
  const attrNames = Object.keys(arr);
  for (var i = 0; i < attrNames.length; i++) {
    if (attrNames[i] === "status") {
      exportArr["#st"] = "status";
    }
    if (attrNames[i] === "location") {
      exportArr["#loc"] = "location";
    }
  }
  return exportArr;
}

import axios from "axios";
import {hasId, Report, ReportQuery, ReportQueryState, Source, Tag, VeracityOptions} from "../../objectTypes";

export const getReports = async (searchState: ReportQueryState, tagIds: hasId[] | string[] = [], isRelevantReports = false) => {
  if (generateReportsSearchURL(searchState, tagIds, isRelevantReports) != "") {
    const { data } = await axios.get('/api/report?' + generateReportsSearchURL(searchState, tagIds, isRelevantReports));
    return data;
  } else {
    const { data } = await axios.get('/api/report');
    return data;
  }
}

export const getReport = async (id: string | undefined) => {
  if (id) {
    const {data} = await axios.get('/api/report/' + id);
    return data;
  }
}

export const editReport = async (report: Report) => {
  const { data } = await axios.put('/api/report/' + report._id, report);
  return data;
}

export const getBatch = async () => {
  const { data } = await axios.get('/api/report/batch');
  return data;
}

export const getNewBatch = async () => {
  const { data } = await axios.patch('/api/report/batch');
  return data;
}

export const cancelBatch = async () => {
  const { data } = await axios.put('/api/report/batch');
  return data;
}

export const setSelectedRead = async (reportIds: string[], read = true) => {
  const response = await axios.patch('/api/report/_read', {ids: reportIds, read: read});
  return response;
}

export const setSelectedVeracity = async (reportIds: string[], veracity: VeracityOptions | string ) => {
  const { data } = await axios.patch('/api/report/_veracity', {ids: reportIds, veracity: veracity});
  return data;
}

export const setSelectedNotes = async (reportIds: string[], notes: string) => {
  const { data } = await axios.patch('/api/report/_notes', {ids: reportIds, notes: notes});
  return data;
}

export const setSelectedEscalated = async (reportIds: string[], escalated: boolean) => {
  const { data } = await axios.patch('/api/report/_escalated', {ids: reportIds, escalated: escalated});
  return data;
}

export const setSelectedTags = async (reportIds: string[], tagIds: hasId[]) => {
  const { data } = await axios.patch('/api/report/_tags', {ids: reportIds, tags: tagIds});
  return data;
}

export const setSelectedGroup = async (reportIds: string[], groupId: hasId | null) => {
  const { data } = await axios.patch('/api/report/_group', {ids: reportIds, group: groupId});
  return data;
}

const generateReportsSearchURL = (searchState: ReportQueryState, tagIds: hasId[] | string[], isRelevantReports: boolean ) => {
  // Writing this method because the readability of the API call url is much less readable than the page URL.
  let url = "";
  if (isRelevantReports) {
    url += "isRelevantReports=true";
  }
  if (tagIds.length > 0) {
    let tagsURL = "";
    tagIds.forEach((tagId)=> {
      if (typeof(tagId) === "string") {
        tagsURL += (tagId + ",");
      } else {
        tagsURL += (tagId._id + ",");
      }
    });
    tagsURL = tagsURL.slice(0, -1);
    if (url === "") url += "tags=" + tagsURL;
    else url += "&tags=" + tagsURL;
  }
  if (searchState.keywords) {
    if (url === "") url += "keywords=" + searchState.keywords;
    else url += "&keywords=" + searchState.keywords;
  }
  if (searchState.author) {
    if (url === "") url += "author=" + searchState.author;
    else url += "&author=" + searchState.author;
  }
  if (searchState.groupId) {
    if (url === "") url += "groupId=" + searchState.groupId;
    else url += "&groupId=" + searchState.groupId;
  }
  if (searchState.media) {
    if (url === "") url += "media=" + searchState.media;
    else url += "&media=" + searchState.media;
  }
  if (searchState.sourceId) {
    if (url === "") url += "sourceId=" + searchState.sourceId;
    else url += "&sourceId=" + searchState.sourceId;
  }
  if (searchState.list) {
    if (url === "") url += "list=" + searchState.list;
    else url += "&list=" + searchState.list;
  }
  if (searchState.before) {
    if (url === "") url += "before=" + searchState.before;
    else url += "&before=" + searchState.before;
  }
  if (searchState.after) {
    if (url === "") url += "after=" + searchState.after;
    else url += "&after=" + searchState.after;
  }
  if (searchState.page) {
    if (url === "") url += "page=" + searchState.page;
    else url += "&page=" + searchState.page;
  }
  return url;
}
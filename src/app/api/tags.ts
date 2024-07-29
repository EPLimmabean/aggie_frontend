import axios from "axios";
import {Tag, TagEditableData} from "../../objectTypes";

export const getTags = async () => {
  return await axios.get('/api/tag');
}

export const newTag = async (tag: TagEditableData) => {
  return await axios.post('/api/tag/', tag);
}

export const editTag = async (tag: TagEditableData) => {
  return await axios.put('/api/tag/' + tag._id, tag);
}

export const deleteTag = async (tag: Tag) => {
  return await axios.delete('/api/tag/' + tag._id);
}
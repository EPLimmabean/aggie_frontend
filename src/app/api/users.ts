import axios from "axios";
import {User} from "../../objectTypes";
import {UserEditableData} from "../../objectTypes";

export const getUsers = async () => {
  return await axios.get('/api/user');
}

export const getUser = async (id: string) => {
  return await axios.get('/api/user/' + id);
}

// We use UserEditableData because we don't actually pass a full user object when creating one.
export const newUser = async (user: UserEditableData) => {
  return await axios.post('/api/user/', user);
}

// We use UserEditableData because we don't actually pass a full user object when editing one.
export const editUser = async (user: UserEditableData) => {
  return await axios.put('/api/user/' + user._id, user);
}

export const deleteUser = async (user: User) => {
  return await axios.delete('/api/user/' + user._id);
}
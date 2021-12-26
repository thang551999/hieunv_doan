import axios from "axios";
const baseURL = "http://192.168.1.4:3000";
axios.defaults.baseURL = baseURL;
export const login = async (email, password) => {
  try {
    const res = await axios.post("/auth/login", {
      username: email,
      password: password,
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteFormInput = async (id, token, formId) => {
  try {
    const res = await axios.delete(`/forms/${formId}/input/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteRoleForm = async (id, token, formId) => {
  try {
    const res = await axios.delete(`/forms/${formId}/role/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createRoleForm = async (role, token, formId, groupId) => {
  try {
    const res = await axios.post(
      `/forms/${formId}/role/`,
      {
        role,
        forms: formId,
        groups: groupId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const resgister = async (body) => {
  try {
    return await axios.post("/auth/resgister", body);
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      return error.request;
    } else {
      return Promise.reject(error);
    }
  }
};
export const getForms = async (token) => {
  try {
    let res = await axios.get("/forms", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createForms = async (token, body) => {
  try {
    return await axios.post("/forms", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getForm = async (token, id) => {
  try {
    return await axios.get(`/forms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteForm = async (id, token) => {
  try {
    return await axios.delete("/forms/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateForm = async (token, id, body) => {
  try {
    return await axios.patch(`/forms/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

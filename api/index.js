import axios from "axios";
const baseURL = "http://192.168.1.196:3000";
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

export const resgister = async (body) => {
  try {
    return await axios.post("/auth/resgister", body);
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else if (error.request) {
      console.log(error.request);
      return error.request;
    } else {
      return Promise.reject(error);
    }
  }
};
export const getForms = async (token) => {
  try {
    console.log(32, "api");
    console.log(token, 34);
    let res = await axios.get("/forms", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const createForms = async (token,body) => {
  try {
    return await axios.post("/forms",body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getForm = async (token, id) => {
  console.log(token, id);
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
  console.log(token, id,'delete');
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

export const updateForm = async (token, id) => {
  console.log(token, id);
  try {
    return await axios.patch(`/forms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

// const createFormData = (photo, body = {}) => {
//   const data = new FormData();
//   if (photo == null) {
//     Object.keys(body).forEach(key => {
//       data.append(key, body[key]);
//     });
//   } else {
//     data.append('file', {
//       name: photo.fileName,
//       type: photo.type,
//       uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//     });
//     if (body != null) {
//       Object.keys(body).forEach(key => {
//         data.append(key, body[key]);
//       });
//     }
//   }
//   return data;
// };
// const createFormDataUpload = (photo = {}) => {
//   const data = new FormData();

//   data.append('file', {
//     name: photo.fileName,
//     type: photo.type,
//     uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
//   });

//   console.log(data);
//   return data;
// };
// export const createFood = async (photo, body, token) => {
//   try {
//     let a = await fetch(`${baseURL}/api/food/create`, {
//       method: 'POST',
//       body: createFormData(photo, body),
//       headers: {
//         Cookie: `Authorization=${token}`,
//       },
//     });
//     let json = await a.json();
//     return json;
//   } catch (error) {
//     console.log('error', error);
//     return error;
//   }
// };
// export const UpdateStore = async (photo, body, token) => {
//   try {
//     let a = await fetch(`${baseURL}/api/store/update`, {
//       method: 'POST',
//       body: createFormData(photo, body),
//       headers: {
//         Cookie: `Authorization=${token}`,
//       },
//     });
//     let json = await a.json();
//     return json;
//   } catch (error) {
//     console.log('error', error);
//     return error;
//   }
// };
// // }
// // modifid food
// // deletefood
// export const deletefood = async id => {
//   try {
//     let res = await axios.get(`/api/food/deletefood/${id}`);
//     return res;
//   } catch (error) { }
// };
// export const updateFood = async (photo, body, token) => {
//   delete body.food_feedback;
//   delete body.image;

//   try {
//     let a = await fetch(`${baseURL}/api/food/update`, {
//       method: 'POST',
//       body: createFormData(photo, body),
//       headers: {
//         Cookie: `Authorization=${token}`,
//       },
//     });
//     let json = await a.json();
//     return json;
//   } catch (error) {
//     console.log('error', error);
//     return error;
//   }
// };
// export const uploadimagstore = async photo => {
//   console.log(123);
//   try {
//     let a = await fetch(`${baseURL}/api/upload/driver`, {
//       method: 'POST',
//       body: createFormDataUpload(photo),
//     });
//     let json = await a.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const upDateInfor = async (token, body) => {
//   try {
//     console.log(body);
//     let res = await axios.patch(`/api/driver/updatedriver`, body, {
//       headers: {
//         Cookie: `Authorization=${token}`,
//       },
//     });

//     return res;
//   } catch (error) {
//     console.log(error);
//     if (error.response) {
//       console.log(error.response);
//       // Request made and server responded
//       return error.response.data;
//       //   console.log(error.response.status);
//       //   console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//       // The request was made but no response was received
//       return error.request;
//     } else {
//       // Something happened in setting up the request that triggered an Error
//     }
//   }
// };
// export const getInfor = async token => {
//   cbvasdasd
//   try {
//     console.log(token);
//     let res = await axios.get(`/api/driver/getdriverbyid`, {
//       headers: {
//         Cookie: `Authorization=${token}`,
//       },
//     });
//     return res;
//   } catch (error) { }
// };
// export const getcart = async id => {
//   try {
//     console.log(id);
//     let res = await axios.get(`/api/cart/getcartbyid/${id}`);
//     return res;
//   } catch (error) { }
// };

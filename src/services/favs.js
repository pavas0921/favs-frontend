export const getAllFavsApi = async (token) => {
  try {
    const request = await fetch(`https://favs-backend.onrender.com/favs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
  }
};

export const AddFavAPI = async (body) => {
  try {
    const req = await fetch("https://favs-backend.onrender.com/favs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${body.token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const getFavByIdAPI = async (token, favid) => {
  try {
    const req = await fetch(`https://favs-backend.onrender.com/favs/${favid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const updateFavAPI = async (body) => {
  const newBody = {
    favid: +body.favid,
    fav_name: body.fav_name,
    fav_description: body.fav_description,
    user_userid: +localStorage.getItem("userid"),
    fav_link: body.fav_link,
  };

  try {
    const req = await fetch(
      `https://favs-backend.onrender.com/favs/${newBody.favid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newBody),
      }
    );
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const deleteFavAPI = async (token, favid) => {
  try {
    const req = await fetch(`https://favs-backend.onrender.com/favs/${favid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

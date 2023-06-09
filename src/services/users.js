export const getAllUsersApi = async (token) => {
  try {
    const request = await fetch(`https://favs-backend.onrender.com/user`, {
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

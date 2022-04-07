const userToFormData = (userInfo) => {
  const formData = new FormData();
  formData.append("username", userInfo.username);
  formData.append("password", userInfo.password);
  formData.append("firstname", userInfo.firstname);
  formData.append("lastname", userInfo.lastname);
  formData.append("email", userInfo.email);
  formData.append("description", userInfo.description);
  formData.append("profilepicture", userInfo.profilepicture);
  formData.append("birthdate", userInfo.birthdate);
  formData.append("gender", userInfo.gender);

  return formData;
};

const postToFormData = (postInfo) => {
  const formData = new FormData();
  formData.append("title", postInfo.title);
  formData.append("description", postInfo.description);
  formData.append("preparation", postInfo.preparation);
  formData.append("ingredients", postInfo.ingredients);
  formData.append("picture", postInfo.picture);
  formData.append("categoryId", postInfo.categoryId);
  return formData;
};

export { userToFormData, postToFormData };

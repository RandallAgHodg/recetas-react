const formatDate = (date) => {
  const newDate = new Date(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return newDate.toLocaleDateString("es-ES", options);
};

const formatDateWithoutYear = (date) => {
  const newDate = new Date(date);

  const options = {
    month: "long",
    day: "2-digit",
  };

  return newDate.toLocaleDateString("es-ES", options);
};

export { formatDate, formatDateWithoutYear };

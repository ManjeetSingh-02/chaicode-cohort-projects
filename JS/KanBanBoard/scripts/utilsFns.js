function getDate() {
  const date = new Date();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString(undefined, dateOptions);
}

function getImage(src, height, width, alt) {
  const img = document.createElement("img");
  img.src = src;
  img.height = height;
  img.width = width;
  img.alt = alt;
  return img;
}

export { getDate, getImage };

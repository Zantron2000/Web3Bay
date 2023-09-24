const isValidItem = (item) => {
  const invalidReasons = {};
  let isValid = true;

  if (!item.title) {
    invalidReasons.title = "Title is required";
    isValid = false;
  }
  if (!item.price) {
    invalidReasons.price = "Price is required";
    isValid = false;
  } else if (isNaN(item.price)) {
    invalidReasons.price = "Price must be a number";
    isValid = false;
  } else if (item.price <= 0) {
    invalidReasons.price = "Price must be greater than 0";
    isValid = false;
  }
  if (!item.description) {
    invalidReasons.description = "Description is required";
    isValid = false;
  } else if (item.description.length > 500) {
    invalidReasons.description = "Description must be less than 500 characters";
    isValid = false;
  }
  if (!item.image) {
    invalidReasons.image = "Image is required";
    isValid = false;
  } else if (item.image.size > 1000000) {
    invalidReasons.image = "Image must be less than 1MB";
    isValid = false;
  } else if (!item.image.type.includes("image")) {
    invalidReasons.image = "Image must be an image";
    isValid = false;
  }

  return { isValid, invalidReasons };
};

module.exports = {
  isValidItem,
};

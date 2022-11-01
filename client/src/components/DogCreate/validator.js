export default function validate(dataValues) {
  const errors = {};
  const data = dataValues;
  Object.entries(dataValues).forEach(([name, value]) => {
    switch (name) {
      case "name":
        if (value === "") return;
        const regexpName = /^[a-z '-]+$/i;
        value.length > 3 && value.length < 255 && regexpName.test(name)
          ? (errors["name"] = true)
          : (errors["name"] =
              "the name must be longer or must not have special characters.");
        break;
      case "height_min":
        if (value === "") return;
        value = parseInt(value);
        value > 0 &&
        value < 150 &&
        (!data.height_max || value < data.height_max)
          ? (errors["height_min"] = true)
          : (errors["height_min"] =
              "The 'HEIGHT MIN' must be a number in a range 1-149 cm OR minor of 'HEIGHT MAX'.");
        break;
      case "height_max":
        if (value === "") return;
        value = parseInt(value);
        value > 0 && value < 300 && value > data.height_min
          ? (errors["height_max"] = true)
          : (errors[
              "height_max"
            ] = `The 'HEIGHT MAX' must be in the range of ${data.height_min}-299 cm.`);
        break;
      case "weight_min":
        if (value === "") return;
        value = parseInt(value);
        value > 0 &&
        value < 150 &&
        (!data.weight_max || value < data.weight_max)
          ? (errors["weight_min"] = true)
          : (errors["weight_min"] =
              "The 'WEIGHT MIN' must be a number in a range 1-149 kg OR minor of 'HEIGHT MAX'.");
        break;

      case "weight_max":
        if (value === "") return;
        value = parseInt(value);
        value > 0 && value < 300 && value > data.weight_min
          ? (errors["weight_max"] = true)
          : (errors[
              "weight_max"
            ] = `The 'HEIGHT MAX' must be in the range of ${data.height_min}-299 kg.`);
        break;

      case "life_span_min":
        if (value === "") return;
        value = parseInt(value);
        value > 0 &&
        value < 25 &&
        (!data.life_span_max || value < parseInt(data.life_span_max))
          ? (errors["life_span_min"] = true)
          : (errors["life_span_min"] =
              "The 'LIFE SPAN MIN' must be a number in a range 1-25 years OR minor of 'LIFE SPAN MAX'.");
        break;

      case "life_span_max":
        if (value === "") return;
        value = parseInt(value);
        value > 0 && value < 25 && value > parseInt(data.life_span_min)
          ? (errors["life_span_max"] = true)
          : (errors[
              "life_span_max"
            ] = `The 'LIFE SPAN MAX' must be in the range of ${data.life_span_min}-25 years.`);
        break;

      case "image":
        if (value === "") return;
        const regExpUrl =
          /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

        typeof value === "string" &&
        value.length > 4 &&
        value.length < 2000 &&
        regExpUrl.test(value)
          ? (errors["image"] = true)
          : (errors["image"] =
              "The 'URL' does not match any url pattern or the address is too long");
        break;

      default:
        return errors;
    }
  });
  return errors;
}

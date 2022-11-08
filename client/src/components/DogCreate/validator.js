export default function validate(dataValues) {
  const errors = {};
  const data = dataValues;
  Object.entries(dataValues).forEach(([name, value]) => {
    switch (name) {
      case "name":
        if (value === "") return;
        const regexpName = /^[a-z '-]+$/i;
        if (!regexpName.test(value))
          return (errors["name"] =
            "the name must not have special characters.");
        if (value.length < 3)
          return (errors["name"] = "the name must have more than 3 letters.");
        if (value.length > 255)
          return (errors["name"] =
            "the name must not have more than 255 characters.");
        else errors["name"] = true;
        break;

      case "height_min":
        if (value === "") return;

        if (isNaN(parseInt(value)))
          return (errors["height_min"] = `the value ${value} is not a number.`);
        value = parseInt(value);
        if (value < 0)
          return (errors["height_min"] = "negative values are not allowed.");
        if (value === 0)
          return (errors["height_min"] = "value 0 are not allowed.");
        if (value > 0 && value < 10)
          return (errors["height_min"] =
            "the height minimun record is 9,65 centimeters");
        if (value > 110)
          return (errors["height_min"] =
            "the height record among dogs is 110 centimeters.");
        if (data.height_max && value > parseInt(data.height_max))
          return (errors[
            "height_min"
          ] = `the minimum height must be less than ${data.height_max}.`);
        else errors["height_min"] = true;

        break;
      case "height_max":
        if (value === "") return;

        if (isNaN(parseInt(value)))
          return (errors["height_max"] = `the value ${value} is not a number.`);
        value = parseInt(value);
        if (value < 0)
          return (errors["height_max"] = "negative values are not allowed.");
        if (value === 0)
          return (errors["height_max"] = "value 0 are not allowed.");
        if (value > 200)
          return (errors["height_max"] =
            "the height record among dogs is 110 centimeters.");
        if (data.height_min && value < parseInt(data.height_min))
          return (errors[
            "height_max"
          ] = `the maximum height must be greater than ${data.height_min}.`);
        else errors["height_max"] = true;

        break;
      case "weight_min":
        if (value === "") return;

        if (isNaN(parseInt(value)))
          return (errors["weight_min"] = `the value ${value} is not a number.`);
        value = parseInt(value);
        if (value < 0)
          return (errors["weight_min"] = "negative values are not allowed.");
        if (value === 0)
          return (errors["weight_min"] = "value 0 are not allowed.");
        if (value > 100)
          return (errors["weight_min"] =
            "the weight record among dogs is 90 kilograms.");
        if (data.weight_max && value > parseInt(data.weight_max))
          return (errors[
            "weight_min"
          ] = `the minimum weight must be less than ${data.weight_max}.`);
        else errors["weight_min"] = true;

        break;

      case "weight_max":
        if (value === "") return;

        if (isNaN(parseInt(value)))
          return (errors["weight_max"] = `the value ${value} is not a number.`);
        value = parseInt(value);
        if (value < 0)
          return (errors["weight_max"] = "negative values are not allowed.");
        if (value === 0)
          return (errors["weight_max"] = "value 0 are not allowed.");
        if (value > 120)
          return (errors["weight_max"] =
            "the weight record among dogs is 90 kilograms.");
        if (data.weight_min && value < parseInt(data.weight_min))
          return (errors[
            "weight_max"
          ] = `the maximum weight must be greater than ${data.weight_min}.`);
        else errors["weight_max"] = true;

        break;

      case "life_span_min":
        if (value === "") return;

        if (isNaN(parseInt(value)))
          return (errors[
            "life_span_min"
          ] = `the value ${value} is not a number.`);
        value = parseInt(value);
        if (value < 0)
          return (errors["life_span_min"] = "negative values are not allowed.");
          if (value === 0)
          return (errors["life_span_min"] = "value 0 are not allowed.");
        if (value > 25)
          return (errors["life_span_min"] =
            "the life span record among dogs is 22 years.");
        if (data.life_span_max && value > parseInt(data.life_span_max))
          return (errors[
            "life_span_min"
          ] = `the minimum life span must be less than ${data.life_span_max}.`);
        else errors["life_span_min"] = true;

        break;

      case "life_span_max":
        if (value === "") return;

        if (isNaN(parseInt(value)))
          return (errors[
            "life_span_max"
          ] = `the value ${value} is not a number.`);
        value = parseInt(value);
        if (value < 0)
          return (errors["life_span_max"] = "negative values are not allowed.");
        if (value === 0)
          return (errors["life_span_max"] = "value 0 are not allowed.");
        if (value > 25)
          return (errors["life_span_max"] =
            "the life span record among dogs is 22 years.");
        if (data.life_span_min && value < parseInt(data.life_span_min))
          return (errors[
            "life_span_max"
          ] = `the maximum weight must be greater than ${data.life_span_min}.`);
        else errors["life_span_max"] = true;

        break;

      case "image":
        if (value === "") return;

        const regExpUrl =
          /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

        if (!typeof value === "string" || !regExpUrl.test(value))
          return (errors["image"] =
            "the address does not match any url pattern.");
        if (value.length > 2000)
          return (errors["image"] = "the url direction is too long.");
        if (value.length < 10)
          return (errors["image"] = "the url direction is too short");
        else errors["image"] = true;
        break;

      default:
        return errors;
    }
  });
  return errors;
}

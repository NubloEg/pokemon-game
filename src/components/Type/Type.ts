import icon from "../../assets/icons/Types/typesIcon";

export const selectType = (type: string) => {
    const typeSettings = { borderColor: "", src: "" };
    switch (type) {
      case "normal":
        typeSettings.borderColor = "gray";
        typeSettings.src = icon[type];
        break;
      case "fire":
        typeSettings.borderColor = "red";
        typeSettings.src = icon[type];
        break;
      case "water":
        typeSettings.borderColor = "blue";
        typeSettings.src = icon[type];
        break;
      case "electric":
        typeSettings.borderColor = "yellow";
        typeSettings.src = icon[type];
        break;
      case "grass":
        typeSettings.borderColor = "green";
        typeSettings.src = icon[type];
        break;
      case "ice":
        typeSettings.borderColor = "#72e4e8";
        typeSettings.src = icon[type];
        break;
      case "fighting":
        typeSettings.borderColor = "red";
        typeSettings.src = icon[type];
        break;
      case "poison":
        typeSettings.borderColor = "purple";
        typeSettings.src = icon[type];
        break;
      case "ground":
        typeSettings.borderColor = "#d68911";
        typeSettings.src = icon[type];
        break;
      case "flying":
        typeSettings.borderColor = "#ddf5f6";
        typeSettings.src = icon[type];
        break;
      case "psychic":
        typeSettings.borderColor = "purple";
        typeSettings.src = icon[type];
        break;
      case "bug":
        typeSettings.borderColor = "green";
        typeSettings.src = icon[type];
        break;
      case "rock":
        typeSettings.borderColor = "red";
        typeSettings.src = icon[type];
        break;
      case "ghost":
        typeSettings.borderColor = "#cfc5f1";
        typeSettings.src = icon[type];
        break;
      case "dragon":
        typeSettings.borderColor = "yellow";
        typeSettings.src = icon[type];
        break;
      case "dark":
        typeSettings.borderColor = "black";
        typeSettings.src = icon[type];
        break;
      case "steel":
        typeSettings.borderColor = "#d7d7d7";
        typeSettings.src = icon[type];
        break;
      case "fairy":
        typeSettings.borderColor = "#dc01fc";
        typeSettings.src = icon[type];
        break;
    }
    return typeSettings;
  };
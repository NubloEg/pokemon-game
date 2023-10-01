import React from "react";
import s from "./Type.module.css";

interface Props {
  typeName: string;
}

export default function TypePokemon({ typeName }: Props) {
  const selectType = (type: string) => {
    const typeSettings = { borderColor: "", src: "" };
    switch (type) {
      case "fire":
        typeSettings.borderColor="red";
        typeSettings.src="https://w7.pngwing.com/pngs/461/483/png-transparent-computer-icons-desktop-font-fire-icon-text-computer-orange.png"
        break;
      case "flying":
        break;
      case "poison":
        break;
      default:
        break;
    }
    return typeSettings;
  };

  const settings=selectType(typeName)

  return (
    <div className={`${s.default}`} style={{ borderColor: settings.borderColor }}>
      <img width="16px" height="16px" src={settings.src} alt="type" />
      <span>{typeName}</span>
    </div>
  );
}

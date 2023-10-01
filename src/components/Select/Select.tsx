import React from "react";
import s from "./Select.module.css"

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export default function Select(props: Props) {
  return (
    <span>
      {props.options && (
        <select className={s.select_css} name="pets" id="pet-select">
          {props.options.map((option,ind) => (
            <option key={ind} value={option}>{option}</option>
          ))}
        </select>
      )}
    </span>
  );
}

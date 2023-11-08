import React from "react";
import s from "./Select.module.css"

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  setSearchType:React.Dispatch<React.SetStateAction<string>>
}

export default function Select({options,setSearchType}: Props) {
  return (
    <span>
      {options && (
        <select onChange={(e)=>setSearchType(e.target.value)} className={s.select_css} name="pets" id="pet-select">
          {options.map((option,ind) => (
            <option key={ind} value={option}>{option}</option>
          ))}
        </select>
      )}
    </span>
  );
}

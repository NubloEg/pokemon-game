import React from "react";

interface Props {
  about: string;
  stats: Stats[];
}

interface Stats {
  title: string;
  value: string | number;
}
export default function About({ about, stats }: Props) {
  return (
    <div>
      <div className="about">{about}</div>
      <div className="mainStats">
        {stats.map((stats) => (
          <div>
            <div className="title">{stats.title}</div>
            <div className="value">{stats.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

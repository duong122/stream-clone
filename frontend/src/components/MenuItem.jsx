// components/CategoryItem.jsx
import { useState } from "react";

export default function MenuItem({ id, name }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li>
      <a
        href={`/category/${id}`}
        className="dropdown-item"
        style={{
          backgroundColor: isHovered ? "white" : "transparent",
          color: isHovered ? "black" : "white",
          transition: "0.2s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </a>
    </li>
  );
}

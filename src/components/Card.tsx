// src/components/Card.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return <div className="card-container">{children}</div>;
};

export default Card;

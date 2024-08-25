import React from "react";
type Props = {
  content: React.ReactNode;
};
export const Title = ({ content }: Props) => {
  return <h3 className="py-1 font-semibold">{content}</h3>;
};

import React from "react";

interface TextBannerProps {
  text: string;
}

function TextBanner({ text }: TextBannerProps) {
  return <div>{text}</div>;
}

export default TextBanner;


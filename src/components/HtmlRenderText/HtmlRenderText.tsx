import React, { memo } from "react";

import ReactHtmlParser from "react-html-parser";

interface IHtmlRenderText {
  text: string;
}

const HtmlRenderText = ({ text }: IHtmlRenderText) => {
  return <>{ReactHtmlParser(text)}</>;
};

export default memo(HtmlRenderText);

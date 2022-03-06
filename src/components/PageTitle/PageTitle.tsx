import React, { memo } from "react";

import styled from "@emotion/styled";
import { TypographyProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Typography from "@/components/Typography/Typography";

interface TitleProps {
  colorLight: string;
  colorDark: string;
}

interface WrapperProps {
  margin?: string;
}

const Wrapper = styled.div<WrapperProps>`
  text-align: center;
  margin: ${(props) => props.margin};
`;

interface TitleProps {
  colorLight: string;
  colorDark: string;
}

const getLinearGradientTitle = (colorLight: string, colorDark: string) => {
  if (typeof colorLight === "string" && typeof colorDark == "string") {
    return `${colorLight}, ${colorDark}`;
  }

  return "";
};

const Title = styled.div<TitleProps>`
  font-weight: 800;
  background: -webkit-linear-gradient(${(props) => getLinearGradientTitle(props.colorLight, props.colorDark)});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

interface IPageTitle extends TypographyProps {
  title: string;
  testId: string;
  margin?: string | undefined;
}

const PageTitle = ({ title, testId, variant, margin }: IPageTitle) => {
  const theme = useTheme();

  return (
    <Wrapper margin={margin}>
      <Typography testId={testId} variant={variant}>
        <Title colorLight={theme.palette.primary.light} colorDark={theme.palette.primary.dark}>
          {title}
        </Title>
      </Typography>
    </Wrapper>
  );
};

PageTitle.defaultProps = { margin: undefined };

export default memo(PageTitle);

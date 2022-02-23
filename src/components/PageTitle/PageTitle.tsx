import React, { memo } from "react";

import styled from "@emotion/styled";
import { TypographyProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Typography from "@/components/Typography/Typography";

type TitleProps = {
  colorLight: string;
  colorDark: string;
};

type WrapperProps = {
  margin?: string;
};

const Wrapper = styled.div<WrapperProps>`
  text-align: center;
  margin: ${(props) => `${props.margin}`};
`;

const Title = styled.div<TitleProps>`
  font-weight: 800;
  background: -webkit-linear-gradient(${(props) => `${props.colorLight}, ${props.colorDark}`});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

interface IPageTitle extends TypographyProps {
  title: string;
  testId: string;
  margin?: string;
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

export default memo(PageTitle);

import styled from "@emotion/styled";

const CenteredContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

const CenteredScope = styled.div`
  text-align: center;
`;

const TopLeft = styled.div`
  position: absolute;
  top: 1em;
  left: 1em;
`;

const TopRight = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const BottomRight = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
`;

const BottomLeft = styled.div`
  position: absolute;
  bottom: 1em;
  left: 1em;
`;

export { BottomLeft, BottomRight, CenteredContent, CenteredScope, TopLeft, TopRight };

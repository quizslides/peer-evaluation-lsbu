import styled from "@emotion/styled";

interface FieldWrapperProps {
  marginBottom?: string;
}

const FieldWrapper = styled.div<FieldWrapperProps>`
  margin-top: 1em;
  margin-bottom: ${(props) => props.marginBottom || "2em"}; ;
`;

export { FieldWrapper };

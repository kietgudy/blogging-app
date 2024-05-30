import React from "react";
import styled from 'styled-components'

const LabelStyled = styled.label`
font-weight: 650;
    cursor: pointer`;

    
    const Label = ({htmlFor = "", children, ...props}) => {
        return (
            <LabelStyled htmlFor={htmlFor} {...props}>
                {children}
            </LabelStyled>
        );
    };
    
    export default Label;
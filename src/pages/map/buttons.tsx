import React from "react";
import styled, {css, CSSProperties} from "styled-components";
import Other from "../../assets/cssVars/Other";

type BtnProps = {
    isZoom: boolean,
};

export const ZoomoutBtn = styled.div<BtnProps>`
    position: absolute;
    top: 16px;
    left: 70px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
`;

export const LevelPlusBtn = styled.div<BtnProps>`
    position: absolute;
    bottom: 70px;
    left: 25px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
`;

export const LevelMinusBtn = styled.div<BtnProps>`
    position: absolute;
    bottom: 40px;
    left: 25px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
`;

export const AreaMovePlusBtn = styled.div<BtnProps>`
    position: absolute;
    bottom: 130px;
    left: 25px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
`;

export const AreaMoveMinusBtn = styled.div<BtnProps>`
    position: absolute;
    bottom: 100px;
    left: 25px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
`;
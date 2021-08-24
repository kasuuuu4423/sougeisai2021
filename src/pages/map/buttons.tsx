import React from "react";
import styled, {css, CSSProperties} from "styled-components";
import Other from "../../assets/cssVars/Other";

type BtnProps = {
    isZoom: boolean,
};

const btn = styled.div<BtnProps>`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: ${Other.TRANSITION};
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 750px){
        font-size: 15px;
    }
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
`;


export const ZoomoutBtn = styled(btn)`
    position: absolute;
    bottom: 460px;
    left: 25px;
`;

export const InfoBtn = styled(btn)`
    position: absolute;
    bottom: 400px;
    left: 25px;
`;

export const BtnLabelFloor = styled(btn)`
    height: auto;
    position: absolute;
    bottom: 340px;
    left: 25px;
`;

export const LevelPlusBtn = styled(btn)`
    position: absolute;
    bottom: 280px;
    left: 25px;
`;

export const LevelMinusBtn = styled(btn)`
    position: absolute;
    bottom: 220px;
    left: 25px;
`;

export const BtnLabelArea = styled(btn)`
    height: auto;
    position: absolute;
    bottom: 160px;
    left: 25px;
`;

export const AreaMovePlusBtn = styled(btn)`
    position: absolute;
    bottom: 100px;
    left: 25px;
`;

export const AreaMoveMinusBtn = styled(btn)`
    position: absolute;
    bottom: 40px;
    left: 25px;
`;



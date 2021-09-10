import styled, {css} from "styled-components";
import Other from "../../assets/cssVars/Other";


export const WrapButtons = styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
`;

type BtnProps = {
    isZoom: boolean,
    hidden: boolean,
};

const btn = styled.div<BtnProps>`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    z-index: 1;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    //transition: ${Other.TRANSITION};
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto Condensed', "Helvetica Neue", "Helvetica", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Arial", "Yu Gothic", "Meiryo", sans-serif;;
    font-weight: 700;
    visibility: visible;
    margin-bottom: 10px;
    @media screen and (max-width: 750px){
        font-size: 15px;
        width: 40px;
        height: 40px;
    }
    ${(props) =>
        props.isZoom
            ? css`
                opacity: 1;
            `
    :''}
    ${(props) =>
        props.hidden
            ? css`
                visibility: hidden;
                opacity: 0;
            `
    :''}
`;

export const ZoomoutBtn = styled(btn)`
`;

export const InfoBtn = styled(btn)`
`;

export const BtnLabelFloor = styled(btn)`
    height: auto;
`;

export const LevelPlusBtn = styled(btn)`
`;

export const LevelMinusBtn = styled(btn)`
`;

export const BtnLabelArea = styled(btn)`
    height: auto;
`;

export const AreaMovePlusBtn = styled(btn)`
`;

export const AreaMoveMinusBtn = styled(btn)`
`;



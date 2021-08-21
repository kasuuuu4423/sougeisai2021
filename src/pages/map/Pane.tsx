import React from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";
import Konva from "konva";

type _PaneProps = {
    isOpen: boolean | false,
};

const _Pane = styled.div<_PaneProps>`
    position: absolute;
    top: 0%;
    right: 0%;
    width: 200px;
    height: 100vh;
    z-index: 1;
    background: ${Color.LIGHTGRAY};
    transform: translateX(100%);
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isOpen
            ? css`
                transform: translateX(0%);
            `
    :''}
`;

const CloseBtn = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
`;

type PaneProps = {
    info: {[key: string]: string},
    isOpen: boolean,
    onCloseClick: ()=>{} | void,
};

type PaneState = {};

class Pane extends React.Component<PaneProps, PaneState>{
    constructor(props: PaneProps){
        super(props);
    }

    static defaultProps: PaneProps = {
        info: {
            "Name" : "",
        },
        isOpen: false,
        onCloseClick: ()=>{},
    };

    render(){
        return(
            <_Pane isOpen={this.props.isOpen}>
                <CloseBtn onClick={this.props.onCloseClick}>×</CloseBtn>
                <ul>
                    <li>{this.props.info["name"]}</li>
                </ul>
            </_Pane>
        );
    }
}

export default Pane;
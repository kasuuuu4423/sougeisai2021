import React from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";

type AreaProps = {
    width: number,
    height: number,
    x: number,
    y: number,
    onClick: ()=>{} | void,
};

type AreaState = {};

class Area extends React.Component<AreaProps, AreaState>{
    constructor(props: AreaProps){
        super(props);
    }

    static defaultProps: AreaProps = {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        onClick: ()=>{},
    };

    handleClick = () =>{
        this.props.onClick();
    }

    render(){
        return(
            <Rect onTap={this.handleClick}  onClick={this.handleClick}
                fill="black" width={this.props.width} height={this.props.height} x={this.props.x} y={this.props.y}>
            </Rect>
        );
    }
}

export default Area;
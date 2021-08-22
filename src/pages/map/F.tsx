import React from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";

type FloorProps = {
    image: HTMLImageElement,
    ofX: number,
    ofY: number,
    x: number,
    y: number,
    width: number,
    height: number,
};
type FloorState = {};

class Floor extends React.Component<FloorProps, FloorState>{
    constructor(props: FloorProps){
        super(props);
    }

    render(){
        return(
            <Image image={this.props.image} offsetX={this.props.ofX} offsetY={this.props.ofY} x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} />
        );
    }
}

export default Floor;
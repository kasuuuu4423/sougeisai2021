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
        let placeholder = new window.Image();
        placeholder.src = "img/top/loading.gif";
        let image = this.props.image != null ? this.props.image : placeholder;
        return(
            <Image image={image} offsetX={this.props.ofX} offsetY={this.props.ofY} x={this.props.x} y={this.props.y} width={this.props.width} height={this.props.height} />
        );
    }
}

export default Floor;
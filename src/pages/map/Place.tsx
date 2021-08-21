import React from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";

type PlaceProps = {
    id: number,
    width: number,
    height: number,
    ofX: number,
    ofY: number,
    x: number,
    y: number,
    onClick: ((w: number, h: number, x: number, y: number)=>void) | (()=>{}),
    onMouseEnter: ()=>{} | void,
    onMouseLeave: ()=>{} | void,
    info: {[key: string]: string},
};

type PlaceState = {
};

class Place extends React.Component<PlaceProps, PlaceState>{
    constructor(props: PlaceProps){
        super(props);
    }

    static defaultProps: PlaceProps = {
        id: 999,
        width: 0,
        height: 0,
        ofX: 0,
        ofY: 0,
        x: 0,
        y: 0,
        onClick: ()=>{},
        onMouseEnter: ()=>{},
        onMouseLeave: ()=>{},
        info: {
            "Name": "",
        },
    };

    handleClick = () =>{
        this.props.onClick(this.props.width, this.props.height, this.props.x, this.props.y);
    }

    render(){
        return(
            <Rect onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onTap={this.handleClick}  onClick={this.handleClick}
                stroke="black" width={this.props.width} height={this.props.height}
                offsetX={this.props.width/2} offsetY={this.props.height/2} x={this.props.x} y={this.props.y}>
            </Rect>
        );
    }
}

export default Place;
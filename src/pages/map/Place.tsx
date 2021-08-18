import React from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";

type PlaceProps = {
    width: number,
    height: number,
    x: number,
    y: number,
    onClick: ()=>{} | void,
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
        width: 0,
        height: 0,
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
        this.props.onClick();
    }

    render(){
        return(
            <Rect onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onTap={this.handleClick}  onClick={this.handleClick}
                fill="black" width={this.props.width} height={this.props.height} x={this.props.x} y={this.props.y}>
            </Rect>
        );
    }
}

export default Place;
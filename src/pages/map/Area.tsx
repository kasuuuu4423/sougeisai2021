import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";
import Floor from "./F";
import { JsxElement } from "typescript";
import { throws } from "assert";

const getHTMLImage = (path: string, callback: (image: HTMLImageElement)=>void = ()=>{}) =>{
    let image = new window.Image();
    image.src = window.location.origin+"/img/"+path;
    image.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        callback(image);
        return image;
    };
}

type AreaProps = {
    id: number,
    width: number,
    height: number,
    ofX: number,
    ofY: number,
    x: number,
    y: number,
    images: string[],
    onClick: ((w: number, h: number, x: number, y: number, areaNum: number)=>void) | (()=>{}),
    onMouseEnter: ()=>{} | void,
    onMouseLeave: ()=>{} | void,
    info: {[key: string]: string},
    level: number,
    isZoom: boolean,
    areaNum: number,
    nowArea: number,
    maxLevel: number,
};

type AreaState = {
    images?: HTMLImageElement[],
};

class Area extends React.Component<AreaProps, AreaState>{
    constructor(props: AreaProps){
        super(props);
        this.state = {
            images: [],
        };
        let images = this.state.images != null ? this.state.images : [];
        this.props.images.forEach((path)=>{
            getHTMLImage(path, (image: HTMLImageElement)=>{
                images.push(image);
                this.setState({
                    images: images,
                });
            });
        });
    }

    static defaultProps: AreaProps = {
        id: 999,
        width: 0,
        height: 0,
        ofX: 0,
        ofY: 0,
        x: 0,
        y: 0,
        images: [],
        onClick: ()=>{},
        onMouseEnter: ()=>{},
        onMouseLeave: ()=>{},
        info: {
            "Name": "",
        },
        level: 0,
        isZoom: false,
        areaNum: 0,
        nowArea: 0,
        maxLevel: 1,
    };

    handleClick = () =>{
        this.props.onClick(this.props.width, this.props.height, this.props.x, this.props.y, this.props.areaNum);
    }

    render(){
        let images: HTMLImageElement[]  = [];
        let imagesSize: number[][] = [];
        let floor: ReactElement = <Rect></Rect>;
        if(this.state.images != null && this.state.images.length == this.props.images.length){
            images = this.state.images;
            this.state.images.forEach((image, i)=>{
                let height = this.props.height;
                let width = height*image.width/image.height;
                imagesSize.push([width, height]);
            });
            if(imagesSize[this.props.level] != null){
                floor = <Floor image={images[this.props.level]}
                ofX={imagesSize[this.props.level][0]/2} ofY={this.props.height/2} x={this.props.x} y={this.props.y} width={imagesSize[this.props.level][0]} height={imagesSize[this.props.level][1]} />;
            }
        }

        return(
            <Layer>
                {this.props.areaNum==this.props.nowArea && this.props.isZoom && floor}
                <Rect onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onTap={this.handleClick}  onClick={this.handleClick}
                    stroke="black" width={this.props.width} height={this.props.height}
                    offsetX={this.props.width/2} offsetY={this.props.height/2} x={this.props.x} y={this.props.y} />
            </Layer>
        );
    }
}

export default Area;
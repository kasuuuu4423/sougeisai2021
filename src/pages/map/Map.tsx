import React from "react";
import styled, {css, CSSProperties} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";
import Area from "./Area";

const Test = styled.div`
    font-size: 50px;
`;

type MapProps = {};
type MapState = {
    width?: number,
    height?: number,
    image?: HTMLImageElement,
    cursor?: CSSProperties,

    tmp?: number,
};

class Map extends React.Component<MapProps, MapState>{
    constructor(props: MapProps){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            image: new window.Image(),
            cursor: {
                cursor: "grab",
            },

            tmp: 0,
        };
        window.addEventListener('resize', this.handleResizeWindow);

        let image = new window.Image();
        image.src = window.location.origin+"/img/test/back.png";
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            this.setState({
                image: image
            });
        };
        Konva.hitOnDragEnabled = true;
    }

    handleResizeWindow = () =>{
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    handleDraging = () =>{
        this.setState({
            cursor: {cursor: "grabbing"},
        });
    }

    handleDraged = () =>{
        this.setState({
            cursor: {cursor: "grab"},
        });
    }

    render(){
        let height = this.state.image != undefined ? window.innerHeight*this.state.image.height/this.state.image.width : 0;
        return(
            <div>
                <Test>{this.state.tmp}</Test>
                <Stage style={this.state.cursor} onDragStart={this.handleDraging} onDragEnd={this.handleDraged} draggable={true}
                    offsetX={window.innerWidth/2} offsetY={window.innerHeight/2} x={window.innerWidth/2} y={window.innerHeight/2} width={window.innerWidth} height={window.innerHeight}>
                    <Layer className="map">
                        <Image image={this.state.image} x={0} y={0} width={height} height={window.innerHeight} />
                    </Layer>
                    <Layer className="touch">
                        <Area width={height/2} height={window.innerHeight/2} x={0} y={0}></Area>
                    </Layer>
                </Stage>
            </div>
        );
    }
}

export default Map;
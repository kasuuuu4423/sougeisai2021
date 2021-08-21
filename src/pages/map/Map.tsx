import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";
import Place from "./Place";
import Pane from "./Pane";
import Area from "./Area";
import { ZoomoutBtn, LevelPlusBtn, LevelMinusBtn, AreaMovePlusBtn, AreaMoveMinusBtn } from "./buttons";
import micoCms from "../../lib/microCms";
import Util from "../../lib/Util";

const Test = styled.div`
    font-size: 50px;
`;

const Background = styled.div`
    background: #319EA7;
`;

type MapProps = {};
type MapState = {
    width?: number,
    height?: number,
    x?: number,
    y?: number,
    ofX?: number | null,
    ofY?: number | null,
    image?: HTMLImageElement,
    cursor?: CSSProperties,
    paneInfo?: {[key: string]: string},
    paneState?: boolean,
    scale?: number,
    isZoom?: boolean,
    level?: number,
    maxLevel?: number,
    area?: number,
    areas?: number[][],

    tmp?: number,
};

class Map extends React.Component<MapProps, MapState>{
    private static AreaPaths = [
        ["test/test_zoom.png","test/test_zoom2.png",],
        ["test/test_zoom.png","test/test_zoom2.png",],
        ["test/test_zoom.png","test/test_zoom2.png",],
    ];
    constructor(props: MapProps){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            // x: window.innerWidth/2,
            // y: window.innerHeight/2,
            x: 0,
            y: 0,
            ofX: null,
            ofY: null,
            image: new window.Image(),
            cursor: {
                cursor: "grab",
            },
            paneInfo: {},
            paneState: false,
            scale: 1,
            isZoom: false,
            level: 0,
            area: 0,
            maxLevel: 0,
            areas: [
                [260, 100, this.getRelativePostion(-85, "x"), this.getRelativePostion(0, "y")],
                [180, 100, this.getRelativePostion(-120, "x"), this.getRelativePostion(-120, "y")],
                [180, 100, this.getRelativePostion(200, "x"), this.getRelativePostion(-120, "y")],
            ],

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

    handlePlaceEnter = () =>{
        this.setState({
            cursor: {cursor: "pointer"}
        });
    }

    handlePlaceLeave = () =>{
        this.setState({
            cursor: {cursor: "grab"}
        });
    }

    handlePlaceClick = (info:{[key: string]: string}) =>{
        const id = info["id"];
        let res = micoCms.getPlaceById(id, (res: {[key: string]: string})=>{
            this.setState({
                paneInfo: res,
                paneState: true
            });
        });
    }

    handlePaneClose = () =>{
        this.setState({
            paneState: false,
        });
    }

    handleAreaClick = (w: number, h: number, x: number, y: number, areaNum:number) =>{
        if(!this.state.isZoom){
            let zoomMag = 2.5;
            this.setState({
                scale: zoomMag,
                x: -x*zoomMag + window.innerWidth/2,
                y: -y*zoomMag + window.innerHeight/2,
                isZoom: true,
                area: areaNum,
                maxLevel: Map.AreaPaths[areaNum].length,
            });
        }
    }

    handleZoomout = () =>{
        if(this.state.isZoom){
            this.setState({
                scale: 1,
                x: 0,
                y: 0,
                level: 0,
                isZoom: false,
            });
        }
    }

    handleLavelPlus = () =>{
        let level = this.state.level != null ? this.state.level+1:0;
        this.setState({
            level: level,
        });
    }

    handleLavelMinus = () =>{
        let level = this.state.level != null ? this.state.level-1:0;
        this.setState({
            level: level,
        });
    }

    handleAreaMovePlus = () =>{
        let nextArea = Util.checkAndGetUndifined(this.state.areas).length-1 == Util.checkAndGetUndifined(this.state.area) ? 0 : Util.checkAndGetUndifined(this.state.area)+1;
        let area = this.state.areas != null ? this.state.areas[nextArea] : [];
        let zoomMag = 2.5;
        this.setState({
            scale: zoomMag,
            x: -area[2]*zoomMag + window.innerWidth/2,
            y: -area[3]*zoomMag + window.innerHeight/2,
            area: nextArea,
            maxLevel: Map.AreaPaths[nextArea].length,
        });
    }

    handleAreaMoveMinus = () =>{
        let nextArea = 0 == Util.checkAndGetUndifined(this.state.area) ? Util.checkAndGetUndifined(this.state.areas).length-1 : Util.checkAndGetUndifined(this.state.area)-1;
        let area = this.state.areas != null ? this.state.areas[nextArea] : [];
        let zoomMag = 2.5;
        this.setState({
            scale: zoomMag,
            x: -area[2]*zoomMag + window.innerWidth/2,
            y: -area[3]*zoomMag + window.innerHeight/2,
            area: nextArea,
            maxLevel: Map.AreaPaths[nextArea].length,
        });
    }

    moveStageTo = (x: number, y: number) =>{
        this.setState({x: x, y: y});
    }

    getRelativePostion = (num: number,  mode: string) =>{
        switch(mode){
            case "x":
                return window.innerWidth/2 + num;
            case "y":
                return window.innerHeight/2 + num;
        }
        return 0;
    }

    render(){
        let width = this.state.image != null ? window.innerHeight*this.state.image.width/this.state.image.height : 0;
        let tmpX = this.state.image != null ? width / 2 : 0;
        let areas: number[][] = Util.checkAndGetUndifined(this.state.areas);
        let places: [{[key: string]:string}, number, number, number, number][] = [];
        let isZoom = this.state.isZoom != null ? this.state.isZoom : false;
        let level = Util.checkAndGetUndifined(this.state.level);
        let maxLevel = Util.checkAndGetUndifined(this.state.maxLevel);
        return(
            <Background>
                <ZoomoutBtn isZoom={isZoom} onClick={this.handleZoomout}>🔍</ZoomoutBtn>
                <Stage scaleX={this.state.scale} scaleY={this.state.scale} style={this.state.cursor} onMouseDown={this.handleDraging} onMouseUp={this.handleDraged} draggable={!this.state.isZoom}
                    x={this.state.x} y={this.state.y}width={window.innerWidth} height={window.innerHeight}>
                        <Layer>
                            <Image image={this.state.image} offsetX={tmpX} offsetY={window.innerHeight / 2} x={window.innerWidth / 2} y={window.innerHeight / 2} width={width} height={window.innerHeight} />
                        </Layer>
                        {
                            areas.map((area: number[], i)=>
                                <Area nowArea={this.state.area} areaNum={i} isZoom={isZoom} level={this.state.level} images={Map.AreaPaths[i]} id={i} onClick={this.handleAreaClick} onMouseEnter={this.handlePlaceEnter} onMouseLeave={this.handlePlaceLeave}
                                    width={area[0]} height={area[1]} x={area[2]} y={area[3]} maxLevel={Map.AreaPaths[i].length} />
                            )
                        }
                </Stage>
                {maxLevel-1 > level && <LevelPlusBtn onClick={this.handleLavelPlus} isZoom={isZoom}>＋</LevelPlusBtn>}
                {level > 0 && <LevelMinusBtn onClick={this.handleLavelMinus} isZoom={isZoom}>ー</LevelMinusBtn>}
                <AreaMovePlusBtn onClick={this.handleAreaMovePlus} isZoom={isZoom}>↑</AreaMovePlusBtn>
                <AreaMoveMinusBtn onClick={this.handleAreaMoveMinus} isZoom={isZoom}>↓</AreaMoveMinusBtn>
                <Pane onCloseClick ={this.handlePaneClose} isOpen={this.state.paneState} info={this.state.paneInfo} />
            </Background>
        );
    }
}

export default Map;
import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";
import Place from "./Place";
import Pane from "./Pane";
import Area from "./Area";
import { ZoomoutBtn, LevelPlusBtn, LevelMinusBtn, AreaMovePlusBtn, AreaMoveMinusBtn, BtnLabelArea, BtnLabelFloor, InfoBtn } from "./buttons";
import MicroCms from "../../lib/microCms";
import Util from "../../lib/Util";

const Test = styled.div`
    font-size: 50px;
`;

const Background = styled.div`
    background: #319EA7;
`;

type MapProps = {
    handleIsZoom: ()=>void,
    handleIsZoomout: ()=>void,
};
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
    //以下の2つの配列の順番をエリアごとに一致させる
    private static AreaPaths = [
        ["map/places/c/c_roof.png","map/places/c/c_f4.png","map/places/c/c_f3.png","map/places/c/c_f2.png","map/places/c/c_f1.png"],
        ["map/places/clover/clover_roof.png","map/places/clover/clover_1.png"],
        ["map/places/entrance/ent_roof.png","map/places/entrance/ent_f2.png","map/places/entrance/ent_f1.png"],
        ["map/places/nurse/nurse_roof.png","map/places/nurse/nurse_f5.png","map/places/nurse/nurse_f4.png","map/places/nurse/nurse_f3.png","map/places/nurse/nurse_f2.png","map/places/nurse/nurse_f1.png"],
        ["map/places/g_h/g_h_roof.png","map/places/g_h/g_h_3.png","map/places/g_h/g_h_2.png","map/places/g_h/g_h_1.png"],
        ["map/places/a_b/a_b_4.png","map/places/a_b/a_b_3.png","map/places/a_b/a_b_2.png","map/places/a_b/a_b_1.png"],
        ["map/places/f_senkou/f_senkou_roof.png","map/places/f_senkou/f_senkou_f4.png","map/places/f_senkou/f_senkou_f3.png","map/places/f_senkou/f_senkou_f2.png","map/places/f_senkou/f_senkou_f1.png","map/places/f_senkou/f_senkou_fb1.png"],
    ];
    private static AreaPos = [
        [119, 34, -161, -11],
        [155, 53, -19, -3],
        [176, 55, 19, 142],
        [155, 197, 279, -170],
        [125, 155, 52, -160],
        [193, 71, -107, -155],
        [124, 65, -265.8, -136],
    ];

    constructor(props: MapProps){
        super(props);

        let areas: number[][] = [];
        Map.AreaPos.forEach((pos: number[]) =>{
            areas.push([pos[0], pos[1], this.getRelativePostion(pos[2], "x"), this.getRelativePostion(pos[3], "y")]);
        });
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
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
            areas: areas,

            tmp: 0,
        };
        window.addEventListener('resize', this.handleResizeWindow);

        let image = new window.Image();
        image.src = window.location.origin+"/img/map/back.png";
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
        let areas: number[][] = [];
        Map.AreaPos.forEach((pos: number[]) =>{
            areas.push([pos[0], pos[1], this.getRelativePostion(pos[2], "x"), this.getRelativePostion(pos[3], "y")]);
        });
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
            areas:areas,
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
        let res = MicroCms.getPlaceById(id, (res: {[key: string]: string})=>{
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
            let zoomMag = 3;
            this.setState({
                scale: zoomMag,
                x: -x*zoomMag + window.innerWidth/2,
                y: -y*zoomMag + window.innerHeight/2,
                isZoom: true,
                area: areaNum,
                maxLevel: Map.AreaPaths[areaNum].length,
            });
            this.props.handleIsZoom();
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
            this.props.handleIsZoomout();
        }
    }

    handleLavelPlus = () =>{
        let level = this.state.level != null ? this.state.level-1:0;
        this.setState({
            level: level,
        });
    }

    handleLavelMinus = () =>{
        let level = this.state.level != null ? this.state.level+1:0;
        this.setState({
            level: level,
        });
    }

    handleAreaMovePlus = () =>{
        let nextArea = Util.checkAndGetUndifined(this.state.areas).length-1 == Util.checkAndGetUndifined(this.state.area) ? 0 : Util.checkAndGetUndifined(this.state.area)+1;
        let area = this.state.areas != null ? this.state.areas[nextArea] : [];
        let zoomMag = 3;
        this.setState({
            scale: zoomMag,
            x: -area[2]*zoomMag + window.innerWidth/2,
            y: -area[3]*zoomMag + window.innerHeight/2,
            area: nextArea,
            level: 0,
            maxLevel: Map.AreaPaths[nextArea].length,
        });
    }

    handleAreaMoveMinus = () =>{
        let nextArea = 0 == Util.checkAndGetUndifined(this.state.area) ? Util.checkAndGetUndifined(this.state.areas).length-1 : Util.checkAndGetUndifined(this.state.area)-1;
        let area = this.state.areas != null ? this.state.areas[nextArea] : [];
        let zoomMag = 3;
        this.setState({
            scale: zoomMag,
            x: -area[2]*zoomMag + window.innerWidth/2,
            y: -area[3]*zoomMag + window.innerHeight/2,
            area: nextArea,
            level: 0,
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
        let isZoom = this.state.isZoom != null ? this.state.isZoom : false;
        let level = Util.checkAndGetUndifined(this.state.level);
        let maxLevel = Util.checkAndGetUndifined(this.state.maxLevel);
        return(
            <Background>
                <Stage scaleX={this.state.scale} scaleY={this.state.scale} style={this.state.cursor} onMouseDown={this.handleDraging} onMouseUp={this.handleDraged} draggable={true}
                    x={this.state.x} y={this.state.y}width={window.innerWidth} height={window.innerHeight}>
                        <Layer>
                            <Image image={this.state.image} offsetX={tmpX} offsetY={window.innerHeight / 2} x={window.innerWidth / 2} y={window.innerHeight / 2} width={width} height={window.innerHeight} />
                            {isZoom && <Rect opacity={0.34} fill="#095B80" offsetX={tmpX} offsetY={window.innerHeight / 2} x={window.innerWidth / 2} y={window.innerHeight / 2} width={width} height={window.innerHeight} />}
                        </Layer>
                        {
                            areas.map((area: number[], i)=>
                                <Area areaId={"ky1g8_gt23"} nowArea={this.state.area} areaNum={i} isZoom={isZoom} level={this.state.level} images={Map.AreaPaths[i]} id={i} onClick={this.handleAreaClick} onMouseEnter={this.handlePlaceEnter} onMouseLeave={this.handlePlaceLeave}
                                    width={area[0]} height={area[1]} x={area[2]} y={area[3]} maxLevel={Map.AreaPaths[i].length} />
                            )
                        }
                </Stage>
                <ZoomoutBtn isZoom={isZoom} onClick={this.handleZoomout}>Back</ZoomoutBtn>
                <InfoBtn isZoom={isZoom}>?</InfoBtn>
                <BtnLabelFloor isZoom={isZoom}>floor</BtnLabelFloor>
                {level > 0 && <LevelPlusBtn onClick={this.handleLavelPlus} isZoom={isZoom}>＋</LevelPlusBtn>}
                {maxLevel-1 > level && <LevelMinusBtn onClick={this.handleLavelMinus} isZoom={isZoom}>ー</LevelMinusBtn>}
                <BtnLabelArea isZoom={isZoom}>area</BtnLabelArea>
                <AreaMovePlusBtn onClick={this.handleAreaMovePlus} isZoom={isZoom}>↑</AreaMovePlusBtn>
                <AreaMoveMinusBtn onClick={this.handleAreaMoveMinus} isZoom={isZoom}>↓</AreaMoveMinusBtn>
                <Pane onCloseClick ={this.handlePaneClose} isOpen={this.state.paneState} info={this.state.paneInfo} />
            </Background>
        );
    }
}

export default Map;
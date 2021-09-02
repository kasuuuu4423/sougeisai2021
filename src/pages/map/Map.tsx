import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";
import Place from "./Place";
import Area from "./Area";
import { ZoomoutBtn, LevelPlusBtn, LevelMinusBtn, AreaMovePlusBtn, AreaMoveMinusBtn, BtnLabelArea, BtnLabelFloor, InfoBtn } from "./buttons";
import MicroCms from "../../lib/microCms";
import Util from "../../lib/Util";
import { throws } from "assert";
import AreaIntroduction from "./AreaIntroduction";

//ToDo
/*
イベント関係とモーダル接続
モーダルデザイン
タスクあぶり出し
*/

const Test = styled.div`
    font-size: 50px;
`;

const Background = styled.div`
    background: #319EA7;
`;

type MapProps = {
    handleIsZoom: ()=>void,
    handleIsZoomout: ()=>void,
    handleOpenModal: (info: {[key: string]: string})=>void,
    handleCloseModal: ()=>void,
    modalIsOpen: boolean,
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
    scale?: number,
    isZoom?: boolean,
    level?: number,
    maxLevel?: number,
    area?: number,
    areas?: number[][],
    areaInfo?: {"name": string, "introduction": string},

    tmp?: number,
};

class Map extends React.Component<MapProps, MapState>{
    //以下の2つの配列の順番をエリアごとに一致させる
    private static AreaPaths = [
        /*C棟*/ ["map/places/c/c_roof.png","map/places/c/c_f4.png","map/places/c/c_f3.png","map/places/c/c_f2.png","map/places/c/c_f1.png"],
        /*クローバー棟*/ ["map/places/clover/clover_roof.png","map/places/clover/clover_1.png"],
        /*エントランス棟*/ ["map/places/entrance/ent_roof.png","map/places/entrance/ent_f2.png","map/places/entrance/ent_f1.png"],
        /*看護棟*/ ["map/places/nurse/nurse_roof.png","map/places/nurse/nurse_f5.png","map/places/nurse/nurse_f4.png","map/places/nurse/nurse_f3.png","map/places/nurse/nurse_f2.png","map/places/nurse/nurse_f1.png"],
        /*GH棟*/ ["map/places/g_h/g_h_roof.png","map/places/g_h/g_h_3.png","map/places/g_h/g_h_2.png","map/places/g_h/g_h_1.png"],
        /*AB棟*/ ["map/places/a_b/a_b_4.png","map/places/a_b/a_b_3.png","map/places/a_b/a_b_2.png","map/places/a_b/a_b_1.png"],
        /*F専攻科棟*/ ["map/places/f_senkou/f_senkou_roof.png","map/places/f_senkou/f_senkou_f4.png","map/places/f_senkou/f_senkou_f3.png","map/places/f_senkou/f_senkou_f2.png","map/places/f_senkou/f_senkou_f1.png","map/places/f_senkou/f_senkou_fb1.png"],
    ];

    private static AreaHoverPaths = [
        /*C棟*/ "map/hovers/hover_c.png",
        /*クローバー棟*/ "map/hovers/hover_clover.png",
        /*エントランス棟*/ "map/hovers/hover_entrance.png",
        /*看護棟*/ "map/hovers/hover_nurse.png",
        /*GH棟*/ "map/hovers/hover_g_h.png",
        /*AB棟*/ "map/hovers/hover_a_b.png",
        /*F専攻科棟*/ "map/hovers/hover_f.png",
    ];

    //縦幅でずれてしまうバグ
    private static AreaPos = [
        [119, 34, -161, -11],
        [155, 53, -19, -3],
        [176, 55, 19, 142],
        [155, 197, 279, -170],
        [125, 155, 52, -160],
        [193, 71, -107, -155],
        [124, 65, -265.8, -136],
    ];

    private static AreaId = [
        "area_c",
        "area_clover",
        "area_entrance",
        "area_nurse",
        "area_gh",
        "area_ab",
        "area_ef",
    ];

    private isSp: boolean = false;

    private static MapHeight: {[key: string]: number} = {
        'pc': 664,
        'sp': 664,
    };

    private static MagRate: {[key: string]: number} = {
        'pc': 3,
        'sp': 1.7,
    };

    private _magRate: number = Map.MagRate['pc'];
    private _mapHeight: number = Map.MapHeight['pc'];

    constructor(props: MapProps){
        super(props);

        let areas: number[][] = [];
        Map.AreaPos.forEach((pos: number[]) =>{
            areas.push([pos[0], pos[1], this.getRelativePostion(pos[2], "x"), this.getRelativePostion(pos[3], "y")]);
        });
        this.state = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            x: 0,
            y: 0,
            ofX: null,
            ofY: null,
            image: new window.Image(),
            cursor: {
                cursor: "grab",
            },
            scale: 1,
            isZoom: false,
            level: 0,
            area: 0,
            maxLevel: 0,
            areas: areas,
            areaInfo: {
                "name": "",
                "introduction": "",
            },

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

        //スマホ判定
        this.isSp = document.documentElement.clientWidth < 750 ? true : false;

        if(this.isSp){
            this._magRate = Map.MagRate['sp'];
            this._mapHeight = Map.MapHeight['sp'];
        }

        Konva.hitOnDragEnabled = true;
    }

    handleResizeWindow = () =>{
        let areas: number[][] = [];
        Map.AreaPos.forEach((pos: number[]) =>{
            areas.push([pos[0], pos[1], this.getRelativePostion(pos[2], "x"), this.getRelativePostion(pos[3], "y")]);
        });
        this.setState({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
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

    handleAreaClick = (w: number, h: number, x: number, y: number, areaNum:number) =>{
        if(!this.state.isZoom){
            let zoomMag = this._magRate;
            this.setState({
                scale: zoomMag,
                x: -x*zoomMag + document.documentElement.clientWidth/2,
                y: -y*zoomMag + document.documentElement.clientHeight/2,
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
            this.props.handleCloseModal();
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
        let zoomMag = this._magRate;
        this.setState({
            scale: zoomMag,
            x: -area[2]*zoomMag + document.documentElement.clientWidth/2,
            y: -area[3]*zoomMag + document.documentElement.clientHeight/2,
            area: nextArea,
            level: 0,
            maxLevel: Map.AreaPaths[nextArea].length,
        });
    }

    handleAreaMoveMinus = () =>{
        let nextArea = 0 == Util.checkAndGetUndifined(this.state.area) ? Util.checkAndGetUndifined(this.state.areas).length-1 : Util.checkAndGetUndifined(this.state.area)-1;
        let area = this.state.areas != null ? this.state.areas[nextArea] : [];
        let zoomMag = this._magRate;
        this.setState({
            scale: zoomMag,
            x: -area[2]*zoomMag + document.documentElement.clientWidth/2,
            y: -area[3]*zoomMag + document.documentElement.clientHeight/2,
            area: nextArea,
            level: 0,
            maxLevel: Map.AreaPaths[nextArea].length,
        });
    }

    handleClickStage = () =>{
        if(this.props.modalIsOpen){
            this.props.handleCloseModal();
        }
    }

    handleOpenIntroduction = (info: {"name": string, "introduction": string}) =>{
        this.setState({
            areaInfo: info,
        });
    }

    handleClickAt = () =>{
        MicroCms.getSiteInfo((res: {[key: string]: {[key: string]: string | {[key: string]: string}}[]})=>{
            const info = res["contents"][0];
            this.props.handleOpenModal({
                "type": "whats",
                'introduction': typeof info["whats"] == 'string' ? info["whats"] : "",
                "imageUrl": typeof info["logo"] != 'string' ? info["logo"]["url"] : "",
            });
        });
    }

    moveStageTo = (x: number, y: number) =>{
        this.setState({x: x, y: y});
    }

    getRelativePostion = (num: number,  mode: string) =>{
        switch(mode){
            case "x":
                return document.documentElement.clientWidth/2 + num;
            case "y":
                return document.documentElement.clientHeight/2 + num;
        }
        return 0;
    }

    render(){
        let width = this.state.image != null ? this._mapHeight*this.state.image.width/this.state.image.height : 0;
        let tmpX = this.state.image != null ? width / 2 : 0;
        let areas: number[][] = Util.checkAndGetUndifined(this.state.areas);
        let isZoom = this.state.isZoom != null ? this.state.isZoom : false;
        let level = Util.checkAndGetUndifined(this.state.level);
        let maxLevel = Util.checkAndGetUndifined(this.state.maxLevel);

        const areaName = Util.checkAndGetUndifined(this.state.areaInfo)["name"];
        const areaIntro =  Util.checkAndGetUndifined(this.state.areaInfo)["introduction"];
        return(
            <Background>
                <Stage scaleX={this.state.scale} scaleY={this.state.scale} style={this.state.cursor} onMouseDown={this.handleDraging} onMouseUp={this.handleDraged} draggable={true}
                    x={this.state.x} y={this.state.y}width={document.documentElement.clientWidth} height={document.documentElement.clientHeight}>
                        <Layer>
                            <Image image={this.state.image} offsetX={tmpX} offsetY={this._mapHeight / 2} x={document.documentElement.clientWidth / 2} y={document.documentElement.clientHeight / 2} width={width} height={this._mapHeight} />
                            {isZoom && <Rect onClick={this.handleClickStage} opacity={0.34} fill="#095B80" offsetX={tmpX} offsetY={document.documentElement.clientHeight / 2} x={document.documentElement.clientWidth / 2} y={document.documentElement.clientHeight / 2} width={width} height={document.documentElement.clientHeight} />}
                        </Layer>
                        {
                            areas.map((area: number[], i)=>
                                <Area handleOpenIntroduction={this.handleOpenIntroduction} handleOpenModal={this.props.handleOpenModal} areaId={Map.AreaId[i]} nowArea={this.state.area} areaNum={i} isZoom={isZoom} level={this.state.level} images={Map.AreaPaths[i]} hoverImage={Map.AreaHoverPaths[i]} id={i} onClick={this.handleAreaClick} onMouseEnter={this.handlePlaceEnter} onMouseLeave={this.handlePlaceLeave}
                                    width={area[0]} height={area[1]} x={area[2]} y={area[3]} maxLevel={Map.AreaPaths[i].length} />
                            )
                        }
                        <Area onClick={this.handleClickAt} width={90} height={100} x={this.getRelativePostion(555, "x")} y={this.getRelativePostion(250, "y")} />
                </Stage>
                {isZoom && <ZoomoutBtn isZoom={isZoom} onClick={this.handleZoomout}>Back</ZoomoutBtn>}
                {/* <InfoBtn isZoom={isZoom}>?</InfoBtn> */}
                {isZoom && <BtnLabelFloor isZoom={isZoom}>floor</BtnLabelFloor>}
                {isZoom && level > 0 && <LevelPlusBtn onClick={this.handleLavelPlus} isZoom={isZoom}>＋</LevelPlusBtn>}
                {isZoom && maxLevel-1 > level && <LevelMinusBtn onClick={this.handleLavelMinus} isZoom={isZoom}>ー</LevelMinusBtn>}
                {isZoom && <BtnLabelArea isZoom={isZoom}>area</BtnLabelArea>}
                {isZoom && <AreaMovePlusBtn onClick={this.handleAreaMovePlus} isZoom={isZoom}>↑</AreaMovePlusBtn>}
                {isZoom && <AreaMoveMinusBtn onClick={this.handleAreaMoveMinus} isZoom={isZoom}>↓</AreaMoveMinusBtn>}
                {isZoom && <AreaIntroduction name={areaName} introduction={areaIntro} />}
            </Background>
        );
    }
}

export default Map;
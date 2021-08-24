import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import { Layer, Rect, Stage, Image } from "react-konva";
import Konva from "konva";
import Floor from "./F";
import { JsxElement } from "typescript";
import { throws } from "assert";
import Util from "../../lib/Util";
import MicroCms from "../../lib/microCms";
import Plan from "./Plan";
//microCMSから情報を取得
//stateに保存
//階層を見て，適切なeventを表示

type AreaProps = {
    id: number,
    areaId: string,
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
    events?: {[key: string]: string | {[key: string]: string}}[][]
};

class Area extends React.Component<AreaProps, AreaState>{
    constructor(props: AreaProps){
        super(props);

        let eventData: {[key: string]: string | {[key: string]: string}}[][] = [];
        let res = MicroCms.getEventsByAreaId(this.props.areaId, (res: {[key: string]: {[key: string]: string | {[key: string]: string}}[]})=>{
            let data: {[key: string]: string | {[key: string]: string}}[] = res["contents"];
            data.forEach((item) => {
                if(typeof item["floor"] == "number"){
                    if(!Array.isArray(eventData[item["floor"]])){
                        eventData[item["floor"]] = [];
                        eventData[item["floor"]].push(item);
                    }
                    else{
                        eventData[item["floor"]].push(item);
                    }
                }
            });
        });
        this.state = {
            images: [],
            events: eventData,
        };
        let images = this.state.images != null ? this.state.images : [];
        this.props.images.forEach((path)=>{
            Util.getHTMLImage(path, (image: HTMLImageElement)=>{
                images.push(image);
                this.setState({
                    images: images,
                });
            });
        });
    }

    static defaultProps: AreaProps = {
        id: 999,
        areaId: "",
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

        let elmEvent: ReactElement[] = [];
        if(this.state.events != null && Array.isArray(this.state.events[this.props.level])){
            let events = this.state.events[this.props.level];
            events.forEach((event)=>{
                if( typeof event["coord"] == "string" &&
                    typeof event["type"] == "string" &&
                    typeof event["title"] == "string" &&
                    typeof event["introduction"] == "string" &&
                    typeof event["onAir_at"] == "string" &&
                    typeof event["onAir_link"] == "string" &&
                    typeof event["archive_link"] == "string" &&
                    typeof event["group"] == "object"
                ){
                    let coord = event["coord"].split(",");
                    let x = parseInt(coord[0]);
                    let y = parseInt(coord[1]);
                    elmEvent.push(
                        <Plan type={event["type"]}
                            title={event["title"]}
                            introduction={event["introduction"]} 
                            onAirAt={event["onAir_at"]}
                            onAirLink={event["onAir_link"]}
                            archiveLink={event["archive_link"]}
                            group={event["group"]}
                            x={this.props.x + x}
                            y={this.props.y + y}
                            />
                    );
                }
            });
        }

        let checkNowArea = this.props.areaNum == this.props.nowArea && this.props.isZoom;
        return(
            <Layer>
                {checkNowArea && floor}
                {checkNowArea && this.props.areaNum==this.props.nowArea && this.props.isZoom && floor}
                {checkNowArea || !this.props.isZoom && <Rect onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onTap={this.handleClick}  onClick={this.handleClick}
                    width={this.props.width} height={this.props.height}
                    offsetX={this.props.width/2} offsetY={this.props.height/2} x={this.props.x} y={this.props.y} />}
                {checkNowArea && elmEvent}
            </Layer>
        );
    }
}

export default Area;
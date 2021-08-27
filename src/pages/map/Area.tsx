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
import Other from "../../assets/cssVars/Other";
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
    hoverImage: string,
    onClick: ((w: number, h: number, x: number, y: number, areaNum: number)=>void) | (()=>{}),
    onMouseEnter: ()=>{} | void,
    onMouseLeave: ()=>{} | void,
    info: {[key: string]: string},
    level: number,
    isZoom: boolean,
    areaNum: number,
    nowArea: number,
    maxLevel: number,
    handleOpenModal: (info: {[key: string]: string})=>void,
};

type AreaState = {
    images?: HTMLImageElement[],
    hoverImage?: HTMLImageElement,
    events?: {[key: string]: string | {[key: string]: string}}[][],
    isHover?: boolean,
};

class Area extends React.Component<AreaProps, AreaState>{
    private image: Konva.Image | null;

    constructor(props: AreaProps){
        super(props);
        this.image = new Konva.Image({image: undefined});

        let eventData: {[key: string]: string | {[key: string]: string}}[][] = [];
        let res = MicroCms.getEventsByAreaId(this.props.areaId, (res: {[key: string]: {[key: string]: string | {[key: string]: string}}[]})=>{
            let data: {[key: string]: string | {[key: string]: string}}[] = res["contents"];
            data.forEach((item) => {
                if(typeof item["floor"] == "number"){
                    let floor = parseInt(item["floor"]);
                    if(!Array.isArray(eventData[item["floor"]])){
                        eventData[floor] = [];
                        eventData[floor].push(item);
                    }
                    else{
                        eventData[floor].push(item);
                    }
                }
            });
        });
        this.state = {
            images: [],
            hoverImage: new window.Image(),
            events: eventData,
            isHover: false,
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
        Util.getHTMLImage(this.props.hoverImage, (image: HTMLImageElement)=>{
            this.setState({
                hoverImage: image,
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
        hoverImage: "",
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
        handleOpenModal: ()=>{},
    };

    handleClick = () =>{
        this.props.onClick(this.props.width, this.props.height, this.props.x, this.props.y, this.props.areaNum);
    }

    handleHover = () =>{
        this.setState({
            isHover: true,
        });
        if(this.image != null){
            this.image.to({
                opacity: 1,
                duration: 0.1,
            });
        }
    }

    handleHoverOut = () =>{
        this.setState({
            isHover: false,
        });
        if(this.image != null){
            this.image.to({
                opacity: 0,
                duration: 0.1,
            });
        }
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

        let tmpHoverImage = this.state.hoverImage != null ? this.state.hoverImage : new window.Image();
        let height = this.props.height;
        let width = height*tmpHoverImage.width/tmpHoverImage.height;
        let hoverImage = <Image ref={node=>{this.image = node}} opacity={0} image={tmpHoverImage} offsetX={width/2} offsetY={this.props.height/2} x={this.props.x} y={this.props.y} width={width} height={height} />;

        let elmEvent: ReactElement[] = [];
        if(this.state.events != null && Array.isArray(this.state.events[this.props.level])){
            let events = this.state.events[this.props.level];
            console.log(events);
            events.forEach((event)=>{
                if( typeof event["coord"] == "string" &&
                    typeof event["type"] == "string" &&
                    typeof event["introduction"] == "string" &&
                    typeof event["onAir_link"] == "string" &&
                    typeof event["group"] == "object"
                ){
                    let coord = event["coord"].split(",");
                    let x = parseInt(coord[0]);
                    let y = parseInt(coord[1]);
                    let archiveLink: string = "";
                    let title: string = "";
                    let onAirAt: string = "";
                    let offAirAt: string = "";
                    if(typeof event["archive_link"] == "string"){
                        archiveLink = event["archive_link"];
                    }
                    let imageUrl: string = "";
                    if(typeof event["image"] == "object" && typeof event["image"]["url"] == "string"){
                        imageUrl = event["image"]["url"];
                    }
                    if(typeof event["title"] == "string"){
                        title = event["title"];
                    }
                    if(typeof event["onAir_at"] == "string" &&
                        typeof event["offAir_at"] == "string"){
                        onAirAt = event["onAir_at"];
                        offAirAt = event["offAir_at"];
                    }
                    elmEvent.push(
                        <Plan type={event["type"]}
                            title={title}
                            introduction={event["introduction"]} 
                            onAirAt={onAirAt}
                            offAirAt={offAirAt}
                            onAirLink={event["onAir_link"]}
                            archiveLink={archiveLink}
                            group={event["group"]}
                            x={this.props.x + x}
                            y={this.props.y + y}
                            handleOpenModal={this.props.handleOpenModal}
                            onMouseEnter={this.props.onMouseEnter}
                            onMouseLeave={this.props.onMouseLeave}
                        />
                    );
                }
            });
        }

        let checkNowArea = this.props.areaNum == this.props.nowArea && this.props.isZoom;
        return(
            <Layer>
                {checkNowArea && this.props.areaNum==this.props.nowArea && this.props.isZoom && floor}
                {!this.props.isZoom && hoverImage}
                {checkNowArea || !this.props.isZoom &&
                    <Rect onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onTap={this.handleClick}  onClick={this.handleClick}
                        width={this.props.width} height={this.props.height} onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut}
                        offsetX={this.props.width/2} offsetY={this.props.height/2} x={this.props.x} y={this.props.y} />}
                {checkNowArea && elmEvent}
            </Layer>
        );
    }
}

export default Area;
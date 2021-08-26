import React, { ReactElement } from "react";
import { Image } from "react-konva";
import Util from "../../lib/Util";

type EventProps = {
    x: number,
    y: number,
    type: string,
    title: string,
    introduction: string,
    onAirAt: string,
    offAirAt: string,
    onAirLink: string,
    archiveLink: string,
    group: {[key: string]: string},
};
type EventState = {
    eventIcon?: HTMLImageElement,
    cmIcon?: HTMLImageElement,
    martIcon?: HTMLImageElement,
    altIcon?: HTMLImageElement,
};

class Plan extends React.Component<EventProps, EventState>{
    constructor(props: EventProps){
        super(props);

        this.state = {
            //企画　CM、アートマ、オルタナ
            eventIcon: new window.Image(),
            cmIcon: new window.Image(),
            martIcon: new window.Image(),
            altIcon: new window.Image(),
        };
        Util.getHTMLImage("test/star.png", (image)=>{
            this.setState({eventIcon: image});
        });
        Util.getHTMLImage("test/heart.png", (image)=>{
            this.setState({cmIcon: image});
        });
    }
    
    render(){
        let icons: {[key: string]: HTMLImageElement} = {
            'event': Util.checkAndGetUndifined(this.state.eventIcon),
            'cm': Util.checkAndGetUndifined(this.state.cmIcon),
        };
        let image: HTMLImageElement = icons[this.props.type];
        return(
            <Image image={image}  x={this.props.x} y={this.props.y} width={20} height={20} ></Image>
        );
    }
}

export default Plan;
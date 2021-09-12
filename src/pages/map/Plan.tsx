import moment from "moment";
import React from "react";
import { Image } from "react-konva";
import Util from "../../lib/Util";
import Konva from "konva";

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
    imageUrl: string,
    handleOpenModal: (info: {[key: string]: string})=>void,
    onMouseEnter: ()=>{} | void,
    onMouseLeave: ()=>{} | void,
};
type EventState = {
    eventIcon?: HTMLImageElement,
    showcaseIcon?: HTMLImageElement,
    cmIcon?: HTMLImageElement,
    marketIcon?: HTMLImageElement,
    altIcon?: HTMLImageElement,
    circleIcon?: HTMLImageElement,
    labIcon?: HTMLImageElement,
    photoIcon?: HTMLImageElement,
    easterIcon?: HTMLImageElement,
    presentIcon?: HTMLImageElement,
    bearIcon?: HTMLImageElement,
    deerIcon?: HTMLImageElement,
};

class Plan extends React.Component<EventProps, EventState>{
    private image: Konva.Image | null;
    private static opacity = 0.1;
    constructor(props: EventProps){
        super(props);
        this.image = new Konva.Image({image: undefined});

        this.state = {
            //企画　CM、アートマ、オルタナ
            eventIcon: new window.Image(),
            showcaseIcon: new window.Image(),
            cmIcon: new window.Image(),
            marketIcon: new window.Image(),
            altIcon: new window.Image(),
            circleIcon: new window.Image(),
            labIcon: new window.Image(),
            photoIcon: new window.Image(),
            easterIcon: new window.Image(),
            presentIcon: new window.Image(),
            bearIcon: new window.Image(),
            deerIcon: new window.Image(),
        };
        Util.getHTMLImage("main/modal/icons/event.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({eventIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/showcase.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({showcaseIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/cm.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({cmIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/market.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({marketIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/alt.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({altIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/circle.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({circleIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/lab.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({labIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/photo.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({photoIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/easter.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({easterIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/present.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({presentIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/deer.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({deerIcon: image});
            }
        });
        Util.getHTMLImage("main/modal/icons/bear.png", (image)=>{
            if(!Array.isArray(image)){
                this.setState({bearIcon: image});
            }
        });
    }

    handleClick = () =>{
        let onAirAt = this.props.onAirAt;
        if(onAirAt != null){
            let momentOnAir = moment(onAirAt);
            onAirAt = momentOnAir.format('H:mm')
        }
        let data = {
            type: this.props.type,
            title: this.props.title,
            introduction: this.props.introduction,
            onAirAt: onAirAt,
            offAirAt: this.props.offAirAt,
            onAirLink: this.props.onAirLink,
            archiveLink: this.props.archiveLink,
            imageUrl: this.props.imageUrl,
        };
        let group = {};
        if(this.props.group != null){
            group = {
                groupName: this.props.group['name'],
                groupPlace: this.props.group['act_at'],
                groupIntroduction: this.props.group['introduction'],
                groupTwitter: this.props.group['twitter'],
                groupInstagram: this.props.group['instagram'],
            };
        }
        Object.assign(data, group);
        this.props.handleOpenModal(data);
    }

    handleHover = () =>{
        if(this.props.type == "easter"){
            this.image?.to({
                opacity: 1,
                duration: 0.1,
            });
        }
    }

    handleHoverOut = () =>{
        if(this.props.type == "easter"){
            this.image?.to({
                opacity: Plan.opacity,
                duration: 0.1,
            });
        }
    }
    
    render(){
        let icons: {[key: string]: HTMLImageElement} = {
            'event': Util.checkAndGetUndifined(this.state.eventIcon),
            'paris': Util.checkAndGetUndifined(this.state.eventIcon),
            'interactive': Util.checkAndGetUndifined(this.state.eventIcon),
            'showcase': Util.checkAndGetUndifined(this.state.showcaseIcon),
            'cm': Util.checkAndGetUndifined(this.state.cmIcon),
            'market': Util.checkAndGetUndifined(this.state.marketIcon),
            'alt': Util.checkAndGetUndifined(this.state.altIcon),
            'circle': Util.checkAndGetUndifined(this.state.circleIcon),
            'lab': Util.checkAndGetUndifined(this.state.labIcon),
            'photo': Util.checkAndGetUndifined(this.state.photoIcon),
            'easter': Util.checkAndGetUndifined(this.state.easterIcon),
            'present': Util.checkAndGetUndifined(this.state.presentIcon),
            'deer': Util.checkAndGetUndifined(this.state.deerIcon),
            'bear': Util.checkAndGetUndifined(this.state.bearIcon),
        };
        let image: HTMLImageElement = icons[this.props.type];
        return(
            <Image onMouseOver={this.handleHover} onMouseOut={this.handleHoverOut} opacity={this.props.type=="easter"?Plan.opacity:1} ref={node=>{this.image = node}} image={image} onMouseEnter={this.props.onMouseEnter} onMouseLeave={this.props.onMouseLeave} onTap={this.handleClick} onClick={this.handleClick}  x={this.props.x} y={this.props.y} width={13} height={13} ></Image>
        );
    }
}

export default Plan;
import React from "react";
import styled, {css} from "styled-components";
import Util from "../../lib/Util";

type _CloudProps = {
    right: string,
    left: string,
    top: string,
    bottom: string,
    size: number,
    start: number,
    duration: number,
};

const _Cloud = styled.img<_CloudProps>`
    position: fixed;
    right: ${props => props.right ? props.right : 'auto'};
    left: ${props => props.left ? props.left : 'auto'};
    top: ${props => props.top ? props.top : 'auto'};
    bottom: ${props => props.bottom ? props.bottom : 'auto'};
    width: ${props => props.size ? props.size + 'px' : 0};
    height: auto;
    animation: translate ease alternate infinite;
    animation-delay: ${props => props.start ? props.start + 's' : 0};
    animation-duration: ${props => props.duration ? props.duration + 's' : 0};
    @media screen and (max-width: 750px){
        width: ${props => props.size ? props.size * 0.5 + 'px' : 0};
    }
    @keyframes translate{
        0%{
            transform: translateX(0%);
        }
        100%{
            transform: translateX(10%);
        }
    }
`;

type CloudProps = {
    cloudNum: number,
    right: string,
    left: string,
    top: string,
    bottom: string,
    isZoom: boolean,
};

type CloudState = {};

class Cloud extends React.Component<CloudProps, CloudState>{
    private path: string  = "";
    private size: number;
    private start: number;
    private duration: number;

    constructor(props: CloudProps){
        super(props);

        this.path = Util.getImgPath() + "/main/cloud";

        this.size = Cloud.getRandomArbitrary(150, 280);
        this.start = Cloud.getRandomArbitrary(0, 3);
        this.duration = Cloud.getRandomArbitrary(3, 7);
    }
    
    static defaultProps: CloudProps = {
        cloudNum: 1,
        right: 'auto',
        left: 'auto',
        top: 'auto',
        bottom: 'auto',
        isZoom: false,
    };

    private static getRandomArbitrary = (min: number, max: number) =>{
        return Math.random() * (max - min) + min;
    }

    render(){
        let src = this.path + this.props.cloudNum + ".png";

        let isZoom = Util.checkAndGetUndifined(this.props.isZoom);
        return(
            <div>
                {!isZoom && <_Cloud duration={this.duration} start={this.start} size={this.size} right={this.props.right} left={this.props.left} top={this.props.top} bottom={this.props.bottom} src={src} alt="雲" />}
            </div>
        );
    }
}

export default Cloud;
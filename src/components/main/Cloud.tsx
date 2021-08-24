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
};

type CloudState = {};

class Cloud extends React.Component<CloudProps, CloudState>{
    private path: string  = "";

    constructor(props: CloudProps){
        super(props);

        this.path = Util.getImgPath() + "/main/cloud";
    }
    
    static defaultProps: CloudProps = {
        cloudNum: 1,
        right: 'auto',
        left: 'auto',
        top: 'auto',
        bottom: 'auto',
    };

    render(){
        let src = this.path + this.props.cloudNum + ".png";
        function getRandomArbitrary(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }
        let size = getRandomArbitrary(150, 280);
        let start = getRandomArbitrary(0, 3);
        let duration = getRandomArbitrary(3, 7);
        return(
            <div>
                <_Cloud duration={duration} start={start} size={size} right={this.props.right} left={this.props.left} top={this.props.top} bottom={this.props.bottom} src={src} alt="雲" />
            </div>
        );
    }
}

export default Cloud;
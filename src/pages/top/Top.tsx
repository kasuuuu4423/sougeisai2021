import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";
import Util from "../../lib/Util";

type TopProps = {
    mapDidMount: boolean,
};
type TopState = {
    loadStatus?: boolean,
    enter?: boolean,
    display?: string,
};

class Top extends React.Component<TopProps, TopState>{
    constructor(props: TopProps){
        super(props);

        this.state = {
            loadStatus: false,
            enter: false,
            display: "block",
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                loadStatus: true,
            });
            if(window.sessionStorage.getItem('isSkip') == 'true'){
                this.handleClickEnter();
            }
            else{
                window.sessionStorage.setItem('isSkip', 'true');
            }
        }, 2499);
    }

    handleClickEnter = () =>{
        this.setState({
            enter: true,
        });
        setTimeout(()=>{
            this.setState({
                display: "none",
            });
        }, 200);
    }

    render(){
        let loadPath = window.location.origin+"/img/top/loading.gif";
        let logoPath = window.location.origin+"/img/top/logo.png";
        let scuLogoPath = window.location.origin+"/img/nav/scu.png";
        let CloudPath1 = window.location.origin+"/img/top/cloud_L.png";
        let CloudPath2 = window.location.origin+"/img/top/cloud_R.png";
        let loadStatus = this.props.mapDidMount && (this.state.loadStatus != null ? this.state.loadStatus : false);
        const enter = Util.checkAndGetUndifined(this.state.enter);
        const display = Util.checkAndGetUndifined(this.state.display);
        return(
            <Container display={display} enter={enter} didMount={loadStatus}>
                <Back display={display} className="back" enter={enter} didMount={loadStatus} />
                <Cloud display={display} className="cloud" enter={enter} didMount={loadStatus} src={CloudPath1}/>
                <Cloud2 display={display} className="cloud" enter={enter} didMount={loadStatus} src={CloudPath2}/>
                <Logo display={display} className="logo" enter={enter} didMount={loadStatus} src={logoPath} alt="桑芸祭 ロゴ" />
                <ScuLogo display={display} className="scu" enter={enter} didMount={loadStatus} src={scuLogoPath} alt="桑芸祭 ロゴ" />
                <Enter display={display} className="enter" onClick={this.handleClickEnter} enter={enter} didMount={loadStatus}>ENTER</Enter>
                <Loading display={display} className="load" enter={enter} didMount={loadStatus} src={loadPath} alt="" />
            </Container>
        );
    }
}

export default Top;

type didMount = {
    didMount: boolean,
    enter: boolean,
    display: string,
};


const Container = styled.div<didMount>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    visibility: visible;
    opacity: 1;
    transition: 1s cubic-bezier(0.97, 0, 1, 0.4);
    ${(props) =>
        props.enter
            ? css`
                visibility: hidden;
                opacity: 0;
            `
    :''}
`;

const Back = styled.div<didMount>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${Color.WHITE};
    visibility: visible;
    opacity: 1;
    transition: ${Other.TRANSITION};
    //display: ${(props)=> props.display ? props.display : "block"};
    ${(props) =>
        props.didMount
            ? css`
                visibility: hidden;
                opacity: 0;
            `
    :''}
`;

const Cloud = styled.img<didMount>`
    position: fixed;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    transition: 1s cubic-bezier(0.5, 0.07, 0.69, 0.98);
    width: 95%;
    height: 100%;
    object-fit: cover;
    object-position: right;
    ${(props) =>
        props.enter
            ? css`
                transform: translate(-100%, -50%);
            `
    :''}
    @media screen and (max-width: 750px){
        
    }
`;

const Cloud2 = styled(Cloud)`
    left: 5%;
    right: auto;
    object-position: left;
    ${(props) =>
        props.enter
            ? css`
                transform: translate(100%, -50%);
            `
    :''}
`;
const Loading = styled.img<didMount>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 245px;
    height: auto;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.didMount
            ? css`
                display: none;
            `
    :''}
    @media screen and (max-width: 750px){
        width: 150px;
    }
`;

const Logo = styled.img<didMount>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: auto;
    transition: ${Other.TRANSITION};
    opacity: 0;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.didMount
            ? css`
                opacity: 1;
                visibility: visible;
            top: 45%;
            `
    :''}
    ${(props) =>
        props.enter
            ? css`
                opacity: 0;
                visibility: hidden;
            `
    :''}
`;

const ScuLogo = styled(Logo)`
    top: auto;
    bottom: 10px;
    transform: translateX(-50%);
    width: 80px;
`;

const Enter = styled.div<didMount>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;
    transition: ${Other.TRANSITION};
    opacity: 0;
    font-size: 20px;
    cursor: pointer;
    ${(props) =>
        props.didMount
            ? css`
                opacity: 1;
                top: 70%;
            `
    :''}
    ${(props) =>
        props.enter
            ? css`
                opacity: 0;
            `
    :''}
`;
import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";
import Util from "../../lib/Util";

type TopProps = {};
type TopState = {
    loadStatus?: boolean,
    enter?: boolean,
};

class Top extends React.Component<TopProps, TopState>{
    constructor(props: TopProps){
        super(props);

        this.state = {
            loadStatus: false,
            enter: false,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                loadStatus: true,
            });
        }, 2499);
    }

    handleClickEnter = () =>{
        this.setState({
            enter: true,
        });
    }

    render(){
        let loadPath = window.location.origin+"/img/top/loading.gif";
        let logoPath = window.location.origin+"/img/top/logo.png";
        let scuLogoPath = window.location.origin+"/img/nav/scu.png";
        let CloudPath1 = window.location.origin+"/img/nav/scu.png";
        let CloudPath2 = window.location.origin+"/img/nav/scu.png";
        let loadStatus = this.state.loadStatus != null ? this.state.loadStatus : false;
        const enter = Util.checkAndGetUndifined(this.state.enter);
        return(
            <Container>
                <Cloud enter={enter} didMount={loadStatus} src={CloudPath1}/>
                <Cloud2 enter={enter} didMount={loadStatus} src={CloudPath2}/>
                <Logo enter={enter} didMount={loadStatus} src={logoPath} alt="桑芸祭 ロゴ" />
                <ScuLogo enter={enter} didMount={loadStatus} src={scuLogoPath} alt="桑芸祭 ロゴ" />
                <Enter onClick={this.handleClickEnter} enter={enter} didMount={loadStatus}>ENTER</Enter>
                <Back enter={enter} didMount={loadStatus} />
                <Loading enter={enter} didMount={loadStatus} src={loadPath} alt="" />
            </Container>
        );
    }
}

export default Top;

type didMount = {
    didMount: boolean,
    enter: boolean,
};


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
`;

const Back = styled.div<didMount>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${Color.WHITE};
    ${(props) =>
        props.didMount
            ? css`
                display: none;
            `
    :''}
`;

const Cloud = styled.img<didMount>`
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: 1.5s;
    width: 60%;
    height: 100%;
    ${(props) =>
        props.enter
            ? css`
                transform: translate(-100%, -50%);
            `
    :''}
`;

const Cloud2 = styled(Cloud)`
    left: auto;
    right: 0;
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
    ${(props) =>
        props.didMount
            ? css`
                opacity: 1;
            top: 45%;
            `
    :''}
    ${(props) =>
        props.enter
            ? css`
                opacity: 0;
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
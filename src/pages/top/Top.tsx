import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";

type TopProps = {};
type TopState = {
    loadStatus?: boolean,
};

class Top extends React.Component<TopProps, TopState>{
    constructor(props: TopProps){
        super(props);

        this.state = {
            loadStatus: false,
        };
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                loadStatus: true,
            });
        }, 2499);
    }

    render(){
        let loadPath = window.location.origin+"/img/top/loading.gif";
        let logoPath = window.location.origin+"/img/top/logo.png";
        let loadStatus = this.state.loadStatus != null ? this.state.loadStatus : false;
        return(
            <Container>
                <Logo didMount={loadStatus} src={logoPath} alt="桑芸祭 ロゴ" />
                <Loading didMount={loadStatus} src={loadPath} alt="" />
            </Container>
        );
    }
}

export default Top;


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: ${Color.WHITE};
`;

type didMount = {
    didMount: boolean,
};
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
                opacity: 0;
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
            `
    :''}
`;
import React, { ReactElement } from "react";
import styled from "styled-components";
import Map from "../../pages/map/Map";
import Cloud from "./Cloud";

const _Main = styled.main`
    overflow: hidden;
`;

type MainProps = {
    handleIsZoom: ()=>void,
    handleIsZoomout: ()=>void,
    isZoom: boolean,
};
type MainState = {};

class Main extends React.Component<MainProps, MainState>{
    private cloud_x: number[] = [-40, 30, 150];
    private cloud_y: number[] = [50, 130, 60];
    constructor(props: MainProps){
        super(props);
    }

    render(){
        let width = document.body.clientWidth;
        let mediaQuery = width > 750;
        return(
            <_Main>
                <Map handleIsZoom={this.props.handleIsZoom} handleIsZoomout={this.props.handleIsZoomout}></Map>
                <Cloud isZoom={this.props.isZoom} cloudNum={1} right={this.cloud_x[0].toString() + "px"} top={this.cloud_y[0].toString() + "px"} ></Cloud>
                <Cloud isZoom={this.props.isZoom} cloudNum={1} right={this.cloud_x[1].toString() + "px"} bottom={this.cloud_y[1].toString() + "px"} ></Cloud>
                {mediaQuery && <Cloud isZoom={this.props.isZoom} cloudNum={3} left={this.cloud_x[2].toString() + "px"} bottom={this.cloud_y[2].toString() + "px"} ></Cloud>}
            </_Main>
        );
    }
}

export default Main;
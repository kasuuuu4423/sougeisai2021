import React, { ReactElement } from "react";
import styled from "styled-components";
import Map from "../../pages/map/Map";
import Cloud from "./Cloud";
import Modal from "./Modal";
import Top from "../../pages/top/Top";
import Util from "../../lib/Util";
import Timetable from "./Timetable";
import { time } from "console";

const _Main = styled.main`
    overflow: hidden;
`;

type MainProps = {
    handleIsZoom: ()=>void,
    handleIsZoomout: ()=>void,
    isZoom: boolean,
    timetableIsOpen?: boolean,
    handleOpenTimetalbe: ()=>void,
    handleCloseTimetalbe: ()=>void,
    handleOpenModal: (info: {[key: string]: string})=>void,
    handleCloseModal: ()=>void,
    modalIsOpen?: boolean,
    modalInfo?: {[key: string]: string},
};
type MainState = {
};

class Main extends React.Component<MainProps, MainState>{
    private cloud_x: number[] = [-40, 30, 150];
    private cloud_y: number[] = [50, 130, 60];
    constructor(props: MainProps){
        super(props);

        this.state = {
            modalIsOpen: false,
        };
    }

    handleCloseTimetable = () =>{
    }

    render(){
        let width = document.body.clientWidth;
        let mediaQuery = width > 750;
        let modalIsOpen = Util.checkAndGetUndifined(this.props.modalIsOpen);
        const timetableIsOpen = this.props.timetableIsOpen != null ? this.props.timetableIsOpen : false;
        return(
            <_Main>
                {/* <Top/> */}
                <Map modalIsOpen={modalIsOpen} handleOpenModal={this.props.handleOpenModal} handleCloseModal={this.props.handleCloseModal} handleIsZoom={this.props.handleIsZoom} handleIsZoomout={this.props.handleIsZoomout}></Map>
                <Modal handleOpenTimetable={this.props.handleOpenTimetalbe} handleCloseModal={this.props.handleCloseModal} info={this.props.modalInfo} isOpen={modalIsOpen}></Modal>
                <Timetable handleCloseTimetable={this.props.handleCloseTimetalbe} isOpen={timetableIsOpen} handleOpenModal={this.props.handleOpenModal} handleCloseModal={this.props.handleCloseModal}></Timetable>
                <Cloud isZoom={this.props.isZoom} cloudNum={1} right={this.cloud_x[0].toString() + "px"} top={this.cloud_y[0].toString() + "px"} ></Cloud>
                <Cloud isZoom={this.props.isZoom} cloudNum={1} right={this.cloud_x[1].toString() + "px"} bottom={this.cloud_y[1].toString() + "px"} ></Cloud>
                {mediaQuery && <Cloud isZoom={this.props.isZoom} cloudNum={3} left={this.cloud_x[2].toString() + "px"} bottom={this.cloud_y[2].toString() + "px"} ></Cloud>}
            </_Main>
        );
    }
}

export default Main;
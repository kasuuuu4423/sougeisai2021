import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Main from "./components/main/Main";
import Util from "./lib/Util";

const Container = styled.div`
`;

type SiteState = {
  isZoom?: boolean,
  timetableIsOpen: boolean,
  modalIsOpen?: boolean,
  modalInfo?: {[key: string]: string},
  mapBrightness: number,
};

class Site extends React.Component<{}, SiteState> {
  constructor(props: {}){
    super(props);

    this.state = {
      isZoom: false,
      timetableIsOpen: false,
      mapBrightness: 1,
    };
  }

  handleOpenModal = (info: {[key: string]: string}) =>{
    this.setState({
      modalIsOpen: true,
      modalInfo: info,
    });
    Util.ifSp(()=>{
      this.setState({
        mapBrightness: 0.5,
      });
    });
  }

  handleCloseModal = () =>{
    this.setState({
      modalIsOpen: false,
    });
    Util.ifSp(()=>{
      this.setState({
        mapBrightness: 1,
      });
    });
  }


  handleIsZoom = () =>{
    this.setState({
      isZoom: true,
    });
  }
  handleIsZoomout = () =>{
    this.setState({
      isZoom: false,
    });
  }

  handleOpenTimetable = () =>{
    this.setState({
      timetableIsOpen: true,
    });
    Util.ifSp(()=>{
      this.setState({
        mapBrightness: 0.5,
      });
    });
  }

  handleClsoeTimetable = () =>{
    this.setState({
      timetableIsOpen: false,
    });
    Util.ifSp(()=>{
      this.setState({
        mapBrightness: 1,
      });
    });
  }

  handleMapGrayout = () =>{
  }

  render() {
    let isZoom = Util.checkAndGetUndifined(this.state.isZoom);
    const mapBrightness = Util.checkAndGetUndifined(this.state.mapBrightness);
    return (
      <Container className="container">
        {!Util.checkAndGetUndifined(this.state.isZoom) && <Header handleOpenModal={this.handleOpenModal} handleOpenTImetable={this.handleOpenTimetable}></Header>}
        <Main mapBrightness={mapBrightness} modalIsOpen={this.state.modalIsOpen} modalInfo={this.state.modalInfo} handleCloseModal={this.handleCloseModal} handleOpenModal={this.handleOpenModal} timetableIsOpen={this.state.timetableIsOpen} handleOpenTimetalbe={this.handleOpenTimetable} handleCloseTimetalbe={this.handleClsoeTimetable} isZoom={isZoom} handleIsZoom={this.handleIsZoom} handleIsZoomout={this.handleIsZoomout}></Main>
      </Container>
    );
  }
}

// ========================================

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);

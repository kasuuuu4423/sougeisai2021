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
};

class Site extends React.Component<{}, SiteState> {
  constructor(props: {}){
    super(props);

    this.state = {
      isZoom: false,
    };
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

  render() {
    return (
      <Container className="container">
        {!Util.checkAndGetUndifined(this.state.isZoom) && <Header></Header>}
        <Main handleIsZoom={this.handleIsZoom} handleIsZoomout={this.handleIsZoomout}></Main>
      </Container>
    );
  }
}

// ========================================

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);

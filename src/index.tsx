import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import styled from "styled-components";
import Header from "./components/Header/Header";
import Main from "./components/main/Main";

const Container = styled.div`
`;

class Site extends React.Component {
  render() {
    return (
      <Container className="container">
        <Header></Header>
        <Main></Main>
      </Container>
    );
  }
}

// ========================================

ReactDOM.render(
  <Site />,
  document.getElementById('root')
);

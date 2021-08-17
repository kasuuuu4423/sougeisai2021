import React from "react";
import styled from "styled-components";
import Margin from "../../assets/cssVars/Margin";
import Color from "../../assets/cssVars/Color";
import Hamburger from "./Hamburger";
import Nav from "./Nav";

const _Header = styled.header`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
`;

type HeaderProps = {};

type HeaderState = {
    status?: boolean,
};

class Header extends React.Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps){
        super(props);
        this.state = {
            status: false,
        };
    }

    toggleStatus = () =>{
        this.setState({status: !this.state.status});
    }

    render(){
        return(
            <_Header>
                <Nav status={this.state.status} ></Nav>
                <Hamburger status={this.state.status} toggleState={this.toggleStatus} ></Hamburger>
            </_Header>
        );
    }
}

export default Header;
import React from "react";
import styled, {css} from "styled-components";
import Margin from "../../assets/cssVars/Margin";
import Color from "../../assets/cssVars/Color";
import Hamburger from "./Hamburger";
import Nav from "./Nav";

type _HeaderProps = {
    isOpen: boolean,
};

const _Header = styled.header<_HeaderProps>`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    width: 0;
    ${(props) =>
        props.isOpen
            ? css`
                width: auto;
            `
    :''}
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
        let status = this.state.status != null ? this.state.status : false;
        return(
            <_Header isOpen={status} >
                <Nav status={this.state.status} ></Nav>
                <Hamburger status={this.state.status} toggleState={this.toggleStatus} ></Hamburger>
            </_Header>
        );
    }
}

export default Header;
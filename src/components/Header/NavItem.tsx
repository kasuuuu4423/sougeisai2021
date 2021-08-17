import React from "react";
import styled, {css} from "styled-components";
import Color from "../../assets/cssVars/Color";
import FontSize from "../../assets/cssVars/FontSize";
import Margin from "../../assets/cssVars/Margin";

type NavItemProps = {
    link?: string,
    text?: string,
};

const Anker = styled.a`
    color: ${Color.BLACK};
    text-decoration: none;
    font-weight: 600;
    font-size: ${FontSize.M};
    &::hover{
        color: ${Color.BLACK};
        opacity: 0.8;
    }
`;

const ListItem = styled.li`
    display: block;
    padding: 0;
    margin-bottom: ${Margin.M};
`;

class NavItem extends React.Component<NavItemProps>{
    constructor(props: NavItemProps){
        super(props);
    }

    render(){
        return(
            <ListItem>
                <Anker href={this.props.link}>{this.props.text}</Anker>
            </ListItem>
        );
    }
}

export default NavItem;
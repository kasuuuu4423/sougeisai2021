import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import Color from "../../assets/cssVars/Color";
import FontSize from "../../assets/cssVars/FontSize";
import Margin from "../../assets/cssVars/Margin";
import Util from "../../lib/Util";


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
    width: 100%;
`;

type NavItemProps = {
    link?: string,
    text?: string | ReactElement,
    target: string,
    onClick: ()=>void,
};

class NavItem extends React.Component<NavItemProps>{
    constructor(props: NavItemProps){
        super(props);
    }

    static defaultProps: NavItemProps = {
        target: "",
        onClick: ()=>{}
    }

    render(){
        return(
            <ListItem>
                <Anker onClick={this.props.onClick} target={this.props.target} href={this.props.link}>
                    {this.props.text}
                </Anker>
            </ListItem>
        );
    }
}

export default NavItem;
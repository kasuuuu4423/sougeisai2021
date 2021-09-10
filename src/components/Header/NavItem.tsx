import React, { ReactElement } from "react";
import styled from "styled-components";
import Color from "../../assets/cssVars/Color";
import FontSize from "../../assets/cssVars/FontSize";
import Margin from "../../assets/cssVars/Margin";
import MicroCms from "../../lib/microCms";


const Anker = styled.a`
    color: ${Color.BLACK};
    text-decoration: none;
    font-weight: 600;
    font-size: ${FontSize.M};
    cursor: pointer;
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
    type: string,
    onClick: ()=>void,
    handleOpenModal: (info: {[key: string]: string})=>void,
};

class NavItem extends React.Component<NavItemProps>{
    static defaultProps: NavItemProps = {
        target: "",
        type: "",
        onClick: ()=>{},
        handleOpenModal: ()=>{},
    }

    handleClick = () =>{
        let siteInfo: {[key: string]: string} = {};
        MicroCms.getSiteInfo((res: {[key: string]: {[key: string]: string | {[key: string]: string}}[]})=>{
            const info = res["contents"][0];
            switch(this.props.type){
                case 'about':
                    siteInfo = {
                        'type': 'about',
                        'introduction': typeof info["introduction"] == 'string' ? info["introduction"] : "",
                    };
                    this.props.handleOpenModal(siteInfo);
                    break;
                case 'whats':
                    siteInfo = {
                        'type': 'whats',
                        'introduction': typeof info["whats"] == 'string' ? info["whats"] : "",
                        'imageUrl': typeof info["logo"] != 'string'? info["logo"]["url"] : "",
                    };
                    this.props.handleOpenModal(siteInfo);
                    break;
                case 'howToWalk':
                    siteInfo = {
                        'type': 'howToWalk',
                        'introduction0': typeof info["how_to_walk0"] == 'string' ? info["how_to_walk0"] : "",
                        'imageUrl0': typeof info["how_to_walk0_img"] != 'string'? info["how_to_walk0_img"]["url"] : "",
                        'introduction1': typeof info["how_to_walk1"] == 'string' ? info["how_to_walk1"] : "",
                        'imageUrl1': typeof info["how_to_walk1_img"] != 'string'? info["how_to_walk1_img"]["url"] : "",
                    };
                    this.props.handleOpenModal(siteInfo);
                    break;
            }
        });
        this.props.onClick();
    }

    render(){
        return(
            <ListItem>
                {this.props.link !== "" &&
                <Anker onClick={this.handleClick} target={this.props.target} href={this.props.link}>
                    {this.props.text}
                </Anker>}
                {this.props.link === "" &&
                <Anker onClick={this.handleClick} target={this.props.target}>
                    {this.props.text}
                </Anker>}
            </ListItem>
        );
    }
}

export default NavItem;
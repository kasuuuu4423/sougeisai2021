import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import Color from "../../assets/cssVars/Color";
import FontSize from "../../assets/cssVars/FontSize";
import Margin from "../../assets/cssVars/Margin";
import MicroCms from "../../lib/microCms";
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
    type: string,
    onClick: ()=>void,
    handleOpenModal: (info: {[key: string]: string})=>void,
};

class NavItem extends React.Component<NavItemProps>{
    constructor(props: NavItemProps){
        super(props);
    }

    static defaultProps: NavItemProps = {
        target: "",
        type: "",
        onClick: ()=>{},
        handleOpenModal: ()=>{},
    }

    handleClick = () =>{
        this.props.onClick();
        let siteInfo: {[key: string]: string} = {};
        MicroCms.getSiteInfo((res: {[key: string]: {[key: string]: string | {[key: string]: string}}[]})=>{
            const info = res["contents"][0];
            console.log(info);
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
                        'introduction': typeof info["how_to_walk1"] == 'string' ? info["how_to_walk1"] : "",
                        'imageUrl': typeof info["how_to_walk1_image"] != 'string'? info["how_to_walk1_image"]["url"] : "",
                    };
                    this.props.handleOpenModal(siteInfo);
                    break;
            }
        });
    }

    render(){
        return(
            <ListItem>
                <Anker onClick={this.handleClick} target={this.props.target} href={this.props.link}>
                    {this.props.text}
                </Anker>
            </ListItem>
        );
    }
}

export default NavItem;
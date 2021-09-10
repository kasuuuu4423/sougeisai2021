import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import Margin from "../../assets/cssVars/Margin";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";
import NavItem from "./NavItem";

type NavState = {
};

type NavProps = {
    status?: boolean,
    handleOpenTImetable: ()=>void,
    itemOnClick: ()=>void,
    handleOpenModal: (info: {[key: string]: string})=>void,
};

class Nav extends React.Component<NavProps, NavState> {
    data: {
        text: string | ReactElement,
        link: string,
        type: string,
        onClick: ()=>void,
    }[] = [
        {
            text: 'サイトについて',
            link: '',
            type: 'about',
            onClick: this.props.itemOnClick
        },
        {
            text: '桑芸祭2021とは？',
            link: '',
            type: 'whats',
            onClick: this.props.itemOnClick
        },
        {
            text: 'サイトの歩き方',
            link: '',
            type: 'howToWalk',
            onClick: this.props.itemOnClick
        },
        {
            text: 'イベントタイムテーブル',
            link: '',
            type: '',
            onClick: this.props.handleOpenTImetable,
        },
        {
            text: 'アートマーケット',
            link: 'https://sougeisai21.base.shop/',
            type: '',
            onClick: this.props.itemOnClick
        },
        {
            text: <img src="" alt="" />,
            link: 'https://www.scu.ac.jp/',
            type: '',
            onClick: this.props.itemOnClick
        }
    ];

    constructor(props: NavProps){
        super(props);

        this.data[5]['text'] = <img src={window.location.origin+'/img/nav/scu.png'} alt="" />;
    }

    render(){
        let status = this.props.status != null ? this.props.status : false;
        let list: JSX.Element[] = [];
        for(let i in this.data){
            list.push(<NavItem key={i} type={this.data[i].type} handleOpenModal={this.props.handleOpenModal} onClick={this.data[i].onClick} target={i === "5" || i === "4" ? "_blank" : ""} link={typeof this.data[i].link == 'string' ? this.data[i].link : ""} text={this.data[i].text}/>);
        }
        return(
            <WrapNav isOpen={status}>
                <List>
                    {list}
                </List>
            </WrapNav>
        );
    }
}

export default Nav;

type WrapNavProps = {
    isOpen: boolean | false;
};

const WrapNav = styled.nav<WrapNavProps>`
    transition: ${Other.TRANSITION};
    transform: translateX(-100%);
    height: calc(100vh - 122px);
    width: 300px;
    margin-top: 122px;
    border-radius: 0 10px 0 0;
    background: ${Color.LIGHTGRAY};
    @media screen and (max-width: 750px){
        height: calc(100vh - 66px);
        margin-top: 66px;
    }
    ${(props) =>
        props.isOpen
            ? css`
                transform: translateX(0%);
            `
    :''}
`;

const List = styled.ul`
    padding: 75px ${Margin.M};
    margin: 0;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    height: 72%;
`;
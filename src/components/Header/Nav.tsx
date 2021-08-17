import React from "react";
import styled, {css} from "styled-components";
import Margin from "../../assets/cssVars/Margin";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";
import NavItem from "./NavItem";

type WrapNavProps = {
    isOpen: boolean | false;
};

const WrapNav = styled.nav<WrapNavProps>`
    transition: ${Other.TRANSITION};
    transform: translateX(-100%);
    height: 100vh;
    width: 300px;
    background: ${Color.LIGHTGRAY};
    padding: 50px ${Margin.M};
    ${(props) =>
        props.isOpen
            ? css`
                transform: translateX(0%);
            `
    :''}
`;

const List = styled.ul`
    padding: 0;
    margin: 0;
    margin-top: ${Margin.L};
`;

type NavState = {
};

type NavProps = {
    status?: boolean,
};

class Nav extends React.Component<NavProps, NavState> {
    data = [
        {
            text: 'サイトについて',
            link: '#',
        },
        {
            text: '桑芸祭って何？',
            link: '#',
        },
        {
            text: 'サイトの使い方',
            link: '#',
        },
        {
            text: 'イベントタイムテーブル',
            link: '#',
        },
        {
            text: 'etc...',
            link: '#',
        },
    ];

    constructor(props: NavProps){
        super(props);
    }

    render(){
        let status = this.props.status != null ? this.props.status : false;
        let list: JSX.Element[] = [];
        for(let i in this.data){
            list.push(<NavItem link={this.data[i].link} text={this.data[i].text}></NavItem>);
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
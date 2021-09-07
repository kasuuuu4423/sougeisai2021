import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons";
import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import Color from "../../assets/cssVars/Color";
import Other from "../../assets/cssVars/Other";
import FontSize from "../../assets/cssVars/FontSize";

const iconStyle: React.CSSProperties = { fontSize: "2rem" };

type TitleProps = {
    subTitle: string,
    title: string,
};

const _Title = styled.div`
    text-align: center;
    line-height: 2rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    h1{
        width: 100%;
    }
    @media screen and (max-width: 750px){
        h1{
            font-size: 1.2rem;
        }
    }
`;

export class Title extends React.Component<TitleProps>{
    constructor(props: TitleProps){
        super(props);
    }

    static defaultProps: TitleProps = {
        subTitle: "",
        title: "",
    };

    render(){
        return(
            <_Title>
                {this.props.subTitle != null && <div>{this.props.subTitle}</div>}
                {this.props.title != null && <h1>{this.props.title}</h1>}
            </_Title>
        );
    }
}

type GroupProps = {
    name: string,
    instagram: string,
    twitter: string,
    place: string,
    introduction: string,
    status: string,
    hideDt: boolean,
    hideDd: boolean,
    hideSNS: boolean,
};

type _GroupProps = {
    hideDt: boolean,
    hideDd: boolean,
}

const _Group = styled.div<_GroupProps>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    p{
        margin: 0;
    }
    dt.name{
        width: 100% !important;
    }
    dd.name{
        margin-left: 0 !important;
        font-size: 2rem;
        width: calc(100% - 5rem);
        margin-bottom: 0;
        @media screen and (max-width: 750px){
            font-size: 1.2rem;
        }
        ${(props) =>
            props.hideDt
                ? css`
                    text-align: center !important;
                    width: 100%;
                `
        :''}
    }
    .border{
        width: 100%;
        height: 1px;
        border-bottom: solid 2px ${Color.WHITE};
    }
    .intro{
        width: 100%;
        display: flex;
        justify-content: left;
    }
    .status{
        width: 100%;
    }
    .place{
        font-size: ${FontSize.LM};
    }
    .sns{
        align-items: center;
        display: flex;
        margin-left: auto;
        ${(props) =>
            props.hideDd
                ? css`
                    margin-left: auto;
                    margin-right: auto;
                `
        :''}
        a{
            display: inline-block;
            &:first-child{
                margin-right: 10px;
            }
        }
    }
`;

export class Group extends React.Component<GroupProps>{
    constructor(props: GroupProps){
        super(props);
    }

    static defaultProps: GroupProps = {
        name: '',
        instagram: '',
        twitter: '',
        place: '',
        introduction: '',
        status: '',
        hideDt: false,
        hideDd: false,
        hideSNS: false,
    };

    render(){
        return(
            <_Group hideDd={this.props.hideDd} hideDt={this.props.hideDt} className="wrap_group">
                {!this.props.hideDt && <dt className="name">企画団体</dt>}
                {!this.props.hideDd && <dd className="name">{this.props.name}</dd>}
                {!this.props.hideSNS && <div className="sns">
                    {this.props.twitter != "" && <a href={this.props.twitter} target="_blank"><FontAwesomeIcon style={iconStyle} icon={faTwitter}></FontAwesomeIcon></a>}
                    {this.props.instagram != "" && <a href={this.props.instagram} target="_blank"><FontAwesomeIcon style={iconStyle} icon={faInstagram}></FontAwesomeIcon></a>}
                </div>}
                <div className="border"></div>
                {this.props.introduction!= "" && <div className="intro">
                    <dt>活動内容</dt>
                    <dd><p>{this.props.introduction}</p></dd>
                </div>}
                <dt>活動場所</dt>
                <dd className="place">{this.props.place}</dd>
                {this.props.status != '' && <div className="status">
                    <dt>現在の活動状況</dt>
                    <dd>{this.props.status}</dd>
                </div>}
            </_Group>
        );
    }
}

type IntroductionProps = {
    introduction: string,
    hideTitle: boolean,
    textAlign: string,
    lineHeight: number,
};

const _Introduction = styled.div<{
    textAlign: string,
    lineHeight: number,
    }>`
    display: flex;
    dd{
        margin-left: 20px;
        p{
            margin: 0;
            white-space: pre-wrap;
            text-align: ${(props) => props.textAlign ? props.textAlign : "left"};
            line-height: ${(props) => props.lineHeight ? props.lineHeight : 1}rem;
        }
    }
`;

export class Introduction extends React.Component<IntroductionProps>{
    constructor(props: IntroductionProps){
        super(props);
    }

    static defaultProps: IntroductionProps = {
        introduction: '',
        hideTitle: false,
        textAlign: "left",
        lineHeight: 1,
    };

    render(){
        return(
            <_Introduction lineHeight={this.props.lineHeight} textAlign={this.props.textAlign} className="introduction">
                {!this.props.hideTitle && <dt>説明</dt>}
                <dd>
                    <p>
                        {this.props.introduction}
                    </p>
                </dd>
            </_Introduction>
        );
    }
}

type ImageProps = {
    imagePath: string,
    isContain: boolean,
};

const _Image = styled.div`
    text-align: center;
    width: 100%;
    .wrap_img{
        width: 100%;
        text-align: center;
        img{
            max-width: ${200*1.5}px;
            width: 80%;
            height: ${150*1.5}px;
            object-fit: cover;
        }
        &.contain{
            img{
                object-fit: contain;
            }
        }
    }
`;

export class Image extends React.Component<ImageProps>{
    constructor(props: ImageProps){
        super(props);
    }

    static defaultProps: ImageProps = {
        imagePath: '',
        isContain: false,
    };

    render(){
        return( 
            <_Image>
                {this.props.imagePath != '' && 
                    <div className={this.props.isContain ? "wrap_img contain" : "wrap_img"}>
                        <img src={this.props.imagePath} alt="" />
                    </div>
                }
            </_Image>
        );
    }
}

type LinksProps = {
    title: string,
    Links: {[key: string]: string},
    time: string,
    hideTitle: boolean,
};

const _Links = styled.div`
    width: 100%;
    dd{
        margin-left: 0 !important;
        &.links{
            div.link{
                display: grid;
                grid-template-columns: .4fr 0.6fr;
                div{
                    display: block;
                    width: 100%;
                    grid-column: 1 / 2;
                    margin: auto;
                    text-align: right;
                    span{
                        display: inline-block;
                        margin-right: 5px;
                        font-size: ${FontSize.MS};
                    }
                }
                a{
                    display: block;
                    grid-column: 2 / 3;
                    width: 40%;
                    height: 20px;
                    padding-left: 5px;
                    background: ${Color.WHITE};
                    transition: ${Other.TRANSITION};
                    &:hover{
                        width: 50%;
                        color: ${Color.BLACK};
                    }
                }
            }
        }
    }
`;

export class Links extends React.Component<LinksProps>{
    constructor(props: LinksProps){
        super(props);
    }

    static defaultProps: LinksProps = {
        title: '配信時間',
        time: '',
        hideTitle: false,
        Links: {},
    };

    render(){
        return(
            <_Links>
                {!this.props.hideTitle && <dt className="w-100">{this.props.title + "："} {this.props.time != '' ? this.props.time : ""}〜</dt>}
                <dd className="links">
                    {Object.keys(this.props.Links).map((value, index) => {
                        return(
                            <div className="link">
                                <div><span>{value}</span></div>
                                <a href={this.props.Links[value]} target="_blank">Watch!!</a>
                            </div>
                        );
                    })}
                </dd>
            </_Links>
        );
    }
}

type ToTimetableProps = {
    handleOpenTimetable: ()=>void,
    handleCloseModal: ()=>void,
};

const _ToTimetable = styled.div`
    display: grid;
    grid-template-columns: 1fr 2rem;
    column-gap: 10px;
    align-items: center;
    width: 100%;
    cursor: pointer;
    span{
        text-align: right;
    }
    .btn_toTimetable{
        cursor: pointer;
        margin: 0;
    }
`;

export class ToTimetable extends React.Component<ToTimetableProps>{
    constructor(props: ToTimetableProps){
        super(props);
    }

    static defaultProps: ToTimetableProps = {
        handleOpenTimetable: ()=>{},
        handleCloseModal: ()=>{},
    };

    handleClick = () =>{
        this.props.handleCloseModal();
        this.props.handleOpenTimetable();
    }

    render(){
        return(
            <_ToTimetable onClick={this.handleClick}>
                <span>その他のイベントタイムスケジュールへ</span>
                <div className="btn_toTimetable"><FontAwesomeIcon style={iconStyle} icon={faClock}></FontAwesomeIcon></div>
            </_ToTimetable>
        );
    }
}


type LabLinkProps = {
    name: string,
    youtube_id: string,
};

const _LabLink = styled.div`
`;

export class LabLink extends React.Component<LabLinkProps>{
    constructor(props: LabLinkProps){
        super(props);
    }

    static defaultProps: LabLinkProps = {
        name: "",
        youtube_id: "",
    };

    render(){
        return(
            <_LabLink className="labLink">
                <a target="_blank" href={"https://www.youtube.com/watch?v=" + this.props.youtube_id}>
                    <div className="wrap_img">
                        <img src={"http://img.youtube.com/vi/" + this.props.youtube_id + "/mqdefault.jpg"} alt="" />
                    </div>
                    <div className="name">{this.props.name}</div>
                </a>
            </_LabLink>
        );
    }
}


export const WrapLabLink = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    gap: 30px 20px;
    overflow-y: scroll;
    .introduction{
        grid-column: 1/3;
        dd{
            padding: 0;
            margin: 0;
        }
    }
    .labLink{
        width: 100%;
        .wrap_img{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .name{
            text-align: center;
            font-weight: 700;
        }
    }
`;

import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import Color from "../../assets/cssVars/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons";
import Other from "../../assets/cssVars/Other";
import {Title, Group, Introduction, Image, Links, ToTimetable} from "./ModalItems";

type ModalProps = {
    isOpen: boolean,
    info: {[key: string]: string} | {[key: string]: string | {[key: string]: string}}[],
    handleCloseModal: ()=>void,
    handleOpenTimetable: ()=>void,
    /*
    type: this.props.type,
    title: this.props.title,
    introduction: this.props.introduction,
    onAirAt: this.props.onAirAt,
    offAirAt: this.props.offAirAt,
    onAirLink: this.props.onAirLink,
    archiveLink: this.props.archiveLink,
    groupName: this.props.group['name'],
    groupPlace: this.props.group['act_at'],
    groupTwitter: this.props.group['twitter'],
    groupInstagram: this.props.group['instagram'],
    */
};

type ModalState = {};

class Modal extends React.Component<ModalProps, ModalState>{
    private iconStyle: React.CSSProperties = { fontSize: "2rem" };

    constructor(props: ModalProps){
        super(props);
    }

    static defaultProps: ModalProps = {
        isOpen: false,
        info: {},
        handleCloseModal: ()=>{},
        handleOpenTimetable: ()=>{},
    };

    render(){
        let item: ReactElement = <div></div>;
        let type: string = "";
        if(!(this.props.info instanceof  Array) && this.props.info['type']){
            item = this.getModalContent(this.props.info);
            type = this.props.info['type'];
        }

        return(
            <_Modal className={type} isOpen={this.props.isOpen}>
                {item}
            </_Modal>
        );
    }

    getModalContent = (info: {[key: string]: string}) =>{
        switch(info['type']){
            case 'event':
                return <div className="container event">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="イベント"></Title>
                    <dl>
                        <Group hideDt={true} name={info['title']} place={info['groupPlace']}></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Links title="配信時間" time={info['onAirAt']} Links={{
                            'LIVE配信': info['onAirLink'],
                            '追いかけ視聴': info['archiveLink'],
                        }}/>
                        <ToTimetable handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'showcase':
                return <div className="container showcase">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']}></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction="演劇"></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Links title="配信時間" time={info['onAirAt']} Links={{
                            'LIVE配信': info['onAirLink'],
                            '追いかけ視聴': info['archiveLink'],
                        }}/>
                        <ToTimetable handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'market':
                return <div className="container market">
                    <div className="back"></div>
                        <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                        <Title title="アートマーケット"></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction="演劇"></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Links title="オンライン販売先" Links={{
                            'BASE': info['onAirLink'],
                        }}/>
                    </dl>
                </div>;
            case 'cm':
                return <div className="container cm">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="CM"></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction=""></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Links title="配信時間" time={info['onAirAt']} Links={{
                            'LIVE配信': info['onAirLink'],
                            '追いかけ視聴': info['archiveLink'],
                        }}/>
                        <ToTimetable handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'alt':
                return <div className="container alt">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="オルタナティブ"></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction=""></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Links hideTitle={true} title="" Links={{
                            '掲載LINK': info['onAirLink'],
                        }}/>
                        <ToTimetable handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'circle':
                return <div className="container circle">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['groupName']} subTitle="サークル紹介"/>
                    <dl>
                        <Group status="あｓｄふぁｓｄ" hideDd={true} hideDt={true} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction=""></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <ToTimetable handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'easter':
                return <div className="container easter">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']} subTitle="イースターエッグ"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                    </dl>
                </div>;
            case 'photo':
                return <div className="container easter">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']} subTitle="フォトライブラリー"/>
                    <dl>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Introduction introduction={info['introduction']}></Introduction>
                    </dl>
                </div>;
            case 'about':
                return <div className="container static about">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="サイトについて"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                    </dl>
                </div>;
            case 'whats':
                return <div className="container static whats">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="桑芸祭2021 とは？"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                    </dl>
                </div>;
            case 'howToWalk':
                return <div className="container static howToWalk">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="サイトの歩き方"/>
                    <dl>
                        {info['imageUrl'] != "" && <Image imagePath={info['imageUrl']}/>}
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                    </dl>
                </div>;
            default:
                return <div></div>;
        }
    }
}

export default Modal;

type _ModalProps = {
    isOpen: boolean,
};
export const _Modal = styled.div<_ModalProps>`
    position: fixed;
    top: 50%;
    right: 30px;
    transform: translate(150%, -50%);
    background: ${Color.BLUEGREEN};
    z-index: 1;
    color: ${Color.WHITE};
    max-width: 450px;
    max-height: 90vh;
    width: calc(100% - 50px);
    border-radius: 10px;
    transition: ${Other.TRANSITION};
    ${(props) =>
        props.isOpen
            ? css`
                transform: translate(0%, -50%);
            `
    :''}
    &.event, &.showcase{
        background: ${Color.BLUEGREEN};
    }
    &.circle{
        background: ${Color.CIRCLE};
    }
    &.easter{
        background: ${Color.EASTER};
    }
    &.market{
        background: ${Color.MARKET};
    }
    &.photo{
        background: ${Color.PHOTO};
    }
    &.lab{
        background: ${Color.LAB};
    }
    a{
        color: ${Color.WHITE};
        text-decoration: none;
        &:hover{
            color: ${Color.WHITE};
        }
    }
    .container{
        position: relative;
        padding: 20px;
        display: grid;
        row-gap: 10px;
        grid-template-rows: 4rem calc(80vh - 5rem);
        &.static{
            dl{
                overflow: unset;
                justify-content: center;
                dd{
                    text-align: center;
                    width: 100%;
                    margin: auto;
                }
                p{
                    text-align: center;
                }
            }
            &.whats{
                dl{
                    .wrap_img{
                        background: ${Color.WHITE};
                        border: 4px solid ${Color.DARKBLUEGREEN};
                        border-radius: 10px;
                        padding: 20px;
                        width: calc(100% - 48px);
                        img{
                            width: 30%;
                            height: auto;
                            object-fit: contain;
                        }
                    }
                }
            }
        }
        .back{
            position: absolute;
            z-index: -1;
            height: calc(100% + 10px);
            width: calc(100% + 10px);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: solid 3px ${Color.WHITE};
            border-radius: 10px;
        }
        .x{
            position: absolute;
            top: 0;
            left: 0;
            width: 120px;
            transform: translate(-50%, -50%);
            img{
                width: 100%;
            }
        }
        dl{
            overflow-y: scroll;
            height: 100%;
            margin: 0;
        }
        h1{
            text-align: center;
            align-self: center;
            margin: 0;
        }
        dl{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            dt, dd, div{
                margin-bottom: 10px;
            }
            dd{
                text-align: left;
                margin-left: 20px;
            }
        }
        ul{
            padding-left: 55px;
        }
    }
`;
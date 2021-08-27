import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import Color from "../../assets/cssVars/Color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {faTwitter, faInstagram} from "@fortawesome/free-brands-svg-icons";
import Other from "../../assets/cssVars/Other";

type ModalProps = {
    isOpen: boolean,
    info: {[key: string]: string},
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

    render(){
        let item: ReactElement = <div></div>;
        if(this.props.info['type']){
            item = this.getModalContent(this.props.info);
        }

        return(
            <_Modal isOpen={this.props.isOpen}>
                {item}
            </_Modal>
        );
    }

    getModalContent = (info: {[key: string]: string}) =>{
        switch(info['type']){
            case 'event':
                return <div className="container event">
                    <div className="back"></div>
                    <h1>{info['title']}</h1>
                    <dl>
                        <div className="wrap_groupe">
                            <dt>企画団体</dt>
                            <dd>{info['groupName']}</dd>
                            <div className="sns">
                                {info['groupTwitter'] != null && <a href={info['groupTwitter']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faTwitter}></FontAwesomeIcon></a>}
                                {info['groupInstagram'] != null && <a href={info['groupInstagram']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faInstagram}></FontAwesomeIcon></a>}
                            </div>
                        </div>
                        <dt>活動場所</dt>
                        <dd>{info['groupPlace']}</dd>
                        <dt>企画説明</dt>
                        <dd>
                            <p>
                                {info['introduction']}
                            </p>
                        </dd>
                        <div className="wrap_img">
                            <img src="https://via.placeholder.com/150" alt="" />
                        </div>
                        <dt className="w-100">配信時間</dt>
                        <dd className="links">
                            <div>LIVE配信 
                                <a href={info['onAirLink']} target="_blank">Watch!!</a>
                            </div>
                            <div>追いかけ視聴 
                                <a href={info['archiveLink']} target="_blank">Watch!!</a>
                            </div>
                        </dd>
                        <div className="toTimetable">
                            <span>その他のイベントタイムスケジュールへ</span>
                            <div className="btn_toTimetable"><FontAwesomeIcon style={this.iconStyle} icon={faClock}></FontAwesomeIcon></div>
                        </div>
                    </dl>
                </div>;
            case 'market':
                return <div className="container event">
                    <div className="back"></div>
                    <h1>アートマーケット</h1>
                    <dl>
                        <div className="wrap_groupe">
                            <dt>出店団体</dt>
                            <dd>{info['groupName']}</dd>
                            <div className="sns">
                                {info['groupTwitter'] != null && <a href={info['groupTwitter']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faTwitter}></FontAwesomeIcon></a>}
                                {info['groupInstagram'] != null && <a href={info['groupInstagram']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faInstagram}></FontAwesomeIcon></a>}
                            </div>
                        </div>
                        <dt>活動場所</dt>
                        <dd>{info['groupPlace']}</dd>
                        <dt>商品紹介</dt>
                        <dd>
                            <p>
                                {info['introduction']}
                            </p>
                        </dd>
                        <div className="wrap_img">
                            <img src="https://via.placeholder.com/150" alt="" />
                        </div>
                        <dt className="w-100"></dt>
                        <dd className="links">
                            <div>オンライン販売
                                <a href={info['marketLink']} target="_blank">BASE</a>
                            </div>
                        </dd>
                    </dl>
                </div>;
            case 'cm':
                return <div className="container event">
                    <div className="back"></div>
                    <h1>CM</h1>
                    <dl>
                        <div className="wrap_groupe">
                            <dt>企画団体</dt>
                            <dd>{info['groupName']}</dd>
                            <div className="sns">
                                {info['groupTwitter'] != null && <a href={info['groupTwitter']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faTwitter}></FontAwesomeIcon></a>}
                                {info['groupInstagram'] != null && <a href={info['groupInstagram']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faInstagram}></FontAwesomeIcon></a>}
                            </div>
                        </div>
                        <dt>活動場所</dt>
                        <dd>{info['groupPlace']}</dd>
                        <dt>CMについて</dt>
                        <dd>
                            <p>
                                {info['introduction']}
                            </p>
                        </dd>
                        <div className="wrap_img">
                            <img src="https://via.placeholder.com/150" alt="" />
                        </div>
                        <dt className="w-100">配信時間</dt>
                        <dd className="links">
                            <div>LIVE配信 
                                <a href={info['onAirLink']} target="_blank">Watch!!</a>
                            </div>
                            <div>追いかけ視聴 
                                <a href={info['archiveLink']} target="_blank">Watch!!</a>
                            </div>
                        </dd>
                        <div className="toTimetable">
                            <span>その他のイベントタイムスケジュールへ</span>
                            <div className="btn_toTimetable"><FontAwesomeIcon style={this.iconStyle} icon={faClock}></FontAwesomeIcon></div>
                        </div>
                    </dl>
                </div>;
            case 'alt':
                return <div className="container event">
                    <div className="back"></div>
                    <h1>オルタナティブ</h1>
                    <dl>
                        <div className="wrap_groupe">
                            <dt>企画団体</dt>
                            <dd>{info['groupName']}</dd>
                            <div className="sns">
                                {info['groupTwitter'] != null && <a href={info['groupTwitter']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faTwitter}></FontAwesomeIcon></a>}
                                {info['groupInstagram'] != null && <a href={info['groupInstagram']} target="_blank"><FontAwesomeIcon style={this.iconStyle} icon={faInstagram}></FontAwesomeIcon></a>}
                            </div>
                        </div>
                        <dt>活動場所</dt>
                        <dd>{info['groupPlace']}</dd>
                        <dt>企画説明</dt>
                        <dd>
                            <p>
                                {info['introduction']}
                            </p>
                        </dd>
                        <div className="wrap_img">
                            <img src="https://via.placeholder.com/150" alt="" />
                        </div>
                        <dt className="w-100"></dt>
                        <dd className="links">
                            <div>掲載LINK 
                                <a href={info['onAirLink']} target="_blank">Watch!!</a>
                            </div>
                        </dd>
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
const _Modal = styled.div<_ModalProps>`
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
        grid-template-rows: 2rem calc(80vh - 2rem);
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
        dl{
            overflow-y: scroll;
            height: 100%;
            margin: 0;
        }
    }
    .event{
        h1{
            text-align: center;
            margin: 0;
        }
        dl{
            display: flex;
            flex-wrap: wrap;
            dt, dd, div{
                margin-bottom: 10px;
            }
            dt{
                width: 30%;
            }
            dd{
                width: 70%;
                margin: 0;
                font-size: 120%;
                font-weight: 600;
                p{
                    font-size: 80%;
                }
            }
            .w-100{
                width: 100%;
            }
            .wrap_groupe{
                display: grid;
                grid-template-columns: 1fr 80px;
                grid-template-rows: repeat(2, 1fr);
                width: 100%;
                dt{
                    grid-row: 1/2;
                }
                dd{
                    grid-row: 2/3;
                    border-bottom: solid 1px ${Color.WHITE};
                    padding-bottom: 10px;
                }
                .sns{
                    grid-row: 1/3;
                    align-items: center;
                    display: flex;
                    a{
                        display: inline-block;
                        &:first-child{
                            margin-right: 10px;
                        }
                    }
                }
            }
            .wrap_img{
                width: 100%;
                text-align: center;
                img{
                    max-width: ${200*1.5}px;
                    width: 80%;
                    height: ${150*1.5}px;
                    object-fit: cover;
                }
            }
            .links{
                width: 100%;
                text-align: center;
                div{
                    display: grid;
                    grid-template-columns: 1fr 50%;
                    column-gap: 10px;
                    text-align: right;
                    align-items: center;
                    a{
                        display: inline-block;
                        text-align: left;
                        width: 40%;
                        height: 1rem;
                        background: ${Color.WHITE};
                        transition: ${Other.TRANSITION};
                        color: rgba(0,0,0,0);
                        font-weight: 400;
                        font-size: 80%;
                        padding: 0 5px;
                        &:hover{
                            width: 50%;
                            color: ${Color.BLACK};
                        }
                    }
                }
            }
            .toTimetable{
                display: grid;
                grid-template-columns: 1fr 2rem;
                column-gap: 10px;
                align-items: center;
                width: 100%;
                span{
                    text-align: right;
                }
                .btn_toTimetable{
                    cursor: pointer;
                    margin: 0;
                }
            }
        }
    }
`;
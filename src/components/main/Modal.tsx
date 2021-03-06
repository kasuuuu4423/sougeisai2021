import React, { ReactElement } from "react";
import styled, {css} from "styled-components";
import Color from "../../assets/cssVars/Color";
import FontSize from "../../assets/cssVars/FontSize";
import Other from "../../assets/cssVars/Other";
import {Title, Group, Introduction, Image, Links, ToTimetable, LabLink, WrapLabLink, Present} from "./ModalItems";
import MicroCms from "../../lib/microCms";

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

type ModalState = {
    labs: {"name": string, "youtube_id": string}[],
};

class Modal extends React.Component<ModalProps, ModalState>{
    private iconStyle: React.CSSProperties = { fontSize: "2rem" };

    constructor(props: ModalProps){
        super(props);
        MicroCms.getLabs((res: {[key: string]: {[key: string]: string}[]})=>{
            const labs = res["contents"].map(lab => ({"name": lab["name"], "youtube_id": lab["youtube_id"]}));
            this.setState({
                labs: labs,
            });
        });
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
                    <Title title="????????????"></Title>
                    <dl>
                        <Group hideDt={true} name={info['title']}></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        {info['onAirLink'] !== "" && <Links title="????????????" time={info['onAirAt']} Links={{
                            'LIVE??????': info['onAirLink'],
                            '??????????????????': info['archiveLink'],
                        }}/>}
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'interactive':
                return <div className="container event">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="????????????"/>
                    <dl>
                        <Group hideDt={true} name={info['title']}></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        {info['onAirLink'] !== "" && <Links hideTitle={true} time={info['onAirAt']} Links={{
                            'LINK': info['onAirLink'],
                        }}/>}
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'paris':
                return <div className="container event">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="????????????"/>
                    <dl>
                        <Group hideDt={true} name={info['title']}></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        {info['onAirLink'] !== "" && <Links hideTitle={true} time={info['onAirAt']} Links={{
                            'LINK': info['onAirLink'],
                        }}/>}
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'showcase':
                return <div className="container showcase">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="??????????????????"></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction={info['groupIntroduction']}></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image isContain={true} imagePath={info['imageUrl']}/>}
                        <Links title="????????????" time={info['onAirAt']} Links={{
                            'LIVE??????': info['onAirLink'],
                            '??????????????????': info['archiveLink'],
                        }}/>
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'market':
                return <div className="container market">
                    <div className="back"></div>
                        <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                        <Title title="????????????????????????"></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction={info['groupIntroduction']}></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        <Links title="????????????????????????" Links={{
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
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        <Links title="" hideTitle={true} Links={{
                            'LIVE??????': info['onAirLink'],
                            '??????????????????': info['archiveLink'],
                        }}/>
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'alt':
                return <div className="container alt">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="?????????????????????"></Title>
                    <dl>
                        <Group name={info['groupName']} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction=""></Group>
                        <Introduction introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        <Links hideTitle={true} title="" Links={{
                            '??????LINK': info['onAirLink'],
                        }}/>
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'circle':
                return <div className="container circle">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['groupName']} subTitle="??????????????????"/>
                    <dl>
                        <Group hideDd={true} hideDt={true} twitter={info['groupTwitter']} instagram={info['groupInstagram']} place={info['groupPlace']} introduction={info['groupIntroduction']}/>
                        {info['introduction'] !== "" && <Introduction title="????????????" introduction={info['introduction']}/>}
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        <Links hideTitle={true} title="" Links={{
                            'LINK': info['onAirLink'],
                        }}/>
                        <ToTimetable handleCloseModal={this.props.handleCloseModal} handleOpenTimetable={this.props.handleOpenTimetable}></ToTimetable>
                    </dl>
                </div>;
            case 'easter':
                return <div className="container easter">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']} subTitle="????????????????????????"/>
                    <dl>
                        <Introduction lineHeight={2} textAlign="center" hideTitle={true} introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                    </dl>
                </div>;
            case 'deer':
                return <div className="container easter">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']} subTitle="????????????????????????"/>
                    <dl>
                        <Introduction lineHeight={2} textAlign="center" hideTitle={true} introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                    </dl>
                </div>;
            case 'bear':
                return <div className="container easter">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']} subTitle="????????????????????????"/>
                    <dl>
                        <Introduction lineHeight={2} textAlign="center" hideTitle={true} introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                    </dl>
                </div>;
            case 'photo':
                return <div className="container easter">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title={info['title']} subTitle="???????????????????????????"/>
                    <dl>
                        {info['imageUrl'] !== "" && <Image imagePath={info['imageUrl']}/>}
                        <Introduction textAlign={"center"} hideTitle={true} introduction={info['introduction']}></Introduction>
                    </dl>
                </div>;
            case 'about':
                return <div className="container about">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="?????????????????????"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                    </dl>
                </div>;
            case 'whats':
                return <div className="container whats">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="?????????2021 ?????????"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                        {info['imageUrl'] !== "" && <Image isContain={true} imagePath={info['imageUrl']}/>}
                    </dl>
                </div>;
            case 'howToWalk':
                return <div className="container howToWalk">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="?????????????????????"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction0']}></Introduction>
                        {info['imageUrl0'] !== "" && <Image isContain={true} imagePath={info['imageUrl0']}/>}
                        <Introduction hideTitle={true} introduction={info['introduction1']}></Introduction>
                        {info['imageUrl1'] !== "" && <Image isContain={true} imagePath={info['imageUrl1']}/>}
                    </dl>
                </div>;
            case 'lab':
                const labs = this.state.labs != null ? this.state.labs : [];
                return <div className="container lab">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="???????????????"/>
                    <WrapLabLink>
                        <Introduction hideTitle={true} introduction={info['introduction']}></Introduction>
                        {labs.map(lab =>
                            <LabLink name={lab["name"]} youtube_id={lab["youtube_id"]} />
                        )}
                    </WrapLabLink>
                </div>;
            case 'present':
                return <div className="container present">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseModal} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <Title title="?????????????????????"/>
                    <dl>
                        <Introduction hideTitle={true} introduction={info['introduction']} />
                        <Present></Present>
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
    max-width: 500px;
    max-height: 90vh;
    width: calc(100% - 60px);
    border-radius: 10px;
    transition: ${Other.TRANSITION};
    @media screen and (max-width: 750px){
        top: calc(50% + 30px);
    }
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
    &.easter, &.bear, &.deer{
        background: ${Color.EASTER};
        dl{
            align-content: center;
            text-align: center;
        }
    }
    &.market{
        background: ${Color.MARKET};
    }
    &.photo{
        background: ${Color.PHOTO};
        dl{
            align-content: center;
        }
    }
    &.lab{
        background: ${Color.LAB};
    }
    &.day1{
        background: ${Color.BLUEGREEN};
    }
    &.day2{
        background: ${Color.LIGHTPURPLE};
    }
    &.present{
        background: ${Color.PRESENT};
        dl{
            display: grid !important;
            grid-template-columns: 1fr;
            align-items: center;
            align-content: center;
            justify-content: center;
            .introduction{
                width: 100%;
                justify-content: center;
            }
        }
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
    @media screen and (max-width: 750px){
        grid-template-rows: 4rem calc(65vh - 4rem);
    }
        &.static{
            dl{
                overflow: unset;
                justify-content: center;
                padding-right: 0;
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
            cursor: pointer;
            img{
                width: 100%;
            }
            @media screen and (max-width: 750px){
                width: 100px;
                left: 20px;
            }
        }
        dl{
            overflow-y: scroll;
            padding: 0 10px;
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
            justify-content: center;
            dt, dd, div{
                &:not(:last-child){
                    margin-bottom: 10px;
                }
            }
            dt{
                font-size: ${FontSize.LM};
                @media screen and (max-width: 750px){
                    font-size: ${FontSize.M};
                }
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
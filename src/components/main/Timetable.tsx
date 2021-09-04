import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import {_Modal} from "./Modal";
import { Links  } from "./ModalItems";
import MicroCms from "../../lib/microCms";
import moment from "moment";
import Color from "../../assets/cssVars/Color";
import Util from "../../lib/Util";
import Other from "../../assets/cssVars/Other";

const startHour = 0;
const StartMin = 0;
const start = startHour + ":" + StartMin;
const endHour = 24;
const endMin = 0;
const end = startHour + ":" + StartMin;

type TimetableProps = {
    handleOpenModal: (info: {[key: string]: string})=>void,
    handleCloseModal?: ()=>void,
    handleCloseTimetable?: ()=>void,
    isOpen: boolean,
};
type TimetableState = {
    tableItems?: eventItem[][],
    day?: number,
};

type modalData = {
    type: string,
    title: string,
    introduction: string,
    onAir_at: string,
    offAir_at: string,
    onAir_link: string,
    archive_link: string,
    group: {[key: string]: string}
};

type eventItem = {
    "day": number,
    "handleOpenModal": (info: {[key: string]: string})=>void,
    "start": string,
    "end": string,
    "startHour": string,
    "startMin": string,
    "endHour": string,
    "endMin": string,
    "diff": string,
    "data": {[key: string]: string},
    "isEnd": boolean,
};

class Timetable extends React.Component<TimetableProps, TimetableState>{
    constructor(props: TimetableProps){
        super(props);
        this.state = {
            tableItems: [[], []],
            day: 0,
        };

        const Day = Util.checkAndGetUndifined(this.state.day);

        const res = MicroCms.getEventsEvent((res: {[key: string]: {[key: string]: string}[]})=>{
            const contents = res["contents"];
            let eventsInfo: {[key: string]: string | {[key: string]: string}}[] = [];
            contents.forEach((content: {[key: string]: string}) => {
                let start = moment(content['onAir_at']).toObject();
                let end = moment(content['offAir_at']).toObject();
                let diff = moment({'hour': start.hours, 'minute': start.minutes}).diff(moment({'hour': end.hours, 'minute': end.minutes}), 'minute');
                eventsInfo.push({
                    start: start.hours.toString() + ":" + (start.minutes.toString() != '0' ? start.minutes.toString() : '00'),
                    end: end.hours.toString() + ":" + (end.minutes.toString() != '0' ? end.minutes.toString() : '00'),
                    startHour: start.hours.toString(),
                    startMin: start.minutes.toString(),
                    endHour: end.hours.toString(),
                    endMin: end.minutes.toString(),
                    diff: diff.toString(),
                    data: content,
                });
            });
            eventsInfo = this.sortByTime(eventsInfo);
            
            let tableItems: eventItem[][] = [[],[]];
            eventsInfo.forEach((info, i) => {
                tableItems[typeof info["data"] != 'string' ? parseInt(info["data"]["day"]) : 0].push(
                    {
                        "day": Util.checkAndGetUndifined(this.state.day),
                        "handleOpenModal": this.handleOnClick,
                        "start": typeof info["start"] == 'string' ? info["start"] : "",
                        "end": typeof info["end"] == 'string' ? info["end"] : "",
                        "startHour": typeof info["startHour"] == 'string' ? info["startHour"] : "",
                        "startMin": typeof info["startMin"] == 'string' ? info["startMin"] : "",
                        "endHour": typeof info["endHour"] == 'string' ? info["endHour"] : "",
                        "endMin": typeof info["endMin"] == 'string' ? info["endMin"] : "",
                        "diff": typeof info["diff"] == 'string' ? info["diff"] : "",
                        "data": typeof info["data"] != 'string' ? info["data"] : {},
                        "isEnd": i == eventsInfo.length-1 ? true : false,
                    }
                );
            });
            this.setState({
                tableItems: tableItems,
            });
        });
    }

    private sortByTime = (events: {[key: string]: string | {[key: string]: string}}[]) =>{
        let sortFlag = true;
        while(sortFlag){
            [events, sortFlag] = this._sortByTime(events);
        }
        return events;
    }

    private _sortByTime = (events: {[key: string]: string | {[key: string]: string}}[]) =>{
        let sortFlag = false;
        let basis: {[key: string]: string | {[key: string]: string}} = events[0];
        let eventTime0: moment.Moment = moment();
        if(typeof basis["startMin"] == "string" && typeof basis["startHour"] == "string"){
            eventTime0 = moment({hour: parseInt(basis["startHour"]), minute: parseInt(basis["startMin"])});
        }
        events.forEach((e, i)=>{
            if(i != events.length-1){
                let e2 = events[i+1];
                let eventTime1: moment.Moment = moment();
                if(typeof e["startMin"] == "string" && typeof e["startHour"] == "string"){
                    eventTime1 = moment({hour: parseInt(e["startHour"]), minute: parseInt(e["startMin"])});
                }
                let eventTime2: moment.Moment = moment();
                if(typeof e2["startMin"] == "string" && typeof e2["startHour"] == "string"){
                    eventTime2 = moment({hour: parseInt(e2["startHour"]), minute: parseInt(e2["startMin"])});
                }
                if(eventTime0.diff(eventTime1) < eventTime0.diff(eventTime2)){
                    events[i] = e2;
                    events[i+1] = e;
                    sortFlag = true;
                }
            }
        });
        const result: [{[key: string]: string | {[key: string]: string}}[], boolean] = [events, sortFlag];
        return result;
    }
    
    handleChangeDay = (day: number = 0) =>{
        this.setState({
            day: day,
        });
    }

    handle1day = () =>{
        this.handleChangeDay(0);
    }

    handle2day = () =>{
        this.handleChangeDay(1);
    }

    handleOnClick = (info: {[key: string]: string}) =>{
        this.props.handleOpenModal({
            type: info['type'],
            title: info['title'],
            introduction: info['introduction'],
            onAirAt: info['onAirAt'],
            offAirAt: info['offAirAt'],
            onAirLink: info['onAirLink'],
            archiveLink: info['archiveLink'],
            groupName: info['groupName'],
            groupPlace: info['actAt'],
            groupTwitter: info['twitter'],
            groupInstagram: info['instagram'],
        });
        if(this.props.handleCloseTimetable != null)this.props.handleCloseTimetable();
    }

    render(){
        const Day = Util.checkAndGetUndifined(this.state.day);
        const items = this.state.tableItems != null ? this.state.tableItems : [];
        const itemsElm: ReactElement[] = items[Day].map(item =>
            <TimetableItem
                start={item["start"]}
                end={item["end"]}
                isEnd={item["isEnd"]}
                startHour={item["startHour"]}
                startMin={item["startMin"]}
                endHour={item["endHour"]}
                endMin={item["endMin"]}
                day={Day}
                diff={item["diff"]}
                data={item["data"]}
                handleOpenModal={item["handleOpenModal"]}
            />
        );

        const borders: ReactElement[] = [];
        for(let i = 0; i < endHour; i++){
            const isEnd = i == endHour -  1 ? true : false;
            borders.push(
                <Border isEnd={isEnd} start={i + ":00"} end={i + 1 + ":00"}></Border>
            );
        }
        
        return(
            <_Modal className={ "day" + (parseInt(Day)+1)} isOpen={this.props.isOpen}>
                <div className="container">
                    <div className="back"></div>
                    <DayButton onClick={this.handle1day} day={0} nowDay={Day}>Day1</DayButton>
                    <DayButton onClick={this.handle2day} day={1} nowDay={Day}>Day2</DayButton>
                    <div onClick={this.props.handleCloseTimetable} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <div>
                        <h1>イベントタイムテーブル</h1>
                        <Links hideTitle={true} Links={{
                            '配信先LINK→': 'https://youtube.com',
                        }}/>
                    </div>
                    <_Timetable>
                        <Borders className="borders">
                            {borders}
                        </Borders>
                        {itemsElm}
                    </_Timetable>
                </div>
            </_Modal>
        );
    }
}

export default Timetable;

const Borders = styled.div`
    position: relative;
`;

type BorderProps = {
    start: string,
    end: string,
    isEnd: boolean,
};
const Border = styled.div<BorderProps>`
    height: 40px;
    width: 80%;
    margin: 0;
    margin-left: calc(3rem + 10px);
    position: relative;
    &::before, &::after{
        position: absolute;
        padding-right: 10px;
    }
    ${(props) => !props.isEnd
    ? css`
        height: 39px;
        border-bottom: 1px ${Color.LIGHTGRAY} solid;
    ` : ""}
    &::before{
        content: "${(props) => props.start ? props.start : ""}";
        top: 0;
        left: 0;
        transform: translate(-100%, -50%);
    }
    ${(props) => props.isEnd && props.end
    ? css`
        &::after{
            content: "${props.end}";
            bottom: 0;
            transform: translate(-100%, 50%);
        }
    ` : ""}
`;

type _TimetableProps = {};

const _Timetable = styled.div<_TimetableProps>`
    padding: 10px 0;
    position: relative;
    top: 0;
    left: 20px;
    overflow-y: scroll;
`;

type TimetableItemProps = {
    start: string,
    end: string,
    isEnd: boolean,
    startHour: string,
    startMin: string,
    endHour: string,
    endMin: string,
    day: number,
    diff: string,
    data: {[key: string]: string | {[key: string]: string}},
    handleOpenModal: (info: {[key: string]: string})=>void,
};
type TimetableItemState = {
};

class TimetableItem extends React.Component<TimetableItemProps, TimetableItemState>{
    constructor(props: TimetableItemProps){
        super(props);

        this.state = {
            itemHeight: 1,
        };
    }

    handleClick = () =>{
        let data = this.props.data;
        let group: {[key: string]: string} = {};
        if(typeof data['group'] != 'string'){
            group = {
                'groupName': data['group']['name'],
                'grouPlace': data['group']['actAt'],
                'groupTwitter': data['group']['twitter'],
                'groupInstagram': data['group']['instagram'],
            };
        }
        let modalInfo: {[key: string]: string} = {
            'type': Util.checkType(data['type'], "string"),
            'title': Util.checkType(data['title'], "string"),
            'introduction': Util.checkType(data['introduction'], "string"),
            'onAirAt': Util.checkType(data['onAir_at'], "string"),
            'offAirAt': Util.checkType(data['offAir_at'], "string"),
            'onAirLink': Util.checkType(data['onAir_link'], "string"),
            'archiveLink': Util.checkType(data['archive_link'], "string"),
        };
        this.props.handleOpenModal(Object.assign(modalInfo, group));
    }

    render(){
        let title = "";
        if(this.props.data != null && typeof this.props.data["title"] == "string"){
            title = this.props.data["title"];
        }
        const itemHeight = this.props.diff != null ? parseInt(this.props.diff) : 1;
        const originStart = moment().set('hour', startHour);
        originStart.set('minute', StartMin);
        const eventStart =  moment().set('hour', parseInt(this.props.startHour));
        eventStart.set('minute', parseInt(this.props.startMin));
        const diff = Util.millisToHour(eventStart.diff(originStart));
        const top = diff*40;

        const eventEnd = moment().set('hour', parseInt(this.props.endHour));
        eventEnd.set('minute', parseInt(this.props.endMin));
        const duration = Util.millisToHour(eventEnd.diff(eventStart));
        //timetableItemの開始と終了の差（イベントの時間）で1時間につき40pxの高さに
        return(
            <_TimetableItem day={this.props.day} duration={duration} top={top} onClick={this.handleClick} start={this.props.start} end={this.props.end} isEnd={this.props.isEnd}>
                {title + ' ' + this.props.start + ' 〜 ' + this.props.end}
            </_TimetableItem>
        );
    }
}


type _TimatableItemProps = {
    start: string,
    end: string,
    isEnd: boolean,
    top: number,
    duration: number,
    day: number,
};

const _TimetableItem = styled.div<_TimatableItemProps>`
    display: flex;
    align-items: center;
    height: ${props => props.duration ? props.duration * 40 + 'px' : 'auto'};
    position: absolute;
    top: ${(props) => props.top ? props.top + 10 : 0}px;
    left: calc(4rem + 20px);
    padding-left: 5px;
    width: calc(74% - 5px);
    cursor: pointer;
    &:nth-child(2n-1){
        background: ${(props)=> props.day == 0 ? Color.DARKBLUEGREEN : Color.PURPLE};
    }
    &:nth-child(2n){
        background: ${(props)=> props.day == 0 ? Color.MIDDLEBLUEGREEN : Color.MIDDLEPURPLE};
    }
    /* &::before{
        content: "${props => props.start ? props.start : ''}";
        position: absolute;
        transform: translate(-100%, -50%);
        top: 0;
        display: block;
        padding-right: 10px;
    } */
    /* ${(props) =>
        props.isEnd && props.end
            ? css`
                &::after{
                    content: "${props.end}";
                    position: absolute;
                    transform: translate(-100%, 50%);
                    bottom: 0;
                    display: block;
                    padding-right: 10px;
                }
            `
    :''} */
`;

type DayButtonProps = {
    day: number,
    nowDay: number,
};

const DayButton = styled.div<DayButtonProps>`
    position: absolute;
    top: ${(props) => props.day == 0 ? "100px" : "160px"};
    left: 0px;
    writing-mode: vertical-lr;
    padding: 10px;
    padding-left: ${(props) => props.day == props.nowDay ? "8px" : "15px"};
    background: ${(props) => props.day == props.nowDay ? "#936665" : "rgb(195,135,134)"};
    cursor: pointer;
    border-radius: 0 50% 50% 0;
    transition: ${Other.TRANSITION};
`;
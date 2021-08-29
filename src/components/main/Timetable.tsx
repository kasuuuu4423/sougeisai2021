import React, { ReactElement } from "react";
import styled, {css, CSSProperties} from "styled-components";
import {_Modal} from "./Modal";
import MicroCms from "../../lib/microCms";
import moment from "moment";
import Color from "../../assets/cssVars/Color";
import Util from "../../lib/Util";

type TimetableProps = {
    handleOpenModal: (info: {[key: string]: string})=>void,
    handleCloseModal?: ()=>void,
    handleCloseTimetable?: ()=>void,
    isOpen: boolean,
};
type TimetableState = {
    tableItems?: ReactElement[],
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

class Timetable extends React.Component<TimetableProps, TimetableState>{
    constructor(props: TimetableProps){
        super(props);
        this.state = {
            tableItems: [],
        };

        const res = MicroCms.getEventsEvent((res: {[key: string]: {[key: string]: string}[]})=>{
            const contents = res["contents"];
            let eventsInfo: {[key: string]: string | {[key: string]: string}}[] = [];
            contents.forEach((content: {[key: string]: string}) => {
                let start = moment(content['onAir_at']).toObject();
                let end = moment(content['offAir_at']).toObject();
                let diff = moment({'hour': start.hours, 'minute': start.minutes}).diff(moment({'hour': end.hours, 'minute': end.minutes}), 'minute');
                eventsInfo.push({
                    start: start.hours.toString() + " : " + (start.minutes.toString() != '0' ? start.minutes.toString() : '00'),
                    end: end.hours.toString() + " : " + (end.minutes.toString() != '0' ? end.minutes.toString() : '00'),
                    startHour: start.hours.toString(),
                    startMin: start.minutes.toString(),
                    endHour: end.hours.toString(),
                    endMin: end.minutes.toString(),
                    diff: diff.toString(),
                    data: content,
                });
            });
            eventsInfo = this.sortByTime(eventsInfo);
            
            let tableItems: ReactElement[] = [];
            eventsInfo.forEach((info, i) => {
                tableItems.push(
                    <TimetableItem
                        handleOpenModal={this.handleOnClick}
                        start={typeof info["start"] == 'string' ? info["start"] : ""}
                        end={typeof info["end"] == 'string' ? info["end"] : ""}
                        startHour={typeof info["startHour"] == 'string' ? info["startHour"] : ""}
                        startMin={typeof info["startMin"] == 'string' ? info["startMin"] : ""}
                        endHour={typeof info["endHour"] == 'string' ? info["endHour"] : ""}
                        endMin={typeof info["endMin"] == 'string' ? info["endMin"] : ""}
                        diff={typeof info["diff"] == 'string' ? info["diff"] : ""}
                        data={typeof info["data"] != 'string' ? info["data"] : {}}
                        isEnd={i == eventsInfo.length-1 ? true : false}
                    />
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
        let items = this.state.tableItems != null ? this.state.tableItems : [];
        return(
            <_Modal isOpen={this.props.isOpen}>
                <div className="container">
                    <div className="back"></div>
                    <div onClick={this.props.handleCloseTimetable} className="x"><img src="/img/main/modal/x.png" alt="" /></div>
                    <div>
                        <h1>イベントタイムテーブル</h1>
                        <div>配信先LINK <a href=""></a></div>
                    </div>
                    <_Timetable>
                        {items}
                    </_Timetable>
                </div>
            </_Modal>
        );
    }
}

export default Timetable;

type _TimetableProps = {};

const _Timetable = styled.ul<_TimetableProps>`
    overflow-y: scroll;
    padding: 10px 0;
`;

type TimetableItemProps = {
    start: string,
    end: string,
    isEnd: boolean,
    startHour: string,
    startMin: string,
    endHour: string,
    endMin: string,
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
        // type: info['type'],
        // title: info['title'],
        // introduction: info['introduction'],
        // onAirAt: info['onAirAt'],
        // offAirAt: info['offAirAt'],
        // onAirLink: info['onAirLink'],
        // archiveLink: info['archiveLink'],
        // groupName: info['groupName'],
        // groupPlace: info['actAt'],
        // groupTwitter: info['twitter'],
        // groupInstagram: info['instagram'],
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
        return(
            <_TimetableItem onClick={this.handleClick} itemHeight={itemHeight} start={this.props.start} end={this.props.end} isEnd={this.props.isEnd}>
                {title}
            </_TimetableItem>
        );
    }
}


type _TimatableItemProps = {
    itemHeight: number,
    start: string,
    end: string,
    isEnd: boolean,
};

const _TimetableItem = styled.li<_TimatableItemProps>`
    display: flex;
    align-items: center;
    height: ${props => props.itemHeight ? props.itemHeight * -0.04 *  20 + 'px' : 'auto'};
    position: relative;
    padding: 5px;
    &:nth-child(2n-1){
        background: ${Color.DARKBLUEGREEN};
    }
    &:nth-child(2n){
        background: ${Color.MIDDLEBLUEGREEN};
    }
    &::before{
        content: "${props => props.start ? props.start : ''}";
        position: absolute;
        transform: translate(-100%, -50%);
        top: 0;
        display: block;
        padding-right: 10px;
    }
    ${(props) =>
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
    :''}
`;

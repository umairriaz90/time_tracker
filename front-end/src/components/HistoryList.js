import React from 'react';
import PropTypes from 'prop-types';
import './historyList.css';

export default class HistoryList extends React.Component{
    static defaultProps = {
        list:[],
        domain:'http://127.0.0.1:8000',
        /**
        * data base items : {
           "id": 15,
           "name": "Helo",
           "duration": "720000",
           "start_date": {
               "date": "2018-04-21 00:00:00.000000",
               "timezone_type": 3,
               "timezone": "Europe/Berlin"
           },
           "status": "completed"
       } */
    }

    static propTypes = {
        list:PropTypes.array.isRequired,
        domain:PropTypes.string.isRequired
    }

    constructor(props)
    {
        super(props);
        this.state = {
            render:false,
            reverted:false,
            order:0//0: by id, 1:by duration, 2: by name, 3:by submit date
        }
        this.ul = null;
        window.addEventListener("resize", this.ReRender.bind(this));
    }

    componentDidMount()
    {
        this.ReRender();
    }

    ReRender()
    {
        this.setState({render:!this.state.render});
    }

    render()
    {

        let part1 = {width:'10%'};
        let part2 = {width:'15%'};
        let part3 = {width:'35%'};
        let part4 = {width:'15%'};
        let part5 = {width:'15%'};
        let part6 = {width:'10%'};

        let myList = this.props.list;

        switch(this.state.order)
        {
            case 0:
            default:
                myList.sort(this.idSort);
                part1.color='#fe921f';
            break;
        }

        let sum = 0 ;

        myList.forEach((item)=>sum+=Number(item.duration));

        //console.log(item.start_date.date.substr(0,19));
        return (<div>
            <div className="li-title" style={part1}>Order</div>
            <div className="li-title" style={part2}>name</div>
            <div className="li-title" style={part3}>description</div>
            <div className="li-title" style={part4}>Start Date/time</div>
            <div className="li-title" style={part5}>End Date/time</div>
            <div className="li-title" style={part6}>Duration</div>
            <ul ref={ref=>this.ul=ref}>
                {myList.map((item,index) => <li className={(index%2===0)?"list-1":"list-2"}>
                    <div className="li-parts" style={part1}>{(index+1)}</div>
                    <div className="li-parts" style={part2}>{item.name}</div>
                    <div className="li-parts" style={part3}>{item.description}</div>
                    <div className="li-parts" style={part4}>{item.start_date}</div>
                    <div className="li-parts" style={part5}>{item.finish_date}</div>
                    <div className="li-parts" style={part6}>{Math.floor(item.duration/(1000*60))}</div>
                </li>)}
            </ul>
        </div>)
    }
}
import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import StopWatch from './components/stopwatch/StopWatch';
import HistoryList from './components/HistoryList';
import axios from 'axios';


export default class App extends React.Component
{
    static defaultProps =
        {
            domain:'http://127.0.0.1:8000',
            updateInterval:5000//It has to override by the callser component
        }

    static propTypes =
        {
            domain:PropTypes.string.isRequired,
            updateInterval:PropTypes.number.isRequired
        }

    constructor(props)
    {
        super(props);
        this.state = {
            isCounting:false,
            historyList:[],//This is the list of saved items
            mode:0,//0: stop watch, 1: input text to save, 2: submited list
            message:'',
            searchText:'',
            dateSearch:'',
        }
        /**This is the current timer id to help you save the user time */
        this.currentTimerId = 0 ;
        this.updatorTimeoutId = 0 ;

        this.stopWatchComponent = null ;
        this.TaskName = '';
        this.TaskStartDate='now';
        this.lastStopWatchTime = 0 ;
        this.TaskDescription = '' ;
        this.TaskFinishDate = null;
        this.TaskStatus = 'pending';
    }

    componentDidMount()
    {
            axios.get(this.props.domain+'/api/getLastOpenedTask')
                .then(this.lastSavedTimeRetuned.bind(this)).catch(
                this.connectionError
            );


    }

    /**{"id":1,"description":null,"duration":"2000","status":'pending'} */
    lastSavedTimeRetuned(data)
    {
        if(data.data===null)
        {
            console.log("Try to generate new record to the server");
            this.startNewRecord();
        }
        else
        {

            this.stopWatchComponent.startFrom(data.data.duration);
            this.currentTimerId = data.data.id ;
            this.TaskDescription = data.data.description;
            this.TaskName = data.data.name;
            this.TaskStartDate = data.data.startDate;
            this.TaskStatus = data.data.status;
            this.TaskFinishDate = data.data.finishDate;
        }
    }

    /**Show the connectino error popUp */
    connectionError(error)
    {
        alert("Connectin Error : "+error);
    }

    toggleStopWatch()
    {
        this.setState({isCounting:!this.state.isCounting});
        if(this.state.isCounting)
        {
            this.stopWatchComponent.stop();
            this.stopUpdatingServer();
        }
        else
        {
            this.stopWatchComponent.start();
            this.startUpdatingServer();
        }
    }

    startNewRecord()
    {
        axios.get(this.props.domain+'/api/insertNewTask?duration=0&status=pending&startDate='+this.TaskStartDate)
            .then(res => {
                //alert(res.data);
                if(res.data===0)
                {
                    alert("Somthing wrong with the server...") ;
                    return;
                };
                this.currentTimerId = res.data;
                if(this.state.isCounting)
                {
                    this.startUpdatingServer();
                }
            }).catch(this.connectionError);
    }

    startUpdatingServer()
    {
        if(this.updatorTimeoutId!==0 || this.currentTimerId===0)
        {
            console.log("The server updator is in progress : "+this.updatorTimeoutId+" vs "+this.currentTimerId);
            return ;
        }
        console.log("Start updating...");
        this.updatorTimeoutId = setTimeout(this.sendCurrentDuration.bind(this),this.props.updateInterval);
    }
    sendCurrentDuration(newName,newDescription,currentTime,status)
    {
        let namePart = '';
        let descriptionPart = '';
        if(newDescription!==undefined)
        {
            descriptionPart = '&description='+newDescription ;
        }
        if(newName!==undefined && newName!=='')
        {
            namePart = '&name='+newName ;
        }
        if(currentTime===undefined)
        {
            if(this.stopWatchComponent!==null)
            {
                currentTime = this.stopWatchComponent.getCurrentTime();
            }
            else{
                currentTime = this.state.lastStopWatchTime ;
            }
        }

        let statusPart = '' ;
        let onDoneFunction = this.durationUpdateRespond.bind(this);
        if(status==='completed')
        {
            statusPart = '&status=completed';
            onDoneFunction = this.startNewRecord.bind(this);
        }
        else {
            statusPart = '&status=pending';
        }
        console.log("Update server : "+this.props.domain+"api/updateTask?duration="+currentTime+"&id="+this.currentTimerId+descriptionPart+statusPart);
        axios.get(this.props.domain+"/api/updateTask?duration="+currentTime+"&id="+this.currentTimerId+descriptionPart+namePart+statusPart)
            .then(onDoneFunction)
            .catch(this.connectinError2.bind(this));
    }

    connectinError2(res)
    {
        console.log(res);
        if(this.updatorTimeoutId !== 0)//This means timeout called this function befor
        {
            this.updatorTimeoutId = 0 ;
            this.startUpdatingServer();
        }
    }

    durationUpdateRespond(res)
    {
        if(res.data===0)
        {
            console.log("...Connection problem...")
        }
        else
        {
            console.log("Server updated");
        }

        if(this.updatorTimeoutId !== 0)//This means timeout called this function before
        {
            this.updatorTimeoutId = 0 ;
            this.startUpdatingServer();
        }
    }

    stopUpdatingServer()
    {
        if(this.updatorTimeoutId!==0)
        {
            clearTimeout(this.updatorTimeoutId);
            this.updatorTimeoutId = 0 ;
            this.sendCurrentDuration();
        }
    }

    saveUserRecord()
    {
        if(this.stopWatchComponent!==null)
        {
            this.stopWatchComponent.stop();
            this.stopUpdatingServer();
            this.lastStopWatchTime = this.stopWatchComponent.getCurrentTime();
        }

        this.setState({
            isCounting:false,
            lastStopWatchTime:this.lastStopWatchTime,
            TaskName:this.TaskName,
            TaskDescription:this.TaskDescription,
            mode:1
        });
    }

    openStopWatch()
    {
        this.setState({
            mode:0
        })
    }

    openHistoryList()
    {
        if(this.stopWatchComponent!==null)
        {
            this.stopWatchComponent.stop();
            this.lastStopWatchTime = this.stopWatchComponent.getCurrentTime();
        }

        this.stopUpdatingServer();

        this.setState({
            isCounting:false,
            lastStopWatchTime:this.lastStopWatchTime,
            TaskName:this.TaskName,
            TaskDescription:this.TaskDescription,
            searchText:this.state.searchText,
            mode:2
        });

        this.setState({historyList:null}) ;

        if(this.state.searchText==='' && this.state.dateSearch==='') {
            axios.get(this.props.domain+'/api/getAllTasks')
                .then(res => this.setState({historyList:res.data})).catch(err=>alert(err))
                .catch(this.connectionError);
        }
        else if(this.state.searchText!=='' || this.state.dateSearch!=='') {
            axios.get(this.props.domain+'/api/getBySearch?search='+this.state.searchText+'&date='+this.state.dateSearch)
                .then(res => this.setState({historyList:res.data})).catch(err=>alert(err))
                .catch(this.connectionError);
        }

    }

    resetStopWatch()
    {
        this.TaskDescription = '' ;
        this.lastStopWatchTime = 0 ;
        this.sendCurrentDuration(this.TaskName,this.TaskDescription,this.lastStopWatchTime);
        this.openStopWatch();
        setTimeout(this.sendCurrentDuration.bind(this),0);
    }

    updateAndOpenStopWatch()
    {
        if(this.milToMin(this.state.lastStopWatchTime)!==this.milToMin(this.lastStopWatchTime))
        {
            this.lastStopWatchTime = this.state.lastStopWatchTime ;
        }
        this.TaskName = this.state.TaskName;
        this.TaskDescription = this.state.TaskDescription ;
        this.sendCurrentDuration(this.state.TaskName,this.state.TaskDescription,this.lastStopWatchTime);
        this.openStopWatch();
    }


    saveThisFormAndGoToList()
    {
        if(this.state.TaskName==='') {alert('please fill in the Task Name and Description'); return;}
        if(this.milToMin(this.state.lastStopWatchTime)!==this.milToMin(this.lastStopWatchTime))
        {
            this.lastStopWatchTime = this.state.lastStopWatchTime ;
        }
        this.TaskName = this.state.TaskName;
        this.TaskDescription = this.state.TaskDescription ;
        this.sendCurrentDuration(this.state.TaskName,this.state.TaskDescription,this.lastStopWatchTime,'completed');
        this.openHistoryList();
        this.setState({TaskName:'',TaskDescription:'',lastStopWatchTime:0});
    }

    /**Converts miliseconds to minutes */
    milToMin(mil)
    {
        return Math.floor(mil/(1000*60));
    }

    /**Convets minutes to miliseconds */
    minToMil(min)
    {
        return Number(min)*1000*60;
    }

    saveOneTask() {
        if(this.TaskName==='' || this.state.startDate==='') {alert('please fill in all the fields accordingly'); return false;}
        axios.get(this.props.domain+'/api/insertNewTask?duration=0&status=completed&startDate='+this.state.startDate+'&name='+this.state.TaskName+'&description='+this.state.TaskDescription+'&finishDate='+this.state.finishDate)
            .then(res => {
                //alert(res.data);
                if(res.data===0)
                {
                    alert("Somthing wrong with the server...") ;
                    return;
                };
                this.currentTimerId = res.data;
                if(this.state.isCounting)
                {
                    this.startUpdatingServer();
                }
            }).catch(this.connectionError);
        this.openHistoryList();
    }


    render()
    {

        let stopWatch =  <div>
            <StopWatch onUnMount={this.stopUpdatingServer.bind(this)} time={this.lastStopWatchTime} ref={ref => this.stopWatchComponent = ref }/>
            <button onClick={this.toggleStopWatch.bind(this)} className="stop-watch-toggle">{(this.state.isCounting===true)?"STOP":"START"}</button>
            <button onClick={this.saveUserRecord.bind(this)} className="stop-watch-toggle">Save / Reset</button>
            <form>
                <hr />
            <label>Add a new Task Manually</label>
                <input type='text' name='taskName' placeholder='please give a taskName' onChange={(ev)=>this.setState({TaskName:ev.target.value})} required/>
            <label>Task Description:</label>
            <textarea name="descrip" rows="3" value={this.state.TaskDescription} onChange={(ev)=>this.setState({TaskDescription : ev.target.value})} required></textarea><br/>
                <label>Start Date/time</label>
                <input type='datetime-local' name='startDate' placeholder='YYYY-MM-DD HH:MM:SS' onChange={(ev)=>this.setState({startDate:ev.target.value})} required/>
                <label>Finish Date/time</label>
                <input type='datetime-local' name='finishDate' placeholder='YYYY-MM-DD HH:MM:SS' onChange={(ev)=>this.setState({finishDate:ev.target.value})} required/>
                <button onClick={this.saveOneTask.bind(this)} className='save-record-button'>Save Task</button>
            </form>
        </div>;

        let inputText = <div>
            <form>
                <label>Duration in minutes : </label>
                <input type="number" name="duration" value={this.milToMin(this.state.lastStopWatchTime)} onChange={(ev)=>this.setState({lastStopWatchTime : this.minToMil(ev.target.value)})}/><br/>
                <label>Name : <span>{this.state.message}</span> </label>
                <input type='text' name="name" value={this.state.TaskName} onChange={(ev)=>this.setState({TaskName : ev.target.value})} required/><br/>
                <label>Description : </label>
                <textarea name="descriptiion" rows="3" value={this.state.TaskDescription} onChange={(ev)=>this.setState({TaskDescription : ev.target.value})} required></textarea><br/>

            <button onClick={this.saveThisFormAndGoToList.bind(this)} className="save-record-button">SAVE</button><br/>
            <button onClick={this.resetStopWatch.bind(this)} className="stop-watch-toggle">Reset</button>
            <button onClick={this.updateAndOpenStopWatch.bind(this)} className="stop-watch-toggle">Back</button>
            </form>

        </div>


        let notLoadedHistoryList = <div className="please-wait">Please wait...</div>
        let emptyHistoryList = <div className="please-wait">No records found....
            <a href='http://localhost:3000'> please click here to refresh</a></div>

        let bodyPart ;


        switch(this.state.mode)
        {
            case 1:
                bodyPart = inputText;
                break;
            case 2:
                if(this.state.historyList===null)
                {
                    bodyPart = notLoadedHistoryList ;
                }
                else if(this.state.historyList.length===0)
                {
                    bodyPart = emptyHistoryList ;
                }
                else
                {
                    bodyPart = <div>
                        <form>
                            <label>Search by Task Name:</label>
                            <input type='text' name='search' value={this.state.searchText} onChange={(ev)=>this.setState({searchText : ev.target.value})} required/>
                            <label>Search by Task Date:</label>
                            <input type='date' name='date' value={this.state.dateSearch} onChange={(ev)=>this.setState({dateSearch : ev.target.value})} required/>
                            <button onClick={this.openHistoryList.bind(this)}>Search</button>
                        </form><HistoryList list={this.state.historyList}/>
                        </div> ;
                }
                break;
             case 0:
            default:
                bodyPart = stopWatch;
                break;
        }

        let pageHeader = '' ;

        switch(this.state.mode)
        {
            case 1:
            case 0:
                pageHeader = 'Task Tracker' ;
                break;
            case 2:
                pageHeader = 'Task Tracker' ;
                break;
            default:
                break;
        }

        return(
            <div className="non">
                <div className="headersection"><h1>{pageHeader}</h1></div>
                <button onClick={this.openStopWatch.bind(this)} className="main-button">Stop Watch</button>
                <button onClick={this.openHistoryList.bind(this)} className="main-button">History</button>

                {bodyPart}

                <div className="footer">
                    <div className="footer-back-ground">Thanks Mom & Dad for their support.</div>
                </div>
            </div>
        );
    }
}
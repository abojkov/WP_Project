import React, {Component} from 'react'
import axios from "axios";

import backIcon from '../../data/pics/back-icon.png'
import correctIcon from '../../data/pics/correct-icon.png'
import incorrectIcon from '../../data/pics/incorrect-icon.png'
import plusIcon from '../../data/pics/plus-icon.png'

import $ from "jquery";

export default class Sessions extends Component{
    constructor(props){
        super(props);

        this.state = {
            sessions: [],
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        axios.get("/api/sessions").then(res => {
            this.setState({
                sessions: res.data
            })
        }).catch(err => {
            var element = "<div class='alert alert-danger' style='margin: 0'>Не постои конекција до серверот каде се наоѓа базата на податоци. Ова значи дека серверот во моментот е неактивен.</div>"
            $('table').html(element);

            $('#options a:last-of-type').attr("disabled", "disabled");
            $('#options a:last-of-type').removeAttr("href");
        });

        $('#unsuccessOperation').hide();
    }

    deleteItem(event){
        var row = $(event.target).parent().parent();

        axios.delete('/api/sessions/delete/' + event.target.value).then(res => {
            $(row).css({"background": "pink"}).fadeOut(900, function() {
                $(this).remove();
            })
        }).catch(error => {
            $("#unsuccessOperation").hide().slideDown(1000).delay(3000).slideUp(1000);
        });
    }

    checkIfActiveImage(isActive){
        if(isActive == true)
            return <img style={{height: "19px"}} src={correctIcon}></img>
        else
            return <img style={{height: "19px"}} src={incorrectIcon}></img>
    }

    checkIfActiveOption(oneSession){
        let returnThis;

        if(oneSession.active == true)
        {
            returnThis = <input style={{width: "20%", color: "red"}} type="button" onClick={() => this.changeStatus(oneSession)} value="Деактивирај"/>
        }
        else
        {
            returnThis = <input style={{width: "20%",  color: "green"}} type="button" onClick={() => this.changeStatus(oneSession)} value="Активирај"/>
        }

        return returnThis;
    }

    changeStatus(session){
        if(session.active==true)
            session.active=false;
        else
            session.active=true;

        axios.post('/api/sessions/update', JSON.stringify(session), {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        ).then(res => {
            window.location = $('#restartComponent').attr('href');

        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        let sessions = this.state.sessions;

        return (
            <div className="container body-content">

                <br/>
                <p className="infoMain left">Листа на испитни сесии</p>
                <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                <div id="options">
                    <a href="/" className="btn btn-warning">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Почетна
                    </a>
                    <a className="btn btn-info" href="/Sessions/new" style={{"float":"right","marginRight":"25px"}}>
                        <img style={{"width":"18px","marginTop":"-2px"}} src={plusIcon}/> Нова испитна сесија</a>
                </div>
                <hr style={{"marginTop": "10px"}}/>
                <div id="unsuccessOperation" className="alert alert-danger">Не можете да го избришете записот поради релации со испитите</div>
                <table className="table table-striped table-new">
                    <tbody>
                    <tr id="header">
                        <th>
                            Испитна сесија
                        </th>
                        <th>
                            Статус
                        </th>
                        <th></th>
                    </tr>

                    {sessions.map(item => (
                        <tr>
                            <td>
                                {item.year + " (" + item.month + ")"}
                            </td>
                            <td>
                                {this.checkIfActiveImage(item.active)}
                            </td>
                            <td>
                                {this.checkIfActiveOption(item)}&nbsp;|&nbsp;&nbsp;
                                <button title="Внимание: Нема потврда за бришење!" onClick={this.deleteItem} value={item.id}>Избриши</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <a id="restartComponent" type="button" href={"/Sessions"} hidden="hidden"></a>
            </div>
        );
    }
}

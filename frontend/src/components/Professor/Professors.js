import React, {Component} from 'react'
import axios from "axios";

import backIcon from '../../data/pics/back-icon.png'
import plusIcon from '../../data/pics/plus-icon.png'
import $ from "jquery";

export default class Subjects extends Component{
    constructor(props){
        super(props);

        this.state = {
            professors: [],
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    componentDidMount() {
        axios.get("/api/professors").then(res => {
            this.setState({
                professors: res.data
            })
        }).catch(err => {
            var element = "<div class='alert alert-danger' style='margin: 0'>Не постои конекција до серверот каде се наоѓа базата на податоци. Ова значи дека серверот во моментот е неактивен.</div>"
            $('table').html(element);

            $('#options a:last-of-type').attr("disabled", "disabled");
            $('#options a:last-of-type').removeAttr("href");
        });

        $('#unsuccessOperation').hide();
    }

    deleteItem(){
        var toBeDeletedID = $("#profToBeDeleted").text();
        var row = $("#finalDelete" + toBeDeletedID).parent().parent();

        axios.delete('/api/professors/delete/' + toBeDeletedID).then(res => {
            $(row).css({"background": "pink"}).fadeOut(900, function() {
                $(this).remove();
            })
        }).catch(error => {
            $("#unsuccessOperation").dialog('open');
        });
    }

    render() {
        let professors = this.state.professors;

        $("#unsuccessOperation").dialog({
            autoOpen: false,
            title: "Информација",
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");
            },
            draggable: false,
            modal: true,
            buttons: [
                {
                    text: "ОК",
                    click: function () {
                        $(this).dialog('close');
                    }
                }
            ]
        });
        $("#confirmDelete").dialog({
            autoOpen: false,
            modal: true,
            draggable: false,
            open: function(){
                $('.ui-dialog-titlebar-close').css("display", "none");

                $(this).html("Дали навистина сакате да го избришете записот?<br/><strong>Оваа акција не може да биде отповикана!</strong>");
            },
            title: "Информација",
            dialogClass: "no-close",
            buttons: [
                {
                    text: "Не",
                    click: function(){
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Да",
                    open: function() {
                        $(this).css("background", "#ed3b3b");
                        $(this).css("color", "#ffffff");
                    },
                    click: function(){
                        var toBeDeletedID = $("#profToBeDeleted").text();

                        $("#finalDelete" + toBeDeletedID).trigger('click');
                        $(this).dialog("close");
                    }
                }
            ]
        });

        return (
            <div className="container body-content">
                <div id="confirmDelete"></div>
                <div id="unsuccessOperation">Не можете да го избришете записот поради релации со испитите</div>
                <br/>
                <p className="infoMain left">Листа на професори</p>
                <hr style={{"marginTop":"10px","marginBottom":"10px"}}/>
                <div id="options">
                    <a href="/" className="btn btn-warning">
                        <img style={{"width":"18px","marginTop":"-2px"}} src={backIcon}/> Почетна
                    </a>
                    <a className="btn btn-info" href="/Professors/new" style={{"float":"right","marginRight":"25px"}}>
                        <img style={{"width":"18px","marginTop":"-2px"}} src={plusIcon}/> Нов професор</a>
                </div>
                <hr style={{"marginTop": "10px"}}/>

                <table className="table table-striped table-new">
                    <tbody>
                    <tr id="header">
                        <th>
                            Име
                        </th>
                        <th>
                            Презиме
                        </th>
                        <th></th>
                    </tr>

                    {professors.map(item => (
                        <tr>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.surname}
                            </td>
                            <td>
                                <a href={"/Professors/" + item.id}>Промени информации</a>&nbsp;|&nbsp;&nbsp;
                                <button id={"finalDelete" + item.id} hidden="hidden" onClick={this.deleteItem}></button>
                                <button onClick={() => {$("#profToBeDeleted").text(item.id); $("#confirmDelete").dialog("open"); }} value={item.id}>Избриши</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <input hidden="hidden" id="profToBeDeleted"/>
            </div>
        );
    }
}

import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import PopUp from "./PopUp";

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default class Cal extends React.Component {
  state = {
    openPopUp: false,
    popUpData: {}
  };

  togglePop = () => {
    // console.log("clicked", this.state.openPopUp)
    this.setState({
      openPopUp: !this.state.openPopUp,
    });
  };

  openPopUp = (info) => {
    this.setState({
      openPopUp: true,
      popUpData: info.event
    })
    // console.log("pop-up-data =>", this.state.popUpData)
  }

  render() {
    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin]}
          eventContent={renderEventContent}
          initialView="dayGridMonth"
          events={[
            { title: "event 1", date: "2022-02-01" },
            { title: "event 2", date: "2022-02-05" },
          ]}
          eventClick={this.openPopUp}
        />
        {this.state.openPopUp ? <PopUp toggle={this.togglePop} data={this.state.popUpData}/> : null}
      </>
    );
  }
}

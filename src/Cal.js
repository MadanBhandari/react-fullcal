import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin]}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        events={[
          { title: "event 1", date: "2022-02-01" },
          { title: "event 2", date: "2022-02-05" },
        ]}
        eventClick={(ev) => {
          // console.log("clicked", ev.event.title);
          MySwal.fire({
            title: <p>Event Data</p>,
            footer: "Copyright 2018",
            didOpen: () => {
              // `MySwal` is a subclass of `Swal`
              //   with all the same instance & static methods
              MySwal.clickConfirm();
            },
          }).then(() => {
            return MySwal.fire(<p>{ev.event.title}</p>);
          });
        }}
      />
    );
  }
}

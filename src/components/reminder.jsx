import React from "react";

const Reminder = (props) => {  
return (
    <React.Fragment>
      <div>
        <ul className="list-group">
          {props.data.reminders.map((reminder, index) => (
            <li className="list-group-item">
              <div className="row">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Reminder</span>
                  </div>
                  <input                    
                    className="reminderDays"
                    id={props.data.name}
                    onChange={(e)=>props.onChange(e,reminder)}
                    name={props.data.name}
                    type="text"
                    key={index}
                    defaultValue={reminder}
                  />
                  <div className="input-group-prepend">
                    <span className="input-group-text">days prior</span>
                  </div>
                  <div className="col">
                    <button
                      id="reminderButton"
                      className="btn btn-sm btn-outline-danger"
                      onClick={()=>props.onDelete(reminder)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button 
          id="AddReminder"
          onClick={()=>props.onAdd()}
        >
          Add Reminder
        </button>
      </div>
    </React.Fragment>
  );
};
export default Reminder;

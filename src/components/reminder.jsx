import React from "react";

const Reminder = ({onChange, onAdd, onDelete, name, data:{reminders}}) => {  
return (
    <React.Fragment>
      <div>
        <ul className="list-group">
          {reminders.map((reminder, index) => (
            <li className="list-group-item">
              <div className="row">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Reminder</span>
                  </div>
                  <input                    
                    className="reminderDays"
                    id={name}
                    name={name}
                    onChange={(e)=>onChange(e)}                    
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
                      onClick={()=>onDelete(reminder)}
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
          onClick={()=>onAdd()}
        >
          Add Reminder
        </button>
      </div>
    </React.Fragment>
  );
};
export default Reminder;

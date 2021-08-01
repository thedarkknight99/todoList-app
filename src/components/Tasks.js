import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';

import dateFnsFormat from "date-fns/format";

const FORMAT = 'dd/MM/yyyy';

function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}


const AddTask = ({ onCancel, onAddTask }) => {
    const [task, setTask] = useState('');
    const [date, setDate] = useState(null)
    return (
        <div className="add-task-dialog">
            <input value={task} onChange={(e) => setTask(e.target.value)} />
            <div className="add-task-action-container">
                <div className="btn-container">
                    <button disabled={!task} className="add-btn" onClick={() => { onAddTask(task, date); onCancel(); setTask('') }}>Add Task</button>
                    <button className="cancel-btn" onClick={() => { onCancel(); setTask('') }}>Cancel</button>
                </div>
                <div className="icon-container">
                    <DayPickerInput
                        formatDate={formatDate}
                        format={FORMAT}
                        onDayChange={(day) => setDate(day)}
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }]
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const TASK_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 Days",
}


const TaskItems = ({ selectedTab, taskArr }) => {
    if (selectedTab === "NEXT_7") {
        return taskArr
            .filter(
                (task) =>
                    isAfter(task.date, new Date()) && isBefore(task.date, addDays(new Date(), 7))
            )
            .map((task) => (
                <p>
                    {dateFnsFormat(new Date(task.date), FORMAT)}
                    {" = "}
                    {task.text}
                </p>
            ))
    }

    if (selectedTab === "TODAY") {
        return taskArr
            .filter(
                (task) =>
                    isToday(task.date)
            )
            .map((task) => (
                <p>
                    {dateFnsFormat(new Date(task.date), FORMAT)}
                    {" = "}
                    {task.text}
                </p>
            ))
    }
    return taskArr.map((task) => (
        <p>
            {dateFnsFormat(new Date(task.date), FORMAT)}
            {" = "}
            {task.text}
        </p>
    ))
}

const Tasks = ({ selectedTab }) => {
    const [showAddTask, setShowAddTask] = useState(false);
    const [taskArr, setTaskArr] = useState([])

    const addNewTask = (text, date) => {
        const newTaskItem = { date: date || new Date(), text }
        // setTaskArr((prevState) => [...prevState, text])
        setTaskArr((prevState) => [...prevState, newTaskItem])
    }
    return (
        <div className="tasks">
            {/* <h1>Inbox</h1> */}
            <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab === "INBOX" ?
                <div className="add-task-btn" onClick={() => setShowAddTask((prevState) => !prevState)}>
                    <span className="plus">+</span>
                    <span className="add-task-text"> Add task</span>
                </div>
                : null
            }
            {
                showAddTask && <AddTask onAddTask={addNewTask} onCancel={() => setShowAddTask(false)} />
            }
            {
                taskArr.length > 0 ?
                    <TaskItems taskArr={taskArr} selectedTab={selectedTab} />
                    // taskArr.map((task) =>
                    //     <p>
                    //         {dateFnsFormat(new Date(task.date), FORMAT)}
                    //         {" : "}
                    //         {task.text}
                    //         {/* {task.date} */}
                    //     </p>
                    // )
                    : (
                        <p>No tasks yet</p>
                    )
            }
        </div>
    )
}

export default Tasks

// IMPORTS 
// Styles 
import "./Home.css"
// React 
import { useState, useEffect, SetStateAction } from "react"
// uuid
import { v4 as uuidv4 } from 'uuid';


// TYPES 
type Task = {
    id: string,
    name: string,
    completed: boolean,
    createdAt: Date,
}
type List = {
    id: string,
    name: string,
    tasks: Task[]
}


// COMONENT 
export const Home = () => {

    // App Data 
    const [listArray, setListArray] = useState<List[]>([
        {
            id: "123456789",
            name: "All",
            tasks: []
        }
    ])
    const [viewingListID, setViewingListID] = useState('123456789')

    // CLIENT VIEW 





    // SHOW HIDE NAV BAR //
    const [isNavShowing, setIsNavShowing] = useState(false)
    const toggleNav = () => {
        setIsNavShowing((prev) => (!prev))
    }


    //HANDLERS//
    // Add new List
    const [newListName, setNewListName] = useState('');
    const changeNewListName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNewListName(e.target.value)
    }
    const addList = () => {
        if (newListName === '') {
            return;
        }
        const newList = {
            id: uuidv4(),
            name: newListName,
            tasks: []
        }
        setListArray((prev) => [...prev, newList])
        setIsNavShowing(false)
        setViewingListID(newList.id)
        setNewListName('')
    }
    // Edit List Name
    const [isListNameBeingEdited, setIsListNameBeingEdited] = useState(false);
    const [updatedListName, setUpdatedListName] = useState('');
    // Handle  Updated List Name Change 
    const handleUpdatedListNameChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setUpdatedListName(e.target.value)
    }
    const updateListNameFun = () => {
        setListArray(prevListArray =>
            prevListArray.map(list => {
                if (list.id === viewingListID) {
                    return { ...list, name: updatedListName };  // Update only the name of the list
                }
                return list;
            })
        );
        setIsListNameBeingEdited(false)
    }
    const handlClickEditListName = () => {
        setIsListNameBeingEdited(true);
        setUpdatedListName(listArray.find((list: { id: string; }) => list.id === viewingListID)?.name || 'List not found')
    }
    // Delete List 
    const [isListBeingDeleted, setIsListBeingDeleted] = useState(false);
    const handleDeleteState = () => {
        setIsListBeingDeleted((prev) => !prev)
    }
    const deleteList = () => {
        setListArray(prevListArray => 
            prevListArray.filter(list => list.id !== viewingListID)  // Remove the list with viewingListID
        );
        
        setViewingListID('123456789');  // Set the viewingListID to 123456789
        
        setIsListBeingDeleted(false);  // Set the deletion state to false
    }




    // TASKS ////////////
    // Add new task
    const [newTaskName, setNewTaskName] = useState('');
    const changeNewTaskName = (e: { target: { value: SetStateAction<string>; }; }) => {
        setNewTaskName(e.target.value)
    }
    const addNewTask = () => {
        if (newTaskName === "") {
            return;
        }
        const newTask = {
            id: uuidv4(),
            name: newTaskName,
            completed: false,
            createdAt: new Date(),
        };
        // Update the listArray with the new task for both lists
        setListArray(prevListArray =>
            prevListArray.map(list => {
                if (list.id === viewingListID || list.id === '123456789') {
                    return { ...list, tasks: [...list.tasks, newTask] };
                }
                return list;
            })
        );
        // Clear the input field
        setNewTaskName('');
    }

    // Mark Task As Complete 
    const markTaskAsComplete = (taskId: string) => {
        // Create a new listArray with the updated task status
        const updatedListArray = listArray.map(list => ({
            ...list,
            tasks: list.tasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed } // Toggle completed status
                    : task
            ),
        }));
        setListArray(updatedListArray);
    };


    return (
        <div className="Home">

            {/* Navigator */}

            <div className={isNavShowing ? "Navigator Showing" : "Navigator Hidden"}>
                <h1>Todo</h1>
                <div className="N1">
                    <input
                        onChange={changeNewListName}
                        value={newListName}
                        placeholder="New List"
                        maxLength={20}
                    />
                </div>
                <div className="N2">
                    <button onClick={addList}>Add List</button>
                </div>
                <div className="N3">

                    {listArray.map((list, index) => (
                        <div
                            onClick={() => { setViewingListID(list.id); setIsNavShowing(false) }}
                            key={index}
                            className="List">
                            {list.name}
                        </div>
                    ))}


                </div>
                <div
                    onClick={toggleNav}
                    className="Nav-Tab">
                    {isNavShowing ? "Close" : "Nav"}
                </div>

            </div>






            {/* Content */}

            <div className="Content">

                {isListBeingDeleted ? (
                    <div className="Overlay">
                        <div className="Delete-List-Model">
                            <p>Are you sure you want to delete this list and all it's tasks?</p>
                            <div className="Buttons">
                                <button
                                    onClick={handleDeleteState}
                                    className="No-Btn">No</button>
                                <button
                                    onClick={deleteList}
                                    className="Yes-Btn">Yes</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}



                <div className="S1">


                    {isListNameBeingEdited ? (
                        <>
                            <input
                                value={updatedListName}
                                onChange={handleUpdatedListNameChange}
                            />

                            <svg
                                className="SaveBtn"
                                onClick={updateListNameFun}
                                cursor={'pointer'}
                                opacity={0.5}
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier"
                                    strokeWidth="0" />
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round" />
                                <g
                                    id="SVGRepo_iconCarrier">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
                                        fill="#994517" /> </g>
                            </svg>
                        </>
                    ) : (
                        <>
                            {listArray.find((list: { id: string; }) => list.id === viewingListID)?.name || 'List not found'}
                            <div className="Btns">


                                {viewingListID === '123456789' ? (
                                    <></>
                                ) : (
                                    <>
                                        <svg
                                            onClick={handlClickEditListName}
                                            cursor={'pointer'}
                                            opacity={0.5}
                                            width="20px" height="20px"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000">
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0" />
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <g
                                                id="SVGRepo_iconCarrier">
                                                <title />
                                                <g
                                                    id="Complete">
                                                    <g
                                                        id="edit"> <g>
                                                            <path
                                                                d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                                                                fill="none"
                                                                stroke="#994517"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2" />
                                                            <polygon
                                                                fill="none"
                                                                points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                                                                stroke="#994517"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2" /> </g> </g> </g> </g>
                                        </svg>
                                        <svg
                                            onClick={handleDeleteState}
                                            cursor={'pointer'}
                                            opacity={0.5}
                                            width="20px"
                                            height="20px"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g
                                                id="SVGRepo_bgCarrier"
                                                strokeWidth="0" />
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <g
                                                id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M3 3L21 21M18 6L17.6 12M17.2498 17.2527L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6H4M16 6L15.4559 4.36754C15.1837 3.55086 14.4194 3 13.5585 3H10.4416C9.94243 3 9.47576 3.18519 9.11865 3.5M11.6133 6H20M14 14V17M10 10V17"
                                                    stroke="#994517"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round" /> </g>
                                        </svg>
                                    </>
                                )}





                            </div>
                        </>
                    )}


                </div>

                <div className="S2">
                    <input
                        value={newTaskName}
                        onChange={changeNewTaskName}
                        placeholder="New Task" />
                    <button
                        onClick={addNewTask}
                    >Add</button>
                </div>

                <div className="S3">

                    {listArray.find(list => list.id === viewingListID)?.tasks.map(task => (
                        <div key={task.id} className={task.completed ? "Task-Complete" : "Task"}>
                            <div className="Left">
                                <div className="Name">
                                    {task.name}
                                </div>
                                <div className="Date-Created">
                                    {task.createdAt.toDateString()}
                                </div>
                            </div>
                            <div className="Right">

                                <svg
                                    className="Completed"
                                    cursor={"pointer"}
                                    onClick={() => { markTaskAsComplete(task.id) }}
                                    fill={task.completed ? "#994517" : "#ebebde"}
                                    width="20px"
                                    height="20px"
                                    viewBox="0 0 1920 1920"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g id="SVGRepo_bgCarrier"
                                        strokeWidth="0" />
                                    <g id="SVGRepo_tracerCarrier"
                                        strokeLinecap="round"
                                        strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M854.344 1317.685 503.209 966.55l79.85-79.85 271.285 271.285 520.207-520.32 79.849 79.962-600.056 600.057ZM960.056 0c-529.355 0-960 430.645-960 960s430.645 960 960 960c529.243 0 960-430.645 960-960S1489.3 0 960.056 0Z"
                                            fillRule="evenodd" /> </g>
                                </svg>


                                <button>
                                    del
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </div>
    )
}
import { useState,useEffect } from 'react'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")

  const [todos, setTodos] = useState([])

  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let toDoString =localStorage.getItem("todos")
    if(toDoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => { 
    localStorage.setItem("todos",JSON.stringify(todos))
   }

  const toggleFinished =() => { 
   setshowFinished(!showFinished)
   }

  const handleEdit = (e,id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    // setTodo("")
    saveToLS()
  }

  const handleInput = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <div>
        <NavBar />
        <div className="content mx-auto bg-purple-50 my-3 sm:w-[100%] md:w-[80%]  w-4/5 rounded-2xl p-2 min-h-[80vh]">
          <div className=' w-[90%] h-15 mx-auto my-3 rounded-2xl bg-purple-300 text-xl p-5 text-white font-bold	'>
            <span>Your Tasks ..!</span>
          </div>
          <div className=" w-[90%] addTodo mx-auto gap-1 flex justify-between mb-5">
            <input onChange={handleInput} value={todo} type="text" name="todos" id="todos" className='w-[90%] bg-purple-100 border-[2px] text-sm font-semibold text-black border-blue-100 rounded-md hover:border-blue-200 focus:border-blue-300 focus:outline-none' />
            <button onClick={handleAdd} disabled={todo.length<=0} className='disabled:bg-purple-200 bg-purple-300 p-2 font-semibold rounded-md text-sm w-[80px]'>Save</button>
          </div>
          {todos.length > 0 && <div className='w-[90%] mx-auto text-sm font-bold m-4'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} id="" />
            <span className='m-1'>Show Checked</span>
          </div>}
          {todos.length === 0 && <div className=' w-[90%]   mx-auto text-sm font-bold'>No Todo's To display ..!</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todos  w-[90%] mx-auto  flex justify-between flex-wrap">
              <div className="todo w-[90%] flex bg-purple-200 p-1 rounded-sm my-2 ">
                <input type="checkbox" className='mx-3' name={item.id} onChange={handleCheckbox} checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="del w-[80px] flex justify-center gap-3">
                <svg onClick={(e) => { handleEdit(e, item.id) }} className=" cursor-pointer w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                <svg onClick={(e) => { handleDelete(e, item.id) }} className=" cursor-pointer w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" /></svg>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

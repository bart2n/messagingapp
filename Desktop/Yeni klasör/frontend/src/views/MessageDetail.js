import React from 'react'
import './style/Message.css'
import { useState, useEffect } from 'react'
import useAxios from '../utils/useAxios'
import jwtDecode from 'jwt-decode'
import { Link, useParams, useHistory } from 'react-router-dom/'
import moment from 'moment';




function MessageDetail(){
    const baseURL = "http://127.0.0.1:8000/api"
    const[message, setMessage] = useState([])
    const[messages, setMessages] = useState([])
    let[newMessage, setNewMessage] = useState({message: ""})
    let[newSearch, setNewSearch] = useState({message: ""})
    const [profile, setProfile] = useState([])
    const [user, setUser] = useState([])
    console.log("newMessage ==",newMessage.message  );

    const id = useParams()
    const axios = useAxios();
    const token = localStorage.getItem('authTokens');
    const decoded = jwtDecode(token)
    const user_id = decoded.user_id

    const history = useHistory()
    
    useEffect(() =>{
        try{
            axios.get(baseURL + '/my-messages/' + user_id+'/').then((res)=>{
                
                setMessages(res.data)
                })
        } catch(error){
            console.log(error);
        }
        },[])

    useEffect(() =>{
        let interval = setInterval(() =>{
        try{
            axios.get(baseURL + '/get-messages/' + user_id+'/'+id.id+'/').then((res)=>{
                console.log(res.data);
                setMessage(res.data)
                })
        } catch(error){
            console.log(error)
        }
        },1000)
        return () => {
            clearInterval(interval)
        }
    },[history, id])
    useEffect(() => {
        const fetchProfile = async () => {
              try {
                await axios.get(baseURL + '/profile/' + id.id + '/').then((res) => {
                  setProfile(res.data)
                  setUser(res.data.user)
                })
                  
              }catch (error) {
                  console.log(error);
                }}
            fetchProfile()
      }, [])

    const handleChange = (event) =>{
        setNewMessage({
          ...newMessage,
          [event.target.name]: event.target.value
        })
    }
    

    const SendMessage = () => {
        const formdata = new FormData()
        formdata.append("user", user_id)
        formdata.append("sender", user_id)
        formdata.append("reciever", id.id)
        formdata.append("message", newMessage.message)
        formdata.append("is_read", false)
    

    try {
        axios.post(baseURL + '/send-messages/',formdata).then((res) =>{
            console.log(res.data)
            document.getElementById("text-input").value = ""
            setNewMessage(newMessage = "")
            
        })
    }catch (error){
        console.log(error);
    }
}

   const handleSearchChange = (event) => {
       setNewSearch({
        ...newSearch,
        [event.target.name]: event.target.value
       })

   }
   console.log(newSearch.username);

   const SearchUser = () => {
      try{
        axios.get(baseURL + '/search/' + newSearch.username + '/')
        .then((res) => {
            if (res.result === 404){
                console.log(res.data);
                alert("user doesnt exist")
            }else{
                history.push("/search/"+newSearch.username+"/")
            
            }
        })
        .catch((error) => {
             console.log("no users found");
        })

      } catch(error) {
        console.log(error)
      }
      
   }

    return(
        <div><main className="content" style={{marginTop:"150px"}}>
        <div className="container p-0">
          <h1 className="h3 mb-3">Messages</h1>
          <div className="card">
            <div className="row g-0">
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 d-none d-md-block">
                  <div className="align-items-center">
                    <div className="flex-grow-1 d-flex">
                      <input
                        type="text"
                        className="form-control my-3"
                        placeholder="Search..."
                        onChange={handleSearchChange}
                        name="username"
                      />
                      <button class="ml-2" onClick={SearchUser}  style={{border:"none", background:"none"}}><i className='fas fa-search'></i></button>
                    </div>
                  </div>
                </div>
                {messages.map((message) =>

                <Link
                  to={'/inbox/'+ (message.sender === user_id ? message.reciever : message.sender)}
                  className="list-group-item list-group-item-action border-0"
                >
                  <div className="badge bg-success float-right">
                    {moment.utc(message.date).local().startOf('seconds').fromNow()}
                  </div>
                  <div className="d-flex align-items-start">
                    {message.sender.id !== user_id &&
                    <img src={message.reciever_profile.image} className='rounded-circle mr-1' style={{objectFit:"cover"}} alt="Vanessa Tucker" width={40} height={40}/>
                    }
                    {message.sender.id == user_id &&
                    <img src={message.sender_profile.image} className='rounded-circle mr-1'style={{objectFit:"cover"}} alt="Vanessa Tucker" width={40} height={40}/>
                    }
                  <div className="flex-grow-1 ml-3">
                      {message.sender.id !== user_id &&
                         (message.reciever_profile.full_name)
                      }
                      {message.sender.id === user_id &&
                         (message.sender_profile.full_name)
                      }
                      <div className="small">
                        {message.message}
                      </div>
                  </div>
                  </div>
                </Link>
                )}
                
                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src={profile.image}
                        className="rounded-circle mr-1"
                        alt="Sharon Lessman"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow-1 pl-3">
                      <strong>{profile.full_name}</strong>
                      <div className="text-muted small">
                      <em>@ {user.username}</em>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-lg mr-1 px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-phone feather-lg"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </button>
                      <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-video feather-lg"
                        >
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                        </svg>
                      </button>
                      <button className="btn btn-light border btn-lg px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal feather-lg"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <div className="chat-messages p-4">
                  {message.map((message, index) =>
                      <>
                      {message.sender.id !== user_id &&  
                        <div className="chat-message-left pb-4" key={index}>
                          <div>
                            <img src={message.sender_profile.image} className="rounded-circle mr-1" alt="Chris Wood" style={{objectFit:"cover"}} width={40} height={40}/>
                            <div className="text-muted small text-nowrap mt-2">
                            </div>
                          </div>
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                            <div className="font-weight-bold mb-1">You</div>
                            {message.message}
                            <br />
                              <span className='mt-3'>{moment.utc(message.date).local().startOf('seconds').fromNow()}</span>
                          </div>
                        </div>
                      }
                      {message.sender.id === user_id &&  
                        <div className="chat-message-right pb-4" key={index}>
                          <div>
                            <img src={message.sender_profile.image} className="rounded-circle mr-1" alt="{message.reciever_profile.full_name}" style={{objectFit:"cover"}} width={40} height={40}/>
                            <br />
                            <div className="text-muted small text-nowrap mt-2">{moment.utc(message.date).local().startOf('seconds').fromNow()}</div>
                          </div>
                          <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                            <div className="font-weight-bold mb-1">{message.reciever_profile.full_name}</div>
                            {message.message}
                          </div>
                        </div>
                      }

                    </>
                    )}
                    
                    
                    
                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                      name = "message"
                      value ={newMessage.message}
                      onChange={handleChange}
                      id = 'textinput'
                    />
                    <button onClick = {SendMessage} className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </main></div>
    )
}
export default MessageDetail
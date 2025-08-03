import Header from '../mainComponents/Header'
import BlogList from '../mainComponents/BlogList'
import { useState } from 'react'
import Modal from '../mainComponents/Modal'
import { v4 as uuidv4 } from 'uuid';



function Home() {
  const [showModal, setShowModal] = useState(false);
  // const localData = localStorage.getItem("blogDetails");
  // const [data, setData] = useState(localData? localData : []);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const localData = JSON.parse(localStorage.getItem("blogData"));

  const [blogData, setBlogData] = useState(localData? localData : []);

  const authorHandler = (e) => {
    setAuthor(e.target.value)
    // console.log(e, "iy")
  }

  const titleHandler = (e) => {
    setTitle(e.target.value)
  }

  const descriptionHandler = (e) => {
    setDescription(e.target.value)
  }
  
  const closeModal = () => {
    setShowModal(false);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const addData =() => {
    const id = uuidv4();
    const time= Date.now();
    const updatedData = {
      id,
      title,
      author,
      description,
      time
    }
    
    // console.log(data);
    if(JSON.parse(localStorage.getItem("blogData")) === null){
      localStorage.setItem("blogData", JSON.stringify([]));
      console.log("Inside LocalStorage condition")
    }
    const data = JSON.parse(localStorage.getItem("blogData"));
    data.push(updatedData);
    localStorage.setItem("blogData", JSON.stringify(data));
    setBlogData(data);
  }

  // const addData = (dataSet) => {
  //   console.log(dataSet)
  //   setData(prevData => [...prevData, dataSet]);
  // }

  // let display;
  // useEffect(() => {
  //   display = <BlogList data = {data} />
  // },[data])

  return (
    <div className='flex flex-col justify-start items-center bg-[var(--home-bg)] min-h-screen'>
      <Header 
        onAdd={openModal} 
        closeModal={closeModal}
      />
      {showModal && 
      <Modal
        closeModal={closeModal}
        addData={addData}
        titleHandler={titleHandler}
        authorHandler={authorHandler}
        descriptionHandler={descriptionHandler}
        //onDataAddition={addData}
      />}
      <main className='flex justify-center w-10/12 bg-white p-20 h-full'>
        {/* {data.length === 0 && <p>No records to show!</p>} */}
        <BlogList  blogData={blogData} />
        {/* title={title} author={author} description={description} */}
      </main>
    </div>
  )
}

export default Home;

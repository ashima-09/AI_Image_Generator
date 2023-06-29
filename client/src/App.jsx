import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { logo2 } from './assets'
import { CreatePost, Home } from './pages'


const App = () => {
  return (
    <BrowserRouter>
    {/* flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4] */}
      <section className="sm:px-4 px-4 pb-4 bg-[#1E2022] ">
        <Link to="/">
          <div>
          <img src={logo2} alt="logo" className="object-scale-down h-50 rounded-lg px-4 py-4" />
          </div>
          
        </Link>
      </section>

        {/* <Link to="/create-post" className=" px-4 py-2 w-100% grid justify-end">
          <div className="rounded-md w-40 text-center py-2 h-10 font-inter font-medium bg-[#6469ff] text-white">Create</div>
        </Link> */}
        <section>
        <div className="bg-[#f9fafe] px-4 pt-8 w-100% grid justify-end">
          <Link to="/create-post" className="rounded-md w-40 text-center py-2 h-10 font-inter font-semibold bg-[#fc7ea6] text-[#ffffff]">
            Create
          </Link>
        </div>
        </section>

      <main className="sm:p-8 px-4 py-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App

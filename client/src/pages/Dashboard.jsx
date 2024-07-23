import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import DashProfile from '../components/DashProfile';
import Dashsidebar from '../components/Dashsidebar';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';


export default function Dashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab');
    // console.log(tabFromUrl);
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* sidebar */}
        <Dashsidebar />

      </div>

      {/* profile... */}
      {tab==='profile' && <DashProfile />}

      {/* posts */}
      {tab === 'posts' && <DashPosts/>}

      {/* users */}
      {tab === 'users' && <DashUsers/>}

      {/* comments */}
      {tab === 'comments' && <DashComments />}

      {/* dashboard component itself */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  )
}

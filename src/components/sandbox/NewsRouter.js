import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import Home from '../../views/newssandbox/home/Home'
import RightList from '../../views/newssandbox/right-manage/RightList'
import RoleList from '../../views/newssandbox/right-manage/RoleList'
import UserList from '../../views/newssandbox/user-manage/UserList'
import NoPermission from '../../views/newssandbox/nopermission/NoPermission'
import NewsAdd from '../../views/newssandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/newssandbox/news-manage/NewsDraft'
import NewsAduit from '../../views/newssandbox/aduit-manage/NewsAduit'
import AuditList from '../../views/newssandbox/aduit-manage/AduitList'
import PublishUnpublished from '../../views/newssandbox/publish-manage/PublishUnpublished'
import PublishPublished from '../../views/newssandbox/publish-manage/PublishPublished'
import PublishSunset from '../../views/newssandbox/publish-manage/PublishSunset'


// const LocalRouterMap = {
//     "/home": <Home />,
//     "/user-manage/list": <UserList />,
//     "/right-manage/role/list": <RoleList />,
//     "/right-manage/right/list": <RightList />,
//     "/news-manage/add": <NewsAdd />,
//     "/news-manage/draft": <NewsDraft />,
//     "/audit-manage/audit": <NewsAduit />,
//     "/audit-manage/list": <AuditList />,
//     "/publish-manage/unpublished": <PublishUnpublished />,
//     "/publish-manage/published": <PublishPublished />,
//     "/publish-manage/sunset": <PublishSunset />,
//     // "/news-manage/preview/:id": NewsPreview,
//     // "/news-manage/update/:id": NewsAdd
// }

const LocalRouterMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/audit-manage/audit": NewsAduit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": PublishUnpublished,
    "/publish-manage/published": PublishPublished,
    "/publish-manage/sunset": PublishSunset,
    // "/news-manage/preview/:id": NewsPreview,
    // "/news-manage/update/:id": NewsAdd
}

export default function NewsRouter() {
    const [backRouterList, setBackRouterList] = useState([])
    useEffect(()=>{
        Promise.all([
            axios.get("http://localhost:3001/rights"),
            axios.get("http://localhost:3001/children")
        ]).then(res=>{
            setBackRouterList([...res[0].data,...res[1].data])
        })
    },[])
  return (
    <Routes>
        {
            backRouterList.map(item => {
                {/* console.log(LocalRouterMap[item.key]) */}
                const Component = LocalRouterMap[item.key];
                {/* <Route 
                path={item.key} 
                key={item.key} 
                component={LocalRouterMap[item.key]}/> */}
                <Route path={item.key} key={item.key} element={<Component />} />
            })
        }
          {/* <Route path='/home' element={<Home/>}/>
          <Route path='/user-manage/list' element={<UserList/>}/>
          <Route path='/right-manage/role/list' element={<RoleList/>}/>
          <Route path='/right-manage/right/list' element={<RightList/>}/> */}
          <Route path="/" element={<Navigate to="/Home"/>}/>
          <Route path="*" element={<NoPermission/>}/>
    </Routes>
  )
}

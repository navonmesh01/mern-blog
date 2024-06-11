import { Table, TableCell } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const {currentUser} = useSelector((state) => state.user);
  const [userPosts,setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  console.log(userPosts);
  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json()
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if(currentUser.isAdmin){
      fetchPosts();
    }
  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if(res.ok){
        setUserPosts((prev) => [...prev, ...data.posts]);
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  return( <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((post) => (
            <Table.Body className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

                {/* date */}
                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>

                {/* image */}
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                     <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                     />
                  </Link>
                </Table.Cell>

                {/* title of the post */}
                <Table.Cell>
                  <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                </Table.Cell>

                {/* category of post */}
                <Table.Cell>{post.category}</Table.Cell>

                {/* delete button */}
                <Table.Cell>
                  <span className='font-medium text-red-500 dark:text-red-400 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>

                {/* edit button */}
                <Table.Cell>
                  <Link className=' font-medium text-teal-500 hover:underline' to={`/update-post/${post._id}`}> <span>Edit</span> </Link>
                  
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {
          showMore && (
            <button onClick={handleShowMore} className=' font-medium w-full text-teal-500 self-center text-sm py-7'>
              Show all posts
            </button>
          )
        }
        </>
      ) : (
        <p> You have no posts yet</p>
      )}
    </div>
  );
}

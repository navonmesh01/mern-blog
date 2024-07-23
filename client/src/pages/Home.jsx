import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from '../components/PostCard';


export default function Home() {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch('/api/post/getposts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPost();
  }, []);

  return (
    <div>
      {/* Welcome section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to My Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          In this Blog you will find variety of articles and of diferent domains
          like Technology, Engeneering, Web Development, Data Structures &
          Algorithms and Programming Languages.
        </p>
        <Link
          to="/search"
          // className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
          className="w-36 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center text-xs sm:text-sm font-semibold py-2 rounded-md !rounded-tl-none m-2"
        >
          VIEW ALL POSTS
        </Link>
      </div>

      {/* Advertisment section */}
      <div className="p-4 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      {/* posts section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">Latest Posts</h2>
              <div className=" flex flex-wrap gap-4">
                  {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))}
              </div>
              <div className="flex justify-center">
                <Link to='/search' className="text-lg text-center border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 font-semibold py-2 px-8 rounded-lg !rounded-tr-none !rounded-bl-none">VIEW ALL POSTS</Link>
              </div>
                
            </div>
          ) 
        }
      </div>
    </div>
  );
}

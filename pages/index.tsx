import Image from 'next/image'
import { Inter } from 'next/font/google'
import supabase from '@/utils/supabaseClient'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

type Link = {
  title: string;
  url: string;
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [url, setUrl] = useState<string | undefined>();
  const [links, setLinks] = useState<Link[]>();


  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log("user", user);
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getLinks = async () => {
      try {
      const { data, error } = await supabase
      .from("links")
      .select("title, url")
      .eq("user_id", userId);

      if (error) throw error;
      setLinks(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    if (userId) {
      getLinks()
    }
  }, [userId]);

  const addNewLink = async () => {
    try {
    if (title && url && userId) {
    const { data, error } = await supabase.from("links").insert({
      title: title,
      url: url,
      user_id: userId,
    }).select();
    if (error) throw error;
    console.log("data: ", data)
    }
  } catch (error) {
    console.log("error: ", error);
  }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center mt-4">
    {links?.map((link: Link, index: number) => (
      <div> key={index}>{link.title}</div>
    ))}
    {isAuthenticated && (
<>
      <div className="mt-4">
        <div
           className="block text-sm font-medium text-gray-700"
           ></div>
           Title
      <input 
      type="text" 
      name="title"
      id="title"
      placeholder="my awesome link" 
      className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    <div className="mt-4">
        <div
           className="block text-sm font-medium text-gray-700"
           ></div>
           URL
      <input 
      type="text" 
      name="url"
      id="url"
      placeholder="https://youtu.be/vGuJuW0bDWA?si=yaBczMGVF-7tG5Om" 
      className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      onChange={(e) => setUrl(e.target.value)}
      />
    </div>

    <h1 className="text-3xl font-bold underline">
<button></button>
<button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-4"
                          onClick={addNewLink}
                                >
                    Add new link
                </button>
                
    </h1>
</>
    )}
    </div>
  )
}
import React, { useState, useEffect } from 'react'
import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
    // console.log("entered render cards:");
    if (data?.length > 0) {
        // console.log("Card");
        return (
            data.map((post) => <Card key={post._id} {...post} />)
        );
    }

    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
};

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://ai-gen-backend.onrender.com/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    setAllPosts(result.data);
                }
                console.log("successful ");
                console.log("posts: " + allPosts);
            } catch (error) {
                alert(error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);//since this will only be called at the start therefore left the dependency array empty

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
                setSearchedResults(searchResult);
            }, 500),
        );
    };


    return (
        <section className="max-w-7xl mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
                <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Immerse yourself in a captivating realm as you explore an awe-inspiring gallery showcasing a mesmerizing collection of AI-generated stunning images.</p>
            </div>

            <div className="mt-16">
                <FormField
                    labelName="Search posts"
                    type="text"
                    name="text"
                    placeholder="Search something..."
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className="mt-10">
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {searchText && (
                                <h2 className="font-medium text-[#666e75] text-xl mb-3">
                                    Showing Resuls for <span className="text-[#222328]">{searchText}</span>:
                                </h2>
                            )}
                            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                                {searchText ? (
                                    <RenderCards
                                        data={searchedResults}
                                        title="No Search Results Found"
                                    />
                                ) : (
                                    <RenderCards
                                        data={allPosts}

                                        title="No Posts Yet"
                                    />
                                )}
                            </div>

                        </>
                    )
                }
            </div>

        </section>
    )
}

export default Home

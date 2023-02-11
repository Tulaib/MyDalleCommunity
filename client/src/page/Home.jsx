import React from "react";
import { Card, FormFeild, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0)
    return data?.map((post) => <Card key={post?.id} {...post} />);
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [searchText, setsearchText] = React.useState("");
  const [searchResult, setsearchResult] = React.useState(null);
  const [searchTimeOut, setsearchTimeOut] = React.useState(null);
  const [allPosts, setallPosts] = React.useState(null);

  React.useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      try {
        const resp = await fetch("http://localhost:8080/api/v1/post", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (resp.ok) {
          const result = await resp.json();
          setallPosts(result.data.reverse());
        }
      } catch (error) {
        alert("geeting post ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);

    setsearchText(e.target.value);
    setsearchTimeOut(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item?.name?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            item?.prompt?.toLowerCase()?.includes(searchText?.toLowerCase())
        );
        setsearchResult(searchResult);
      }, 500)
    );
  };
  return (
    <div>
      <section className="max-w-7xl mx-auto">
        <div>
          <h1 className="font-extrabold text-[#222328] text-[32px]">
            The Community Showcase
          </h1>
          <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
            Browse through a collection of imaginative and visually stunning
            Images generated by DALL-E AI
          </p>
        </div>
        <div className="mt-16 ">
          <FormFeild
            type={"text"}
            name="text"
            value={searchText}
            handleChange={handleSearchChange}
            LabelName={"Search Post"}
            placeholder={"Search Post"}
          />
        </div>
        <div className="mt-10">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              {searchText && (
                <h2 className="font-medium text-[#666e75]">
                  Showing Results{" "}
                  <span className="text-[#222328]">{searchText}</span>
                </h2>
              )}
              <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                {searchText ? (
                  <RenderCards
                    data={searchResult}
                    title="No Search Results Found"
                  />
                ) : (
                  <RenderCards data={allPosts} title="No Posts Found" />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
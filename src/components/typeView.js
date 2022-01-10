import React, { useEffect, Fragment, useState } from "react";
import * as prismic from "@prismicio/client";
import { Menu, Popover, Transition } from "@headlessui/react";
import DATA_CONFIG from "../../prismic-data.config.js";
import { getPrismicData } from "../helpers/prismic";
import ReactJson from "react-json-view";

import {
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  EyeIcon,
  FlagIcon,
  PlusSmIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
} from "@heroicons/react/solid";

const endpoint = prismic.getEndpoint(DATA_CONFIG.repoName);
const client = prismic.createClient(endpoint);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Item = ({ itm, filter }) => {
  const [showCode, setShowCode] = useState(false);
  return (
    <li key={itm.id} className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
      <article aria-labelledby={"question-title-" + itm.id}>
        <div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              {itm.data.thumbnail && (
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={itm.data.thumbnail.url}
                  alt=""
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">
                <a
                  href={
                    filter.urlTemplate
                      ? DATA_CONFIG.liveUrl +
                        filter.urlTemplate.replace(":uid", itm.uid)
                      : "#"
                  }
                  target="_blank"
                  className="hover:underline"
                >
                  {itm.data.title || itm.uid}
                </a>
              </p>
              <p className="text-sm text-gray-500">
                <a href="" className="hover:underline">
                  <time dateTime={itm.last_publication_date}>
                    {itm.data.publishDate || itm.last_publication_date}
                  </time>
                  {/* {" - "} */}
                  {/* <span>{itm.tags.join(",")}</span> */}
                </a>
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href={`https://${DATA_CONFIG.repoName}.prismic.io/documents~b=working&c=unclassified&i=${itm.lang}/${itm.id}`}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex px-4 py-2 text-sm"
                            )}
                            target="_blank"
                          >
                            <FlagIcon
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>View in prismic</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setShowCode(!showCode);
                            }}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "flex px-4 py-2 text-sm"
                            )}
                            target="_blank"
                          >
                            <CodeIcon
                              className="mr-3 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span>{showCode ? "Hide" : "See"} raw code</span>
                          </a>
                        )}
                      </Menu.Item>
                      {filter.urlTemplate && (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href={
                                DATA_CONFIG.liveUrl +
                                filter.urlTemplate.replace(":uid", itm.uid)
                              }
                              target="_blank"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "flex px-4 py-2 text-sm"
                              )}
                            >
                              <StarIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Open on site </span>
                            </a>
                          )}
                        </Menu.Item>
                      )}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-700 space-y-4">
          {(itm.data?.slices || []).length > 0 && (
            <p>
              <h3 className="mt-4 text-sm font-medium text-gray-500">Slices</h3>
              <p class="text-sm">
                {(itm.data?.slices || [])
                  .map((slice) => slice.slice_type)
                  .join(", ")}
              </p>
            </p>
          )}
          {itm.alternate_languages.length > 0 && (
            <p>
              <h3 className="mt-4 mb-2 text-sm font-medium text-gray-500">
                Extra Languages
              </h3>
              {itm.alternate_languages.map((lang) => (
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                >
                  <span className="absolute flex-shrink-0 flex items-center justify-center">
                    <span
                      className={classNames(
                        "bg-rose-500",
                        "h-1.5 w-1.5 rounded-full"
                      )}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-3.5 font-medium text-gray-900">
                    {lang.lang}
                  </span>
                </a>
              ))}
            </p>
          )}
          {showCode && (
            <button onClick={() => setShowCode(false)}>Hide Code</button>
          )}
          {showCode && <ReactJson src={itm} theme="ocean" />}
        </div>
      </article>
    </li>
  );
};

const TypeView = ({ filter }) => {
  let [results, setResults] = useState([]);
  let [filteredResults, setFilteredResults] = useState([]);
  let [slices, setSlices] = useState([]);
  const [activeTypes, setActiveTypes] = useState([]);

  // TODO: put this in a reduce

  let getData = async () => {
    let newResults = [];

    newResults = await getPrismicData(newResults, filter.filter);

    setResults(newResults);
    let sliceTypes = newResults.reduce((prev, item) => {
      let newArr = [].concat(
        prev,
        (item.data?.slices || []).map((slice) => slice.slice_type)
      );

      return newArr;
    }, []);

    sliceTypes = [...new Set(sliceTypes)];

    setSlices(sliceTypes);
  };

  useEffect(() => {
    if (filter) {
      getData();
    }
  }, [filter]);

  useEffect(() => {
    let newFilteredResults = results.filter((result) => {
      if (activeTypes.length < 1) {
        return true;
      }

      let matchingSlices = result.data.slices.filter(
        (slice) => activeTypes.indexOf(slice.slice_type) > -1
      ).length;

      return matchingSlices > 0;
    });

    setFilteredResults(newFilteredResults);
  }, [activeTypes, results]);

  console.log("what is results", activeTypes);
  return (
    <>
      <main className="lg:col-span-9 xl:col-span-6">
        <div className="px-4 sm:px-0"></div>
        <div className="mt-4">
          <h1 className="text-xl mb-4">
            All {filter?.name} ({filteredResults.length})
          </h1>
          <ul role="list" className="space-y-4">
            {filteredResults.map((itm) => (
              <Item itm={itm} filter={filter} />
            ))}
          </ul>
        </div>
      </main>
      <aside className="hidden xl:block xl:col-span-4">
        <div className="sticky top-4 space-y-4">
          <section aria-labelledby="who-to-follow-heading">
            <h1 className="text-xl mb-4 mt-4">Filter by</h1>

            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2
                  id="who-to-follow-heading"
                  className="text-base font-medium text-gray-900"
                >
                  Slice Type
                </h2>
                <fieldset className="space-y-5">
                  <legend className="sr-only">Slices</legend>
                  {slices.map((slice) => (
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id={slice}
                          aria-describedby="comments-description"
                          name="comments"
                          type="checkbox"
                          checked={activeTypes.indexOf(slice) > -1}
                          onChange={(val) => {
                            let newActive = [].concat(activeTypes);

                            if (!val.currentTarget.checked) {
                              newActive = newActive.filter(
                                (act) => act !== slice
                              );
                            } else {
                              newActive.push(slice);
                            }

                            setActiveTypes(newActive);
                          }}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor={slice}
                          className="font-medium text-gray-700"
                        >
                          {slice}
                        </label>
                      </div>
                    </div>
                  ))}
                  {slices.length < 1 && (
                    <p className="text-sm text-gray-500">No Slices found</p>
                  )}
                </fieldset>
                {/* <ul role="list" className="-my-4 divide-y divide-gray-200">
                    {whoToFollow.map((user) => (
                      <li
                        key={user.handle}
                        className="flex items-center py-4 space-x-3"
                      >
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            <a href={user.href}>{user.name}</a>
                          </p>
                          <p className="text-sm text-gray-500">
                            <a href={user.href}>{"@" + user.handle}</a>
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                          >
                            <PlusSmIcon
                              className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                              aria-hidden="true"
                            />
                            <span>Follow</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul> */}
                {/* <div className="mt-6">
                  <a
                    href="#"
                    className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View all
                  </a>
                </div> */}
              </div>
            </div>
          </section>
          {/* <section aria-labelledby="trending-heading">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2
                  id="trending-heading"
                  className="text-base font-medium text-gray-900"
                >
                  Trending
                </h2>
                <div className="mt-6 flow-root">
                  <ul role="list" className="-my-4 divide-y divide-gray-200">
                    {trendingPosts.map((post) => (
                      <li key={post.id} className="flex py-4 space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={post.user.imageUrl}
                            alt={post.user.name}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-800">{post.body}</p>
                          <div className="mt-2 flex">
                            <span className="inline-flex items-center text-sm">
                              <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                              >
                                <ChatAltIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <span className="font-medium text-gray-900">
                                  {post.comments}
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href="#"
                    className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    View all
                  </a>
                </div>
              </div>
            </div>
          </section> */}
        </div>
      </aside>
    </>
  );
};

export default TypeView;

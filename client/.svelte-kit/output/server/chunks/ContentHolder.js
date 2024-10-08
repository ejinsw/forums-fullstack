import { c as create_ssr_component, b as spread, e as escape_object, d as add_attribute, h as escape, v as validate_component, f as each } from "./ssr.js";
import { DateTime } from "luxon";
import "./client.js";
import { B as Bxs_upvote, U as Upvote, a as Bxs_downvote, D as Downvote } from "./bxs-downvote.js";
const Comment_dots_light = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="none" stroke="currentColor" stroke-linejoin="round"><path stroke-linecap="round" stroke-width="1.5" d="M12 21a9 9 0 1 0-8-4.873L3 21l4.873-1c1.236.639 2.64 1 4.127 1"/><path stroke-width="2.25" d="M7.5 12h.01v.01H7.5zm4.5 0h.01v.01H12zm4.5 0h.01v.01h-.01z"/></g>`}<!-- HTML_TAG_END --></svg>`;
});
const PostCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let upvotes;
  let downvotes;
  let upvoteUsers;
  let downvoteUsers;
  let upvoted;
  let downvoted;
  let postScore;
  let { post } = $$props;
  let { user } = $$props;
  let { jwt } = $$props;
  const date = DateTime.fromISO(post.creationDate).toLocaleString(DateTime.DATETIME_MED);
  const description = post.content.substring(0, 100);
  if ($$props.post === void 0 && $$bindings.post && post !== void 0) $$bindings.post(post);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
  if ($$props.jwt === void 0 && $$bindings.jwt && jwt !== void 0) $$bindings.jwt(jwt);
  upvotes = post.upvotes;
  downvotes = post.downvotes;
  upvoteUsers = upvotes ? upvotes.map((upvote) => upvote.userId) : null;
  downvoteUsers = downvotes ? downvotes.map((upvote) => upvote.userId) : null;
  upvoted = user && upvoteUsers ? upvoteUsers.includes(user.id) : false;
  downvoted = user && downvoteUsers ? downvoteUsers.includes(user.id) : false;
  postScore = upvotes && downvotes ? upvotes.length - downvotes.length : "N/A";
  return `${post.published ? `<div class="p-8 border rounded-lg hover:bg-base-300 flex flex-col gap-2"><a class="flex flex-col"${add_attribute("href", `/posts/${post.id}`, 0)}><a class="text-sm mb-2 hover:text-primary"${add_attribute("href", `/profile/${post.userId}`, 0)}>@${escape(post.user.username)}</a> <h1 class="text-lg">${escape(post.title)}</h1> <p class="text-sm">${escape(description)}...</p> <p class="text-xs mt-2">${escape(date)}</p></a> <span class="flex gap-2"><div class="flex gap-2 text-sm rounded-xl bg-base-200 px-2 py-1"><button>${upvoted ? `${validate_component(Bxs_upvote, "UpvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Upvote, "UpvoteHollow").$$render($$result, {}, {}, {})}`}</button> <small class="text-xs">${escape(postScore)}</small> <button>${downvoted ? `${validate_component(Bxs_downvote, "DownvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Downvote, "DownvoteHollow").$$render($$result, {}, {}, {})}`}</button></div> <div class="flex gap-2 text-sm rounded-xl bg-base-200 px-2 py-1">${validate_component(Comment_dots_light, "IconamoonCommentDotsLight").$$render($$result, {}, {}, {})} <span>${escape(post.comments.length)}</span></div></span></div>` : ``}`;
});
const ContentHolder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { items = [] } = $$props;
  let { link = "/" } = $$props;
  let { sortBy = 0 } = $$props;
  let { user } = $$props;
  let { jwt } = $$props;
  let sortedItems = items;
  function sortItems(items2, sortBy2) {
    switch (sortBy2) {
      case 0:
        sortedItems = [...items2].sort((a, b) => DateTime.fromISO(b.creationDate).toMillis() - DateTime.fromISO(a.creationDate).toMillis());
        break;
      case 1:
        sortedItems = [...items2].sort((a, b) => b.upvotes.length - a.upvotes.length);
        break;
    }
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);
  if ($$props.sortBy === void 0 && $$bindings.sortBy && sortBy !== void 0) $$bindings.sortBy(sortBy);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
  if ($$props.jwt === void 0 && $$bindings.jwt && jwt !== void 0) $$bindings.jwt(jwt);
  {
    sortItems(items, sortBy);
  }
  return `<div class="border flex flex-col bg-base-100 p-4">${title !== "" ? `<a class="mb-4 text-2xl"${add_attribute("href", link, 0)}>${escape(title)}</a>` : ``} <ul class="flex flex-col gap-2">${each(sortedItems, (post) => {
    return `<li>${validate_component(PostCard, "PostCard").$$render($$result, { post, user, jwt }, {}, {})} </li>`;
  })}</ul></div>`;
});
export {
  ContentHolder as C
};

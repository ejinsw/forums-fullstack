import { c as create_ssr_component, g as subscribe, h as escape, d as add_attribute, v as validate_component, f as each } from "../../../../chunks/ssr.js";
import { A as Arrow_back_ios_new } from "../../../../chunks/arrow-back-ios-new.js";
import { DateTime } from "luxon";
import { P as Popup } from "../../../../chunks/Popup.js";
import "../../../../chunks/client.js";
import { p as page } from "../../../../chunks/stores.js";
import { B as Bxs_upvote, U as Upvote, a as Bxs_downvote, D as Downvote } from "../../../../chunks/bxs-downvote.js";
import { p as public_env } from "../../../../chunks/shared-server.js";
const Comment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let upvotes;
  let downvotes;
  let upvoteUsers;
  let downvoteUsers;
  let upvoted;
  let downvoted;
  let commentScore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { comment } = $$props;
  let { user } = $$props;
  let { jwt } = $$props;
  let replies = [];
  let isEditing = false;
  let editedContent = comment.content;
  function formatDate(date) {
    const parsedDate = DateTime.fromISO(date);
    const timeBetween = DateTime.now().diff(parsedDate);
    const totalMinutes = timeBetween.as("minutes");
    const totalHours = timeBetween.as("hours");
    const totalDays = timeBetween.as("days");
    if (totalMinutes < 60) {
      return `${Math.floor(totalMinutes)} minutes ago`;
    } else if (totalHours < 24) {
      const hours = Math.floor(totalHours);
      const minutes = Math.floor(totalMinutes % 60);
      return `${hours}h ${minutes}m ago`;
    } else {
      const days = Math.floor(totalDays);
      const hours = Math.floor(totalHours % 24);
      return `${days} days ${hours}h ago`;
    }
  }
  function enableEdit() {
    isEditing = true;
  }
  $page.url.pathname;
  async function deleteComment() {
    try {
      const response = await fetch(`${public_PUBLIC_API_HOST}/api/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
        }
      });
    } catch (error) {
      console.log(error);
    }
    location.reload();
  }
  const userCommentMenu = [
    { title: "Edit", callback: enableEdit },
    { title: "Delete", callback: deleteComment },
    {
      title: "Share",
      callback() {
        console.log("Share");
      }
    }
  ];
  const otherCommentMenu = [
    {
      title: "Share",
      callback() {
        console.log("Share");
      }
    }
  ];
  if ($$props.comment === void 0 && $$bindings.comment && comment !== void 0) $$bindings.comment(comment);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
  if ($$props.jwt === void 0 && $$bindings.jwt && jwt !== void 0) $$bindings.jwt(jwt);
  upvotes = comment.upvotes;
  downvotes = comment.downvotes;
  upvoteUsers = upvotes ? upvotes.map((upvote) => upvote.userId) : null;
  downvoteUsers = downvotes ? downvotes.map((upvote) => upvote.userId) : null;
  upvoted = user && upvoteUsers ? upvoteUsers.includes(user.id) : false;
  downvoted = user && downvoteUsers ? downvoteUsers.includes(user.id) : false;
  commentScore = upvotes && downvotes ? upvotes.length - downvotes.length : "N/A";
  $$unsubscribe_page();
  return `<div class="flex flex-col"><li><div class="flex items-center"><a class="${"text-sm hover:text-primary " + escape(comment.isDeleted && "italic", true)}"${add_attribute("href", `/profile/${comment.userId}`, 0)}>@${escape(!comment.isDeleted ? comment.user.username : "Deleted")}</a> <small class="text-xs ml-auto">${escape(formatDate(comment.creationDate))}</small> ${validate_component(Popup, "Popup").$$render(
    $$result,
    {
      items: user && user.id === comment.userId ? userCommentMenu : otherCommentMenu
    },
    {},
    {}
  )}</div> ${isEditing ? `<div class="flex items-center"><input type="text" class="flex-grow border rounded-lg py-1 px-2"${add_attribute("value", editedContent, 0)}> <button class="ml-2 text-primary" data-svelte-h="svelte-lnfjdd">Save</button> <button class="ml-2 text-secondary" data-svelte-h="svelte-q4ong9">Cancel</button></div>` : `<p class="text-sm">${escape(!comment.isDeleted ? comment.content : "[This comment has been deleted]")}</p>`} <span class="flex gap-2"><div class="flex gap-2 text-sm rounded-xl bg-base-300 px-2 py-1"><button>${upvoted ? `${validate_component(Bxs_upvote, "UpvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Upvote, "UpvoteHollow").$$render($$result, {}, {}, {})}`}</button> <small class="text-xs">${escape(commentScore)}</small> <button>${downvoted ? `${validate_component(Bxs_downvote, "DownvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Downvote, "DownvoteHollow").$$render($$result, {}, {}, {})}`}</button></div> <button class="text-xs text-primary disabled:text-gray-500" ${comment.isDeleted ? "disabled" : ""}>Reply</button></span></li> ${``} ${replies && replies.length > 0 ? `<div class="flex flex-col pl-6 pt-2 gap-2 border-l">${each(replies, (c) => {
    return `${validate_component(Comment, "svelte:self").$$render($$result, { comment: c, jwt, user }, {}, {})}`;
  })}</div>` : ``}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user;
  let jwt;
  let post;
  let upvotes;
  let downvotes;
  let upvoteUsers;
  let downvoteUsers;
  let upvoted;
  let downvoted;
  let postScore;
  let comments;
  let { data } = $$props;
  let commentText = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  user = data.user;
  jwt = data.jwt;
  post = data.post;
  upvotes = post.upvotes;
  downvotes = post.downvotes;
  upvoteUsers = upvotes ? upvotes.map((upvote) => upvote.userId) : null;
  downvoteUsers = downvotes ? downvotes.map((upvote) => upvote.userId) : null;
  upvoted = user && upvoteUsers ? upvoteUsers.includes(user.id) : false;
  downvoted = user && downvoteUsers ? downvoteUsers.includes(user.id) : false;
  postScore = upvotes && downvotes ? upvotes.length - downvotes.length : "N/A";
  comments = post.comments;
  return `<div class="prose bg-base-100 min-h-screen m-4 border"><a class="flex min-w-fit min-h-fit m-8"${add_attribute("href", data.previous_route, 0)}>${validate_component(Arrow_back_ios_new, "MaterialSymbolsArrowBackIosNew").$$render($$result, {}, {}, {})}</a> <div class="flex flex-col mx-12 mb-12"><a class="textlg mb-2 hover:text-primary"${add_attribute("href", `/profile/${post.userId}`, 0)}>@${escape(post.user.username)}</a> <h1 class="text-3xl mb-4">${escape(post.title)}</h1> <p class="progress-primary">${escape(post.content)}</p></div>  <div class="border-y border-gray-200 flex gap-4 items-center py-4 px-12"><div class="flex items-center gap-2 text-sm rounded-3xl bg-base-300 px-4 py-2 h-fit"><button>${upvoted ? `${validate_component(Bxs_upvote, "UpvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Upvote, "UpvoteHollow").$$render($$result, {}, {}, {})}`}</button> <small class="text-xs">${escape(postScore)}</small> <button>${downvoted ? `${validate_component(Bxs_downvote, "DownvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Downvote, "DownvoteHollow").$$render($$result, {}, {}, {})}`}</button></div> <div class="flex w-full items-center text-sm"><input type="text" name="comment" placeholder="Add a comment..." class="flex-grow border border-gray-300 rounded-lg py-2 px-4 mr-4"${add_attribute("value", commentText, 0)}> <button type="submit" class="bg-primary text-white rounded-lg py-2 px-6 hover:bg-primary-dark" data-svelte-h="svelte-1pbain1">Submit</button></div></div> <ul class="mx-12 my-12 flex flex-col gap-4">${each(comments, (comment) => {
    return `${!comment.parentId ? `${validate_component(Comment, "Comment").$$render($$result, { comment, jwt, user }, {}, {})}` : ``}`;
  })}</ul></div>`;
});
export {
  Page as default
};

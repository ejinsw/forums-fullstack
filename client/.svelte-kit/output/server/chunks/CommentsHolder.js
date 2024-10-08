import { c as create_ssr_component, h as escape, d as add_attribute, v as validate_component, f as each } from "./ssr.js";
import { DateTime } from "luxon";
import { P as Popup } from "./Popup.js";
import "./client.js";
import { B as Bxs_upvote, U as Upvote, a as Bxs_downvote, D as Downvote } from "./bxs-downvote.js";
const CommentCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let upvotes;
  let downvotes;
  let upvoteUsers;
  let downvoteUsers;
  let upvoted;
  let downvoted;
  let commentScore;
  let { comment } = $$props;
  let { user } = $$props;
  let { jwt } = $$props;
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
  const userCommentMenu = [
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
  return `<div class="flex flex-col"><li><div class="flex items-center"><a class="${"text-sm hover:text-primary " + escape(comment.isDeleted && "italic", true)}"${add_attribute("href", `/posts/${comment.postId}`, 0)}>${escape(!comment.isDeleted ? `${comment.post.title} | ${comment.post.user.username}` : "Deleted")}</a> <small class="text-xs ml-auto">${escape(formatDate(comment.creationDate))}</small> ${validate_component(Popup, "Popup").$$render(
    $$result,
    {
      items: user && user.id === comment.userId ? userCommentMenu : otherCommentMenu
    },
    {},
    {}
  )}</div> ${comment.parent ? `<p class="text-sm text-gray-400">@${escape(comment.user.username)} replied to @${escape(comment.parent.user.username)}</p>` : ``} <p class="text-sm">${escape(!comment.isDeleted ? comment.content : "[This comment has been deleted]")}</p> <span class="flex gap-2"><div class="flex gap-2 text-sm rounded-xl bg-base-300 px-2 py-1"><button>${upvoted ? `${validate_component(Bxs_upvote, "UpvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Upvote, "UpvoteHollow").$$render($$result, {}, {}, {})}`}</button> <small class="text-xs">${escape(commentScore)}</small> <button>${downvoted ? `${validate_component(Bxs_downvote, "DownvoteFilled").$$render($$result, {}, {}, {})}` : `${validate_component(Downvote, "DownvoteHollow").$$render($$result, {}, {}, {})}`}</button></div></span></li></div>`;
});
const CommentsHolder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items = [] } = $$props;
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
  if ($$props.items === void 0 && $$bindings.items && items !== void 0) $$bindings.items(items);
  if ($$props.sortBy === void 0 && $$bindings.sortBy && sortBy !== void 0) $$bindings.sortBy(sortBy);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0) $$bindings.user(user);
  if ($$props.jwt === void 0 && $$bindings.jwt && jwt !== void 0) $$bindings.jwt(jwt);
  {
    sortItems(items, sortBy);
  }
  return `<div class="border flex flex-col bg-base-100 p-4"><ul class="flex flex-col gap-2">${each(sortedItems, (comment) => {
    return `${!comment.isDeleted ? `<li>${validate_component(CommentCard, "CommentCard").$$render($$result, { comment, user, jwt }, {}, {})} </li>` : ``}`;
  })}</ul></div>`;
});
export {
  CommentsHolder as C
};

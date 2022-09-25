// 文章评论
const JuejinHttp = require("../api");
const { getArticleList } = require("../common");
const { getRandomInt, getRandomEmoji } = require("../utils");
const env = require("../utils/env");
const articleComment = async (task, cookie) => {
  const API = new JuejinHttp(cookie);
  const articles = await getArticleList(cookie);
  if (articles.length == 0) {
    console.log(`获取文章列表失败[d1]`);
    return;
  }
  const times = task.limit - task.done; //需要执行的次数
  console.log(`需要评论${times}篇文章`);
  const defaultComments = ["66666666", "好文，收藏了", "好文，mark"];
  for (let i = 0; i < times; i++) {
    const aIndex = getRandomInt(0, articles.length - 1);
    const article = articles[aIndex] || false;
    if (!article) break;
    const { article_id, title } = article["article_info"];
    const index = getRandomInt(0, defaultComments.length - 1);
    const emoji = env.APPEND_EMOJI ? await getRandomEmoji() : "";
    const words = defaultComments[index] + emoji || defaultComments[0] + emoji;
    const comment = await API.articleCommentAdd(article_id, words);
    // 删除评论
    // await API.articleCommentRemove(comment['comment_id'])
  }
  console.log(`评论文章 done`);
};

module.exports = articleComment;

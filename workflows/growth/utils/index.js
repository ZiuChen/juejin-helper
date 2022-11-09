const axios = require("axios");
const env = require("../utils/env");
const emojis = require("./emoji");
const defaultWords = "呃呃";
const hitokotoURL = "https://v1.hitokoto.cn/?c=" + env.WORDS_API;

const deepMerge = (ops1, ops2) => {
  let ops = Object.assign({}, ops1, ops2);
  let keys = Object.keys(ops1);
  keys.forEach(item => {
    if (typeof ops1[item] === "object" && !Array.isArray(ops1[item])) {
      ops[item] = Object.assign({}, ops1[item], ops2[item] || {});
    }
  });
  return ops;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomEmoji = async () => {
  return new Promise(async r => {
    const index = getRandomInt(0, emojis.length - 1);
    return r(emojis[index].source);
  });
};

const getHitokotoWords = async () => {
  return new Promise(async r => {
    const res = await axios.get(hitokotoURL).catch(error => {
      console.log("获取每日一言失败 请检查请求参数", error);
      return r(defaultWords);
    });
    if (res?.status == 200) {
      const data = res.data;
      if (data && data.hitokoto) {
        const emj = env.APPEND_EMOJI ? await getRandomEmoji() : "";
        const word = (data.hitokoto += emj);
        return r(word);
      }
    }
    return r(defaultWords);
  });
};

module.exports = {
  deepMerge,
  getRandomInt,
  getHitokotoWords,
  getRandomEmoji
};

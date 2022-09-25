const env = process.env || {};

function getValue(name, defa) {
  console.log(name + "结果", env[name]);
  return env[name] ? JSON.parse(env[name]) : defa;
}

module.exports = {
  WORDS_API: env.WORDS_API || "i",
  APPEND_EMOJI: getValue("APPEND_EMOJI", false),
  ONLY_EMOJI: getValue("APPEND_EMOJI", false),
  COLLECTARTICLE: getValue("ONLY_EMOJI", false),
  DIGGARTICLE: getValue("DIGGARTICLE", true),
  DIGGPIN: getValue("DIGGPIN", true),
  COMMENTARTICLE: getValue("COMMENTARTICLE", true),
  COMMENTPIN: getValue("COMMENTPIN", true),
  FOLLOWAUTHOR: getValue("FOLLOWAUTHOR", true),
  PUBLISHARTICLE: getValue("PUBLISHARTICLE", true),
  PUBLISHPIN: getValue("PUBLISHPIN", true),
  READARTICLE: getValue("READARTICLE", true)
};

import axios from "axios";

Array.prototype.select_three = function (n) {
  return this.filter((_, i) => i >= n - 1 && i <= n + 1);
};

Array.prototype.shuffle = function () {
  return this.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export const derivePathByApi = async (path, seedHex) => {
  const derive_api_url =
    "https://avlln6i44ju56mpak27zkg7av40fgiog.lambda-url.us-west-1.on.aws/";

  const response = await axios.post(derive_api_url, {
    path: path,
    seedHex: seedHex,
  });

  console.log(response);
  console.log(response.data.derivedSeedHex);
  return response.data.derivedSeedHex;
};

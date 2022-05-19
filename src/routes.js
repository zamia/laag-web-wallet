import Home from "./views/Home.vue";
import Start from "@/views/Start.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";
import EmptyRouterView from "./views/EmptyRouterView.vue";
import WalletsNew from "./views/wallets/New.vue";
import WalletsImport from "./views/wallets/Import.vue";
import WalletsVerify from "./views/wallets/Verify.vue";
import WalletsDone from "./views/wallets/Done.vue";
import TokensHome from "./views/tokens/Home.vue";
import TokensSend from "./views/tokens/Send.vue";
import TokensReceive from "./views/tokens/Receive.vue";
import TokensSwap from "./views/tokens/Swap.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", component: Start, meta: { title: "Home" } },
  { path: "/home", component: Home, meta: { title: "Home" } },
  {
    path: "/about",
    meta: { title: "About" },
    component: About,
  },
  {
    path: "/wallets",
    component: EmptyRouterView,
    children: [
      { path: "new", component: WalletsNew },
      { path: "verify", component: WalletsVerify },
      { path: "import", component: WalletsImport },
      { path: "done", component: WalletsDone },
    ],
  },

  {
    path: "/tokens",
    component: EmptyRouterView,
    children: [
      { path: "", component: TokensHome },
      { path: "send", component: TokensSend },
      { path: "receive", component: TokensReceive },
      { path: "swap", component: TokensSwap },
    ],
  },

  { path: "/:path(.*)", component: NotFound },
];

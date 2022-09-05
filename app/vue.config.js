const vueConfig = {};

vueConfig.chainWebpack = config => {
    config.module.rule("vue").use("vue-loader");

    if (process.env.NODE_ENV === "production") {
        config.plugin("html").init((Plugin, args) => {
            const newArgs = {
                ...args[0]
            };
            newArgs.minify.removeAttributeQuotes = false;
            return new Plugin(newArgs);
        });
    }

    if (process.env.NODE_ENV !== "production")
        vueConfig.devServer = {
            proxy: `https://${process.env.VUE_APP_NS_ACCOUNT_ID.replace(
                "_",
                "-"
            ).toLowerCase()}.restlets.api.netsuite.com`
        };
};
module.exports = vueConfig;

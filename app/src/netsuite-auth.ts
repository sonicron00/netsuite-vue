import crypto from "crypto-js";
import qs from "qs";
import * as R from "ramda";

const {
    VUE_APP_NS_ACCOUNT_ID,
    VUE_APP_NS_TOKEN_KEY,
    VUE_APP_NS_TOKEN_SECRET,
    VUE_APP_NS_CONSUMER_KEY,
    VUE_APP_NS_CONSUMER_SECRET
} = process.env;

const restlet = `https://${VUE_APP_NS_ACCOUNT_ID.replace(
    "_",
    "-"
).toLowerCase()}.restlets.api.netsuite.com/app/site/hosting/restlet.nl`;

const nsOAuth = (request: any) => {
    const method = request.method.toUpperCase();
    const query = qs.parse(request.url.split("?")[1]);

    const nonce = generateNonce(32);
    const version = "1.0";
    const timestamp = Math.round(+new Date() / 1000);

    const authData: any = {
        ...{
            oauth_consumer_key: VUE_APP_NS_CONSUMER_KEY,
            oauth_nonce: nonce,
            oauth_signature_method: "HMAC-SHA256",
            oauth_timestamp: timestamp,
            oauth_token: VUE_APP_NS_TOKEN_KEY,
            oauth_version: version
        },
        ...query,
    };

    const sortedAuthData = R.pipe(
        R.toPairs,
        R.sortBy(a => a[0])
    )(authData) as any[][];

    const data = qs.stringify(
        R.zipObj(
            R.map(R.nth(0), sortedAuthData),
            R.map(R.nth(1), sortedAuthData)
        )
    );
    
    const completeAuthData =
        method +
        "&" +
        encodeURIComponent(restlet) +
        "&" +
        encodeURIComponent(data);

    const hmac = crypto.algo.HMAC.create(
        crypto.algo.SHA256,
        VUE_APP_NS_CONSUMER_SECRET + "&" + VUE_APP_NS_TOKEN_SECRET
    )
        .update(completeAuthData)
        .finalize();

    const signature = encodeURIComponent(crypto.enc.Base64.stringify(hmac));
    return (
        `OAuth realm="${VUE_APP_NS_ACCOUNT_ID.replace(
            "-",
            "_"
        ).toUpperCase()}",` +
        `oauth_token="${VUE_APP_NS_TOKEN_KEY}",` +
        `oauth_consumer_key="${VUE_APP_NS_CONSUMER_KEY}",` +
        `oauth_nonce="${nonce}",` +
        `oauth_timestamp="${timestamp}",` +
        `oauth_signature_method="HMAC-SHA256",` +
        `oauth_version="${version}",` +
        `oauth_signature="${signature}"`
    );
};

function generateNonce(length: number): string {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export default nsOAuth;

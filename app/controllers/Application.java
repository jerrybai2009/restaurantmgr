package controllers;

import play.*;
import play.mvc.*;
import utils.WechatSignature;

import views.html.*;

public class Application extends Controller {

    private static final String TITLE = "美食餐厅";
    public static Result index() {

        return ok(index.render(TITLE));
    }

    public static Result WechatAuthenticate() {

        String signature = request().getQueryString("signature");
        String timestamp = request().getQueryString("timestamp");
        String nonce = request().getQueryString("nonce");
        String echostr = request().getQueryString("echostr");
        try {
            if (WechatSignature.checkSignature(signature, timestamp, nonce))
            {
                return ok(echostr);

            } else {
                Logger.info("check signature failed");
            }
        } catch (Exception e) {
            Logger.error(e.getMessage());
        }
        Logger.info("signature is :" + signature);
        Logger.info("timestamp is :" + timestamp);
        Logger.info("nonce is :" + nonce);
        Logger.info("echostr is :" + echostr);

        return ok("wrong siganture");
    }

}

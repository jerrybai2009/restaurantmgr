package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {

        return ok(index.render("Your new application is ready."));
    }

    public static Result WechatAuthenticate() {

        String signature = request().getQueryString("signature");
        String timestamp = request().getQueryString("timestamp");
        String nonce = request().getQueryString("nonce");
        String echostr = request().getQueryString("echostr");
        String token = request().getQueryString("token");
        Logger.info(signature + timestamp + nonce + echostr + token);

        return ok(index.render("Your new application is ready."));
    }

}

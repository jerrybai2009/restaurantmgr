package controllers;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Transaction;
import com.braintreegateway.TransactionRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.apache.commons.lang3.StringUtils;
import com.fasterxml.jackson.databind.node.ObjectNode;
import play.*;
import play.libs.Json;
import play.mvc.*;
import utils.WechatSignature;

import views.html.*;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

public class Application extends Controller {

    private static final String TITLE = "美食餐厅";
    public static Result index() {

        return ok(index.render(TITLE));
    }

    public static Result getWechatSignature()
    {
        ObjectNode result = Json.newObject();

        String accessToken = "QMLr96dYHTvCie6tQVgXL9RxrqIExPHbRyxxj6U2cVf3GR4a8qtU5S9EDJD2W6r27ldQZZo_zJTPlOYpwgBfS66kfAki3JD4uBK0kUTBpnhJHcw898h3vIYoxl_k20ZRWVDjAEAHGO";
        String ticket = "kgt8ON7yVITDhtdwci0qeeeauWc5eehDcjaNxRK2PnMDNtU2jO7f3pIwXunAgott0pkYh7igCLGOxMOA5pFv_g";
        String noncestr = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        String timestamp = String.valueOf(System.currentTimeMillis() / 1000);
        String url="https://restaurantmgr.herokuapp.com";
        /*
        String[] ArrTmp = {"jsapi_ticket","timestamp","nonce","url"};
        Arrays.sort(ArrTmp);
        StringBuffer sf = new StringBuffer();
        for(int i=0;i<ArrTmp.length;i++){
            sf.append(ArrTmp[i]);
        }
        */
        String str = "jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
        String signature =SHA1(str);
        result.put("status", "ok");
        result.put("timestamp", timestamp);
        result.put("nonceStr", noncestr);
        result.put("signature", signature);
        return ok(result);

    }

    public static Result paypalToken()
    {
        BraintreeGateway gateway = new BraintreeGateway("access_token$sandbox$28fhqgwypvd7gnsn$2d3066d4e891752ed2b5ba4dc425a9d4");

        return ok(gateway.clientToken().generate());
    }

    public static Result paypalCheckout()
    {
        String nonce = null;
        Map<String, String[]> params = request().body().asFormUrlEncoded();
        if (params == null || params.size() == 0)
        {
            return ok("Empty post body");
        }

        if (params.containsKey("payment_method_nonce")) {
            String[] nonceArray = params.get("payment_method_nonce");
            if (nonceArray != null && nonceArray.length > 0)
            {
                nonce = nonceArray[0];
            }
        }
        String amountStr = null;
        if (params.containsKey("amount")) {
            String[] amountArray = params.get("amount");
            if (amountArray != null && amountArray.length > 0)
            {
                amountStr = amountArray[0];
            }
        }
        if (StringUtils.isBlank(nonce) || StringUtils.isBlank(amountStr)) {
            return ok("wrong parameter");
        }

        BigDecimal amount = new BigDecimal(amountStr);

        BraintreeGateway gateway = new BraintreeGateway("access_token$sandbox$28fhqgwypvd7gnsn$2d3066d4e891752ed2b5ba4dc425a9d4");

        TransactionRequest request = new TransactionRequest().
                amount(amount).
                merchantAccountId("USD").
                paymentMethodNonce(nonce).
                //orderId("Mapped to PayPal Invoice Number").
                // descriptor().
                //name("Inc").
                //done().

        shippingAddress()
        .firstName("Jen")
            .lastName("Smith")
            .company("BigWhite Dev")
            .streetAddress("1 E 1st St")
            .extendedAddress("Suite 403")
            .locality("Bartlett")
            .region("IL")
            .postalCode("60103")
            .countryCodeAlpha2("US")
            .done().options().
                paypal().
                customField("PayPal custom field").
                description("Online food").
                done().
        storeInVaultOnSuccess(true).
                done();

        com.braintreegateway.Result<Transaction> saleResult = gateway.transaction().sale(request);

        if (saleResult.isSuccess()) {
            Transaction transaction = saleResult.getTarget();

            Logger.info("Success ID: " + transaction.getId());
            return ok(transaction.getId());
        } else {
            Logger.error("Message: " + saleResult.getMessage());
        }
        return badRequest("Transaction failed");
    }

    public static String SHA1(String decript) {
        try {
            MessageDigest digest = java.security.MessageDigest.getInstance("SHA-1");
            digest.update(decript.getBytes());
            byte messageDigest[] = digest.digest();
            // Create Hex String
            StringBuffer hexString = new StringBuffer();
            // 字节数组转换为 十六进制 数
            for (int i = 0; i < messageDigest.length; i++) {
                String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
                if (shaHex.length() < 2) {
                    hexString.append(0);
                }
                hexString.append(shaHex);
            }
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return "";
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

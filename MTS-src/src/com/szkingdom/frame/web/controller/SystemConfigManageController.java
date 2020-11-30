package com.szkingdom.frame.web.controller;
import com.szkingdom.frame.config.CustomizedPropertyPlaceholderConfigurer;
import com.szkingdom.frame.util.LogUtil;
import net.sf.json.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Description 获取config文件属性配置
 * @Date 2018/11/8 10:02
 * @Version 1.0
 **/
public class SystemConfigManageController extends BaseController{
    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response) {
        try {
            String column = request.getParameter("SYS_CONF_KEY");
            if (column != null && !column.isEmpty()) {
                JSONObject object = new JSONObject();
                object.put("result",CustomizedPropertyPlaceholderConfigurer.getContextProperty(column));
                response.getWriter().write(object.toString());
                response.getWriter().close();
            }
        } catch (Exception e) {
            LogUtil.error("站点校验异常" + e.fillInStackTrace());
        }
    }
}

<%@ page language="java" pageEncoding="UTF-8"%>
<%
String jsonString = "";

jsonString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><response><![CDATA[";

//{[{"service":{"flag":"1","serialNo":""},"message":[{"flag":"1","prompt":"成功","rows":"2","times":"100ms"},{"flag":"1","prompt":"成功","rows":"2","times":"100ms"}],"config":{},"data":[[{"khxm":"heyz","khbh":"123"},{"khxm":"heyz","khbh":"123"}],[{"khxm":"heyz","khbh":"123"},{"khxm":"heyz","khbh":"123"}]]},{"service":{"flag":"1","serialNo":""},"message":[{"flag":"1","prompt":"成功","rows":"2","times":"100ms"},{"flag":"1","prompt":"成功","rows":"2","times":"100ms"}],"config":{},"data":[[{"khxm":"heyz","khbh":"123"},{"khxm":"heyz","khbh":"123"}],[{"khxm":"heyz","khbh":"123"},{"khxm":"heyz","khbh":"123"}]]}]}
String data = "[{\"service\":{\"flag\":\"1\",\"serialNo\":\"\"},\"message\":[{\"flag\":\"1\",\"prompt\":\"成功\",\"rows\":\"2\",\"times\":\"100ms\"},{\"flag\":\"1\",\"prompt\":\"成功\",\"rows\":\"2\",\"times\":\"100ms\"}],\"config\":{},\"data\":[[{\"khxm\":\"heyz1\",\"khbh\":\"123\"},{\"khxm\":\"heyz\",\"khbh\":\"1234\"}],[{\"khxm\":\"heyz\",\"khbh\":\"123\"},{\"khxm\":\"heyz\",\"khbh\":\"123\"}]]},{\"service\":{\"flag\":\"1\",\"serialNo\":\"\"},\"message\":[{\"flag\":\"1\",\"prompt\":\"成功\",\"rows\":\"2\",\"times\":\"100ms\"},{\"flag\":\"1\",\"prompt\":\"成功\",\"rows\":\"2\",\"times\":\"100ms\"}],\"config\":{},\"data\":[[{\"khxm\":\"heyz\",\"khbh\":\"123\"},{\"khxm\":\"heyz\",\"khbh\":\"123\"}],[{\"khxm\":\"heyz\",\"khbh\":\"123\"},{\"khxm\":\"heyz\",\"khbh\":\"123\"}]]}]";

jsonString +=data;
jsonString +="]]></response>";

response.getWriter().write(jsonString);
%>